import { Pipe, PipeTransform } from '@angular/core';
import { IChanson } from '../../interface/interface-Liste-Chanson';

@Pipe({
  name: 'rechercheChanson',
  standalone: true
})
export class RechercheChansonPipe implements PipeTransform {
  transform(chansons: IChanson[], searchText: string): IChanson[] {
    if (!searchText || searchText.trim() === '') {
      return chansons;
    }

    const searchLower = searchText.toLowerCase().trim();
    return chansons.filter(chanson =>
      chanson.titre.toLowerCase().includes(searchLower) ||
      chanson.nomArtiste.toLowerCase().includes(searchLower)
    );
  }
}
