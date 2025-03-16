import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  private refreshListeSubject = new BehaviorSubject<boolean>(false);
  private refreshChansonSubject = new BehaviorSubject<boolean>(false);

  refreshListe$ = this.refreshListeSubject.asObservable();
  refreshChanson$ = this.refreshChansonSubject.asObservable();

  // Appeler cette méthode après une opération sur les listes
  triggerListeRefresh(): void {
    this.refreshListeSubject.next(true);
  }

  // Appeler cette méthode après une opération sur les chansons
  triggerChansonRefresh(): void {
    this.refreshChansonSubject.next(true);
  }

  // Appeler cette méthode après une opération qui affecte les deux
  triggerBothRefresh(): void {
    this.refreshListeSubject.next(true);
    this.refreshChansonSubject.next(true);
  }

  // Réinitialiser l'état après le rafraîchissement
  resetListeRefresh(): void {
    this.refreshListeSubject.next(false);
  }

  // Réinitialiser l'état après le rafraîchissement
  resetChansonRefresh(): void {
    this.refreshChansonSubject.next(false);
  }
}
