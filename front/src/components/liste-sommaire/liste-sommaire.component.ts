import { Component, Input } from '@angular/core';
import { SpotimageShapeComponent } from "../../ui/spotimage-shape/spotimage-shape.component";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-liste-sommaire',
  standalone: true,
  imports: [SpotimageShapeComponent, NgClass],
  templateUrl: './liste-sommaire.component.html',
  styleUrl: './liste-sommaire.component.css'
})
export class ListeSommaireComponent {
  @Input() isSelected = false
  @Input() typeListe = ""
  @Input() LinkImage? = ""
  @Input() sousTitre? = ""


  isArtiste = this.typeListe === "Artiste"





}
