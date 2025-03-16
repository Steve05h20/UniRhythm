import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IChanson } from '../../interface/interface-Liste-Chanson';
import { ItemTableThemeMusicauxComponent } from '../item-table-theme-musicaux/item-table-theme-musicaux.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [RouterModule, ItemTableThemeMusicauxComponent, EmptyStateComponent, CommonModule],
  template: `
    @if (songs.length === 0) {
      <app-empty-state
        [icon]="emptyIcon"
        [title]="emptyTitle"
        [description]="emptyDescription"
      />
    } @else {
      @for(song of songs; track song._id) {
        <div [routerLink]="['/themes-musicaux', song._id]" class="cursor-pointer">
          <app-item-table-theme-musicaux
            [chanson]="song"
            [index]="$index"/>
        </div>
      }
    }
  `
})
export class SongListComponent {
  @Input() songs: IChanson[] = [];
  @Input() emptyIcon: string = 'music_off';
  @Input() emptyTitle: string = 'Aucune chanson disponible';
  @Input() emptyDescription: string = 'Aucune chanson ne correspond aux critères';
}
