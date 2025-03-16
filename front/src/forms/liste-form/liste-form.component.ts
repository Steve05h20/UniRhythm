import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { IListe } from '../../interface/interface-Liste-Chanson';
import { PostListeService } from '../../service/liste/post-liste.service';
import { GetListeService } from '../../service/liste/get-liste.service';
import { RefreshService } from '../../service/refresh/refresh.service';

@Component({
  selector: 'app-liste-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './liste-form.component.html',
  styleUrl: './liste-form.component.css'
})
export class ListeFormComponent {
  liste: Partial<IListe> = {
    titre: '',
    sousTitre: '',
    description: '',
    type: 'Liste de lecture',
    visibilite: 'Publique',
    nombreDeSauvegardes: 0,
    image: '',
    chansons: []
  };

  constructor(
    public dialogRef: MatDialogRef<ListeFormComponent>,
    private postListeService: PostListeService,
    private refreshService: RefreshService
  ) {}

  onSubmit(): void {
    this.postListe();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  postListe(): void {
    this.postListeService.postListe(this.liste as IListe).subscribe({
      next: (liste) => {
        this.refreshService.triggerListeRefresh();
        this.dialogRef.close({
          success: true,
          createdItem: liste,
          type: 'liste'
        });
      },
      error: (error) => {
        console.error('Erreur lors de la création de la liste:', error);
      }
    });
  }
}
