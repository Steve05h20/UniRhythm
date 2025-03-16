import { Component, Input } from '@angular/core';
import { ConvertSecondsToMinSecPipe } from '../../pipes/convert-seconds-to-min-sec/convert-seconds-to-min-sec.pipe';
import { RouterLink } from '@angular/router';
import { IChanson } from '../../interface/interface-Liste-Chanson';

@Component({
  selector: 'app-item-table-liste-complet',
  standalone: true,
  imports: [ConvertSecondsToMinSecPipe, RouterLink],
  templateUrl: './item-table-liste-complet.component.html',
  styleUrl: './item-table-liste-complet.component.css'
})
export class ItemTableListeCompletComponent {
  @Input() spotifyData: string = "";
  @Input() spotify: Partial<IChanson> = { _id: "", titre: "", nomArtiste: "", dureeSecondes: 0 };
  @Input() index: number = 0;
}
