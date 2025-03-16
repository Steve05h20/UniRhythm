import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConvertSecondsToMinSecPipe } from '../../pipes/convert-seconds-to-min-sec/convert-seconds-to-min-sec.pipe';
import { IChanson } from '../../interface/interface-Liste-Chanson';

@Component({
  selector: 'app-item-table-theme-musicaux',
  standalone: true,
  imports: [RouterModule, ConvertSecondsToMinSecPipe],
  templateUrl: './item-table-theme-musicaux.component.html',
  styleUrl: './item-table-theme-musicaux.component.css'
})
export class ItemTableThemeMusicauxComponent {
  @Input() chanson: Partial<IChanson> = { _id: "", titre: "", nomArtiste: "", dureeSecondes: 0 };
  @Input() index: number = 0;
}
