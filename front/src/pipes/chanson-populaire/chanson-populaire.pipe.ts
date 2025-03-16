import { Pipe, PipeTransform } from '@angular/core';
import { IChanson } from '../../interface/interface-Liste-Chanson';

@Pipe({
  name: 'chansonPopulaire',
  standalone: true
})
export class ChansonPopulairePipe implements PipeTransform {
  transform(chansons: IChanson[]): IChanson[] {
    if (!chansons) return [];
    return chansons.filter(chanson => chanson.nbLecture > 5000);
  }
}
