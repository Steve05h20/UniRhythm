import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../../forms/delete-confirmation/delete-confirmation.component';
import { DeleteListeService } from '../../service/liste/delete-liste.service';
import { DeleteChansonService } from '../../service/chanson/delete-chanson.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header-table-liste-complet',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './header-table-liste-complet.component.html',
  styleUrl: './header-table-liste-complet.component.css'
})
export class HeaderTableListeCompletComponent {
  @Input() listeId: string = '';
  @Input() selectedChansons: string[] = [];
  @Output() refreshList = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog,
    private deleteListeService: DeleteListeService,
    private deleteChansonService: DeleteChansonService,
    private router: Router
  ) {}

  openDeleteDialog(type: 'liste' | 'chansons'): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '400px',
      data: { type: type }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (type === 'liste') {
          this.deleteListe();
        } else if (type === 'chansons' && this.selectedChansons.length > 0) {
          this.deleteSelectedChansons();
        }
      }
    });
  }

  private deleteListe(): void {
    this.deleteListeService.deleteListe(this.listeId).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de la liste:', error);
      }
    });
  }

  private deleteSelectedChansons(): void {
    const deletePromises = this.selectedChansons.map(chansonId =>
      this.deleteChansonService.deleteChanson(chansonId).toPromise()
    );

    Promise.all(deletePromises)
      .then(() => {
        this.refreshList.emit();
        this.selectedChansons = [];
      })
      .catch(error => {
        console.error('Erreur lors de la suppression des chansons:', error);
      });
  }
}
