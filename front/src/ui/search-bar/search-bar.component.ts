import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { RechercheService } from '../../service/recherche/recherche.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatIconModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchText: string = '';

  constructor(
    private rechercheService: RechercheService,
    private router: Router
  ) {}

  onSearch() {
    this.rechercheService.updateSearchText(this.searchText);

    // Si nous ne sommes pas déjà sur la page des thèmes musicaux, y naviguer
    if (!this.router.url.includes('/themes-musicaux')) {
      this.router.navigate(['/themes-musicaux']);
    }
  }
}
