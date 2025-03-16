import { Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { IChanson, IListe } from '../../interface/interface-Liste-Chanson';
import { GetListeService } from '../../service/liste/get-liste.service';
import { GetChansonService } from '../../service/chanson/get-chanson.service';
import { NgFor, NgIf } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PostListeService } from '../../service/liste/post-liste.service';

@Component({
  selector: 'app-liste-chanson-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    NgxMatSelectSearchModule
],
  templateUrl: './liste-chanson-form.component.html',
  styleUrl: './liste-chanson-form.component.css'
})
export class ListeChansonFormComponent implements OnInit, OnDestroy {
  @ViewChild('listeSelect') listeSelect: any;
  @ViewChild('chansonSelect') chansonSelect: any;

  protected listes: IListe[] = [];
  protected chansons: IChanson[] = [];

  listeControl = new FormControl<IListe | null>(null);
  chansonControl = new FormControl<IChanson | null>(null);

  listeFilterCtrl = new FormControl('');
  chansonFilterCtrl = new FormControl('');

  filteredListes: IListe[] = [];
  filteredChansons: IChanson[] = [];

  protected _onDestroy = new Subject<void>();
  isSubmitting = false;

  constructor(
    public dialogRef: MatDialogRef<ListeChansonFormComponent>,
    private listeService: GetListeService,
    private chansonService: GetChansonService,
    private postListeService: PostListeService
  ) {}

  ngOnInit() {
    this.loadListes();
    this.loadChansons();

    // Écouter les changements dans la recherche de liste
    this.listeFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterListes();
      });

    // Écouter les changements dans la recherche de chanson
    this.chansonFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterChansons();
      });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private loadListes() {
    this.listeService.getListe().subscribe(listes => {
      this.listes = listes;
      this.filteredListes = listes;
    });
  }

  private loadChansons() {
    this.chansonService.getChanson().subscribe(chansons => {
      this.chansons = chansons;
      this.filteredChansons = chansons;
    });
  }

  protected filterListes() {
    if (!this.listes) {
      return;
    }

    let search = this.listeFilterCtrl.value;
    if (!search) {
      this.filteredListes = this.listes.slice();
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredListes = this.listes.filter(liste =>
      liste.titre.toLowerCase().includes(search!)
    );
  }

  protected filterChansons() {
    if (!this.chansons) {
      return;
    }

    let search = this.chansonFilterCtrl.value;
    if (!search) {
      this.filteredChansons = this.chansons.slice();
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredChansons = this.chansons.filter(chanson =>
      chanson.titre.toLowerCase().includes(search!) ||
      chanson.nomArtiste.toLowerCase().includes(search!)
    );
  }

  onSubmit(): void {
    if (this.listeControl.value?._id && this.chansonControl.value?._id && !this.isSubmitting) {
      const listeId = this.listeControl.value._id;
      const chansonId = this.chansonControl.value._id;

      this.isSubmitting = true;

      this.postListeService.lierListeChanson(listeId, chansonId).subscribe({
        next: (response) => {
          console.log('Association réussie:', response);
          // Recharger la liste des chansons
          this.listeService.getListeWithChansonsWithListeId(listeId).subscribe({
            next: (listeUpdated) => {
              this.dialogRef.close({
                success: true,
                listeId: listeId,
                chansonId: chansonId,
                liste: listeUpdated
              });
            },
            error: (error) => {
              console.error('Erreur lors du rechargement de la liste:', error);
              this.isSubmitting = false;
            }
          });
        },
        error: (error) => {
          console.error('Erreur lors de l\'association:', error);
          console.error('Détails de l\'erreur:', error.error);
          this.isSubmitting = false;
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
