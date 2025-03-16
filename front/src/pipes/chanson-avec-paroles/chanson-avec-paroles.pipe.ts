import { Pipe, PipeTransform } from '@angular/core';
import { IChanson } from '../../interface/interface-Liste-Chanson';

@Pipe({
  name: 'chansonAvecParoles',
  standalone: true
})
export class ChansonAvecParolesPipe implements PipeTransform {
  transform(chansons: IChanson[]): IChanson[] {
    if (!chansons) return [];
    return chansons.filter(chanson => chanson.paroles && chanson.paroles.length > 0);
  }
}
