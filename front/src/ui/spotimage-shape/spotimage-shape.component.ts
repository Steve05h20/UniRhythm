import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spotimage-shape',
  standalone: true,
  imports: [],
  templateUrl: './spotimage-shape.component.html',
  styleUrl: './spotimage-shape.component.css'
})
export class SpotimageShapeComponent {




  @Input() isArtist = true
  @Input() LinkImage? = ""


}
