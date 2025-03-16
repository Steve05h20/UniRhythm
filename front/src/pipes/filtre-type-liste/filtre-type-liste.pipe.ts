import { Pipe, PipeTransform } from '@angular/core';
import { IListe } from '../../interface/interface-Liste-Chanson';

@Pipe({
  name: 'filtreTypeListe',
  standalone: true
})
export class FiltreTypeListePipe implements PipeTransform {
  transform(listes: IListe[], type: string | null): IListe[] {
    if (!type || type === 'Tout') {
      return listes;
    }
    return listes.filter(liste => liste.type === type);
  }
}
