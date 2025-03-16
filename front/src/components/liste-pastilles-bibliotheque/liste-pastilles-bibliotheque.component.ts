import { Component, Output, EventEmitter } from '@angular/core';
import { MatChip, MatChipSet, MatChipListbox, MatChipOption } from "@angular/material/chips";

@Component({
  selector: 'app-liste-pastilles-bibliotheque',
  standalone: true,
  imports: [
    MatChipListbox,
    MatChipOption
],
  templateUrl: './liste-pastilles-bibliotheque.component.html',
  styleUrl: './liste-pastilles-bibliotheque.component.css'
})
export class ListePastillesBibliothequeComponent {
  @Output() typeChange = new EventEmitter<string>();

  selectedType: string = 'Tout';
  data = ['Tout', 'Liste de lecture', 'Artiste', 'Album'];

  onTypeChange(type: string) {
    this.selectedType = type;
    this.typeChange.emit(type);
  }
}
