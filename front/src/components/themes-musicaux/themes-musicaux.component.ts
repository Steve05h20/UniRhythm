import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { IChanson } from '../../interface/interface-Liste-Chanson';
import { GetChansonService } from '../../service/chanson/get-chanson.service';
import { RechercheService } from '../../service/recherche/recherche.service';
import { CommonModule } from '@angular/common';
import { HeaderTableListeCompletComponent } from '../header-table-liste-complet/header-table-liste-complet.component';
import { ChansonPopulairePipe } from '../../pipes/chanson-populaire/chanson-populaire.pipe';
import { ChansonAvecParolesPipe } from '../../pipes/chanson-avec-paroles/chanson-avec-paroles.pipe';
import { ChansonParArtistePipe } from '../../pipes/chanson-par-artiste/chanson-par-artiste.pipe';
import { RechercheChansonPipe } from '../../pipes/recherche-chanson/recherche-chanson.pipe';
import { ChansonDureePipe } from '../../pipes/chanson-duree/chanson-duree.pipe';
import { RouterModule } from '@angular/router';
import { SongListComponent } from '../song-list/song-list.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-themes-musicaux',
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule,
    MatIconModule,
    HeaderTableListeCompletComponent,
    ChansonPopulairePipe,
    ChansonAvecParolesPipe,
    ChansonParArtistePipe,
    RechercheChansonPipe,
    ChansonDureePipe,
    RouterModule,
    SongListComponent,
  ],
  templateUrl: './themes-musicaux.component.html',
  styleUrl: './themes-musicaux.component.css'
})
export class ThemesMusicauxComponent implements OnInit, OnDestroy {
  chansons: IChanson[] = [];
  selectedFilter: string = 'all';
  searchText: string = '';
  private searchSubscription?: Subscription;

  filters = [
    { value: 'all', label: 'Toutes les chansons' },
    { value: 'pinkfloyd', label: 'Pink Floyd' },
    { value: 'populaire', label: 'Populaires' },
    { value: 'paroles', label: 'Avec paroles' },
    { value: 'courte', label: 'Chansons courtes' },
    { value: 'longue', label: 'Chansons longues' }
  ];

  constructor(
    private chansonService: GetChansonService,
    private rechercheService: RechercheService
  ) {}

  ngOnInit() {
    this.loadChansons();
    this.searchSubscription = this.rechercheService.searchText$.subscribe(text => {
      this.searchText = text;
    });
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  private loadChansons() {
    this.chansonService.getChanson().subscribe({
      next: (chansons) => {
        this.chansons = chansons;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des chansons:', error);
      }
    });
  }

  onFilterChange(filter: string) {
    this.selectedFilter = filter;
  }

  get filteredChansons(): IChanson[] {
    let filtered = this.chansons;

    // Appliquer la recherche
    if (this.searchText) {
      const recherchePipe = new RechercheChansonPipe();
      filtered = recherchePipe.transform(filtered, this.searchText);
    }

    // Appliquer les filtres
    switch (this.selectedFilter) {
      case 'pinkfloyd':
        const artistePipe = new ChansonParArtistePipe();
        return artistePipe.transform(filtered);
      case 'populaire':
        const populairePipe = new ChansonPopulairePipe();
        return populairePipe.transform(filtered);
      case 'paroles':
        const parolesPipe = new ChansonAvecParolesPipe();
        return parolesPipe.transform(filtered);
      case 'courte':
        const dureePipeCourte = new ChansonDureePipe();
        return dureePipeCourte.transform(filtered, 'courte');
      case 'longue':
        const dureePipeLongue = new ChansonDureePipe();
        return dureePipeLongue.transform(filtered, 'longue');
      default:
        return filtered;
    }
  }
}
