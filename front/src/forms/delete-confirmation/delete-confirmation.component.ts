import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IListe, IChanson } from '../../interface/interface-Liste-Chanson';
import { GetListeService } from '../../service/liste/get-liste.service';
import { GetChansonService } from '../../service/chanson/get-chanson.service';
import { DeleteListeService } from '../../service/liste/delete-liste.service';
import { DeleteChansonService } from '../../service/chanson/delete-chanson.service';
import { RefreshService } from '../../service/refresh/refresh.service';

interface DialogData {
  type: 'liste' | 'chanson';
  item: IListe | IChanson | null;
}

@Component({
  selector: 'app-delete-confirmation',
  template: `
    <h2 mat-dialog-title>Confirmation de suppression</h2>
    <mat-dialog-content>
      @if (!selectedItem) {
        <mat-form-field class="search-field">
          <mat-label>Rechercher {{ data.type === 'liste' ? 'une liste' : 'une chanson' }}</mat-label>
          <input type="text" matInput [formControl]="searchControl" [matAutocomplete]="auto">
          <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayFn" (optionSelected)="onItemSelected($event.option.value)">
            @for (item of filteredItems | async; track item._id) {
              <mat-option [value]="item">
                {{ getDisplayText(item) }}
              </mat-option>
            }
          </mat-autocomplete>
        </mat-form-field>
      } @else {
        <p>Êtes-vous sûr de vouloir supprimer {{ getItemName() }} ?</p>
        <p class="warning">Cette action est irréversible.</p>
        <div class="actions">
          <button mat-button (click)="onCancel()">Annuler</button>
          <button mat-raised-button style="background-color: #f44336; color: white;" (click)="onConfirm()">Supprimer</button>
        </div>
      }
    </mat-dialog-content>
  `,
  styles: [`
    .warning {
      color: #f44336;
      font-weight: 500;
      margin-top: 8px;
    }
    .search-field {
      width: 100%;
      margin-bottom: 16px;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 16px;
    }
  `],
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class DeleteConfirmationComponent implements OnInit {
  searchControl = new FormControl<string | IListe | IChanson>('');
  filteredItems: Observable<(IListe | IChanson)[]> = of([]);
  selectedItem: IListe | IChanson | null = null;
  private items: (IListe | IChanson)[] = [];

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private getListeService: GetListeService,
    private getChansonService: GetChansonService,
    private deleteListeService: DeleteListeService,
    private deleteChansonService: DeleteChansonService,
    private refreshService: RefreshService
  ) {
    this.selectedItem = data.item;
  }

  ngOnInit() {
    this.loadData();
    this.setupAutoComplete();
  }

  private loadData() {
    if (this.data.type === 'liste') {
      this.getListeService.getListe().subscribe((listes: IListe[]) => {
        this.items = listes;
      });
    } else {
      this.getChansonService.getChanson().subscribe((chansons: IChanson[]) => {
        this.items = chansons;
      });
    }
  }

  private setupAutoComplete() {
    this.filteredItems = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: string | IListe | IChanson): (IListe | IChanson)[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() :
      this.data.type === 'liste' ? (value as IListe).titre.toLowerCase() :
      (value as IChanson).titre.toLowerCase();

    return this.items.filter(item => {
      if (this.data.type === 'liste') {
        return (item as IListe).titre.toLowerCase().includes(filterValue);
      } else {
        const chanson = item as IChanson;
        return chanson.titre.toLowerCase().includes(filterValue) ||
               chanson.nomArtiste.toLowerCase().includes(filterValue);
      }
    });
  }

  displayFn(item: IListe | IChanson | null): string {
    if (!item) return '';
    if ('nomArtiste' in item) {
      return `${item.titre} - ${item.nomArtiste}`;
    }
    return item.titre;
  }

  onItemSelected(item: IListe | IChanson): void {
    this.selectedItem = item;
  }

  getItemName(): string {
    if (!this.selectedItem) return '';
    if (this.data.type === 'liste') {
      return `la liste "${(this.selectedItem as IListe).titre}"`;
    } else {
      const chanson = this.selectedItem as IChanson;
      return `la chanson "${chanson.titre}" de ${chanson.nomArtiste}`;
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    if (!this.selectedItem || !this.selectedItem._id) return;

    const itemId: string = this.selectedItem._id.toString();

    if (this.data.type === 'liste') {
      this.deleteListeService.deleteListe(itemId).subscribe({
        next: () => {
          this.refreshService.triggerListeRefresh();
          this.dialogRef.close({
            success: true,
            deletedItem: this.selectedItem,
            type: this.data.type
          });
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de la liste:', error);
        }
      });
    } else {
      this.deleteChansonService.deleteChanson(itemId).subscribe({
        next: () => {
          this.refreshService.triggerChansonRefresh();
          this.dialogRef.close({
            success: true,
            deletedItem: this.selectedItem,
            type: this.data.type
          });
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de la chanson:', error);
        }
      });
    }
  }

  getDisplayText(item: IListe | IChanson): string {
    if (this.data.type === 'liste') {
      return (item as IListe).titre;
    } else {
      const chanson = item as IChanson;
      return `${chanson.titre} - ${chanson.nomArtiste}`;
    }
  }
}


