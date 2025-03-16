import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { IChanson } from '../../interface/interface-Liste-Chanson';
import { PostChansonService } from '../../service/chanson/post-chanson.service';

@Component({
  selector: 'app-chanson-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './chanson-form.component.html',
  styleUrl: './chanson-form.component.css'
})
export class ChansonFormComponent {
  chanson: Partial<IChanson> = {
    titre: '',
    nomArtiste: '',
    nomAlbum: '',
    paroles: '',
    dateDePublication: new Date().toISOString(),
    dureeSecondes: 0,
    nbLecture: 0
  };

  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ChansonFormComponent>,
    private postChansonService: PostChansonService
  ) {}

  validateForm(): boolean {
    if (!this.chanson.titre || this.chanson.titre.trim() === '') {
      this.errorMessage = 'Le titre est obligatoire';
      return false;
    }
    if (!this.chanson.nomArtiste || this.chanson.nomArtiste.trim() === '') {
      this.errorMessage = "Le nom de l'artiste est obligatoire";
      return false;
    }
    if (!this.chanson.nomAlbum || this.chanson.nomAlbum.trim() === '') {
      this.errorMessage = "Le nom de l'album est obligatoire";
      return false;
    }
    if (!this.chanson.dureeSecondes || this.chanson.dureeSecondes <= 0) {
      this.errorMessage = 'La durée doit être supérieure à 0';
      return false;
    }

    // Assurez-vous que nbLecture est un nombre
    this.chanson.nbLecture = this.chanson.nbLecture || 0;
    if (this.chanson.nbLecture < 0) {
      this.errorMessage = 'Le nombre de lectures ne peut pas être négatif';
      return false;
    }

    return true;
  }

  onSubmit(): void {
    this.errorMessage = '';
    if (!this.validateForm() || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.postChansonService.postChanson(this.chanson as IChanson).subscribe({
      next: (chanson) => {
        console.log('Chanson créée avec succès:', chanson);
        this.dialogRef.close(chanson);
      },
      error: (error) => {
        console.error('Erreur lors de la création de la chanson:', error);
        this.errorMessage = error.error?.message || 'Une erreur est survenue lors de la création de la chanson';
        this.isSubmitting = false;
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
