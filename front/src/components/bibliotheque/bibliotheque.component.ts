import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListeSommaireComponent } from "../liste-sommaire/liste-sommaire.component";
import { IListe } from '../../interface/interface-Liste-Chanson';
import { SearchBarComponent } from "../../ui/search-bar/search-bar.component";
import { RouterLink } from "@angular/router";
import {
  ListePastillesBibliothequeComponent
} from "../liste-pastilles-bibliotheque/liste-pastilles-bibliotheque.component";
import { GetListeService } from '../../service/liste/get-liste.service';
import { RefreshService } from '../../service/refresh/refresh.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FiltreTypeListePipe } from '../../pipes/filtre-type-liste/filtre-type-liste.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bibliotheque',
  standalone: true,
  imports: [
    CommonModule,
    ListeSommaireComponent,
    SearchBarComponent,
    RouterLink,
    ListePastillesBibliothequeComponent,
    FiltreTypeListePipe
  ],
  templateUrl: './bibliotheque.component.html',
  styleUrl: './bibliotheque.component.css'
})
export class BibliothequeComponent implements OnInit, OnDestroy {
  SpotifyData: IListe[] = [];
  selectedType: string = 'Tout';
  private destroy$ = new Subject<void>();

  constructor(
    private service: GetListeService,
    private refreshService: RefreshService
  ) {}

  ngOnInit() {
    this.getListes();

    // S'abonner aux événements de rafraîchissement
    this.refreshService.refreshListe$
      .pipe(takeUntil(this.destroy$))
      .subscribe(shouldRefresh => {
        if (shouldRefresh) {
          this.getListes();
          this.refreshService.resetListeRefresh();
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getListes() {
    this.service.getListe().subscribe((liste: IListe[]) => {
      this.SpotifyData = liste;
    });
  }

  onTypeChange(type: string) {
    this.selectedType = type;
  }
}
