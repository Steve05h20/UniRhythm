import { Pipe, PipeTransform } from '@angular/core';
import { IChanson } from '../../interface/interface-Liste-Chanson';

@Pipe({
  name: 'chansonRecente',
  standalone: true
})
export class ChansonRecentePipe implements PipeTransform {
  transform(chansons: IChanson[]): IChanson[] {
    if (!chansons) return [];
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    return chansons.filter(chanson => {
      const dateAjout = new Date(chanson.dateAjout);
      return dateAjout >= sixMonthsAgo;
    });
  }
}
