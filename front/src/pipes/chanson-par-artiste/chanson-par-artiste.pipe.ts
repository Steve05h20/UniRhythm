import { Pipe, PipeTransform } from '@angular/core';
import { IChanson } from '../../interface/interface-Liste-Chanson';

@Pipe({
  name: 'chansonParArtiste',
  standalone: true
})
export class ChansonParArtistePipe implements PipeTransform {
  transform(chansons: IChanson[], nomArtiste: string = 'Pink Floyd'): IChanson[] {
    if (!chansons) return [];
    return chansons.filter(chanson =>
      chanson.nomArtiste.toLowerCase().includes(nomArtiste.toLowerCase())
    );
  }
}
