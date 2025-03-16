import { Pipe, PipeTransform } from '@angular/core';
import { IChanson } from '../../interface/interface-Liste-Chanson';

@Pipe({
  name: 'chansonDuree',
  standalone: true
})
export class ChansonDureePipe implements PipeTransform {
  transform(chansons: IChanson[], type: 'courte' | 'longue'): IChanson[] {
    const DUREE_LIMITE = 240; // 4 minutes en secondes

    return chansons.filter(chanson => {
      return type === 'courte' ? chanson.dureeSecondes <= DUREE_LIMITE : chanson.dureeSecondes > DUREE_LIMITE;
    });
  }
}
