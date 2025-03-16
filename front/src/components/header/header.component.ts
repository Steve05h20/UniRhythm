import { Component } from '@angular/core';
import { SpotimageShapeComponent } from "../../ui/spotimage-shape/spotimage-shape.component";

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { SearchBarComponent } from "../../ui/search-bar/search-bar.component";





@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ MatInputModule, MatIconModule, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'

})

export class HeaderComponent {
  value = 'Clear me';
}
