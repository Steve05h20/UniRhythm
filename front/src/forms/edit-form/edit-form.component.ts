import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IListe, IChanson } from '../../interface/interface-Liste-Chanson';
import { GetListeService } from '../../service/liste/get-liste.service';
import { GetChansonService } from '../../service/chanson/get-chanson.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RefreshService } from '../../service/refresh/refresh.service';
import { UpdateListeService } from '../../service/liste/update-liste.service';
import { UpdateChansonService } from '../../service/chanson/update-chanson.service';

interface DialogData {
  type: 'liste' | 'chanson';
  item: IListe | IChanson;
}

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
  imports: [
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule
  ],
  standalone: true
})
export class EditFormComponent implements OnInit, OnDestroy {
  searchListeControl = new FormControl<string | IListe>('');
  searchChansonControl = new FormControl<string | IChanson>('');

  listeForm!: FormGroup;
  chansonForm!: FormGroup;

  filteredListes: Observable<IListe[]> = of([]);
  filteredChansons: Observable<IChanson[]> = of([]);

  selectedListe: IListe | null = null;
  selectedChanson: IChanson | null = null;

  selectedTabIndex = 0;

  private listes: IListe[] = [];
  private chansons: IChanson[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditFormComponent>,
    private getListeService: GetListeService,
    private getChansonService: GetChansonService,
    private updateListeService: UpdateListeService,
    private updateChansonService: UpdateChansonService,
    private refreshService: RefreshService,
    @Inject(MAT_DIALOG_DATA) private data: DialogData
  ) {
    this.initializeForms();
    this.initializeFromData();
  }

  private initializeFromData() {
    if (this.data && this.data.item) {
      if (this.data.type === 'liste') {
        this.selectedListe = this.data.item as IListe;
        this.selectedTabIndex = 0;
        this.listeForm.patchValue(this.selectedListe);
        this.searchListeControl.setValue(this.selectedListe);
      } else {
        this.selectedChanson = this.data.item as IChanson;
        this.selectedTabIndex = 1;
        this.chansonForm.patchValue(this.selectedChanson);
        this.searchChansonControl.setValue(this.selectedChanson);
      }
    } else {
      // Si aucun élément n'est fourni, on sélectionne juste l'onglet approprié
      this.selectedTabIndex = this.data.type === 'liste' ? 0 : 1;
    }
  }

  ngOnInit() {
    this.loadData();
    this.setupAutoComplete();
    this.setupRefreshSubscriptions();
  }

  private initializeForms() {
    this.listeForm = this.fb.group({
      titre: ['', Validators.required],
      sousTitre: [''],
      description: [''],
      type: ['', Validators.required],
      visibilite: ['Publique', Validators.required]
    });

    this.chansonForm = this.fb.group({
      titre: ['', Validators.required],
      nomArtiste: ['', Validators.required],
      nomAlbum: ['', Validators.required],
      paroles: [''],
      dureeSecondes: [0, [Validators.required, Validators.min(0)]]
    });
  }

  private setupRefreshSubscriptions() {
    this.subscriptions.add(
      this.refreshService.refreshListe$.subscribe(shouldRefresh => {
        if (shouldRefresh) {
          this.getListeService.getListe().subscribe((listes: IListe[]) => {
            this.listes = listes;
            this.refreshService.resetListeRefresh();
          });
        }
      })
    );

    this.subscriptions.add(
      this.refreshService.refreshChanson$.subscribe(shouldRefresh => {
        if (shouldRefresh) {
          this.getChansonService.getChanson().subscribe((chansons: IChanson[]) => {
            this.chansons = chansons;
            this.refreshService.resetChansonRefresh();
          });
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private loadData() {
    this.getListeService.getListe().subscribe((listes: IListe[]) => {
      this.listes = listes;
    });

    this.getChansonService.getChanson().subscribe((chansons: IChanson[]) => {
      this.chansons = chansons;
    });
  }

  private setupAutoComplete() {
    this.filteredListes = this.searchListeControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterListes(value || ''))
    );

    this.filteredChansons = this.searchChansonControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterChansons(value || ''))
    );
  }

  private _filterListes(value: string | IListe): IListe[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.titre.toLowerCase();
    return this.listes.filter(liste =>
      liste.titre.toLowerCase().includes(filterValue)
    );
  }

  private _filterChansons(value: string | IChanson): IChanson[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.titre.toLowerCase();
    return this.chansons.filter(chanson =>
      chanson.titre.toLowerCase().includes(filterValue) ||
      chanson.nomArtiste.toLowerCase().includes(filterValue)
    );
  }

  displayListeFn(liste: IListe): string {
    return liste ? liste.titre : '';
  }

  displayChansonFn(chanson: IChanson): string {
    return chanson ? `${chanson.titre} - ${chanson.nomArtiste}` : '';
  }

  onListeSelected(liste: IListe) {
    this.selectedListe = liste;
    this.listeForm.patchValue({
      titre: liste.titre,
      sousTitre: liste.sousTitre,
      description: liste.description,
      type: liste.type,
      visibilite: liste.visibilite
    });
  }

  onChansonSelected(chanson: IChanson) {
    this.selectedChanson = chanson;
    this.chansonForm.patchValue({
      titre: chanson.titre,
      nomArtiste: chanson.nomArtiste,
      nomAlbum: chanson.nomAlbum,
      paroles: chanson.paroles,
      dureeSecondes: chanson.dureeSecondes
    });
  }

  isFormValid(): boolean {
    return this.selectedListe ? this.listeForm.valid : this.selectedChanson ? this.chansonForm.valid : false;
  }

  onSave() {
    if (this.selectedListe && this.listeForm.valid) {
      const updatedListe: IListe = {
        _id: this.selectedListe._id,
        ...this.listeForm.value
      };

      this.updateListeService.updateListe(updatedListe).subscribe({
        next: (response) => {
          console.log('Liste mise à jour avec succès:', response);
          this.refreshService.triggerBothRefresh();
          this.dialogRef.close({
            success: true,
            updatedItem: updatedListe,
            type: 'liste'
          });
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de la liste:', error);
          // On peut ajouter ici un message d'erreur pour l'utilisateur si nécessaire
        }
      });
    } else if (this.selectedChanson && this.chansonForm.valid) {
      const updatedChanson: IChanson = {
        _id: this.selectedChanson._id,
        ...this.chansonForm.value
      };

      this.updateChansonService.updateChanson(updatedChanson).subscribe({
        next: (response) => {
          console.log('Chanson mise à jour avec succès:', response);
          this.refreshService.triggerBothRefresh();
          this.dialogRef.close({
            success: true,
            updatedItem: updatedChanson,
            type: 'chanson'
          });
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de la chanson:', error);
          // On peut ajouter ici un message d'erreur pour l'utilisateur si nécessaire
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
