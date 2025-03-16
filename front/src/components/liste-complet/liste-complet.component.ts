import { IListe } from '../../interface/interface-Liste-Chanson';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from "@angular/common";
import { Component, Input, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { FormatNumberPipe } from "../../pipes/format-number/format-number.pipe";
import { ItemTableListeCompletComponent } from "../item-table-liste-complet/item-table-liste-complet.component";
import { HeaderTableListeCompletComponent } from "../header-table-liste-complet/header-table-liste-complet.component";
import { GetListeService } from "../../service/liste/get-liste.service";
import { DatePipe } from "@angular/common";
import { RefreshService } from '../../service/refresh/refresh.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CountDisplayComponent } from '../count-display/count-display.component';

@Component({
  selector: 'app-liste-complet',
  standalone: true,
  imports: [
    MatIconModule,
    NgClass,
    ItemTableListeCompletComponent,
    HeaderTableListeCompletComponent,
    DatePipe,
    CommonModule,
    CountDisplayComponent
],
  templateUrl: './liste-complet.component.html',
  styleUrl: './liste-complet.component.css'
})
export class ListeCompletComponent implements OnChanges, OnInit, OnDestroy {
  @Input() _id = "";
  private destroy$ = new Subject<void>();

  SpotifyData: IListe = {
    titre: "",
    type: "Artiste",
    dateDePublication: "",
    visibilite: "Publique",
    nombreDeSauvegardes: 0,
    chansons: []
  };

  constructor(
    private service_liste: GetListeService,
    private refreshService: RefreshService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // S'abonner aux changements de route
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        if (params['id']) {
          this._id = params['id'];
          this.getListeWithChansonsWithListeId();
        }
      });

    // S'abonner aux événements de rafraîchissement
    this.refreshService.refreshListe$
      .pipe(takeUntil(this.destroy$))
      .subscribe(shouldRefresh => {
        if (shouldRefresh && this._id) {
          this.getListeWithChansonsWithListeId();
          this.refreshService.resetListeRefresh();
        }
      });

    this.refreshService.refreshChanson$
      .pipe(takeUntil(this.destroy$))
      .subscribe(shouldRefresh => {
        if (shouldRefresh && this._id) {
          this.getListeWithChansonsWithListeId();
          this.refreshService.resetChansonRefresh();
        }
      });

    // Charger les données initiales si l'ID est disponible
    if (this._id) {
      this.getListeWithChansonsWithListeId();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['_id'] && !changes['_id'].firstChange && changes['_id'].currentValue) {
      this.getListeWithChansonsWithListeId();
    }
  }

  getListeWithChansonsWithListeId(): void {
    if (!this._id) return;

    this.service_liste.getListeWithChansonsWithListeId(this._id).subscribe({
      next: (liste) => {
        this.SpotifyData = liste;
      },
      error: (error) => {
        console.error('Erreur lors du chargement de la liste:', error);
        // Réinitialiser les données en cas d'erreur
        this.SpotifyData = {
          titre: "",
          type: "Artiste",
          dateDePublication: "",
          visibilite: "Publique",
          nombreDeSauvegardes: 0,
          chansons: []
        };
      }
    });
  }
}
