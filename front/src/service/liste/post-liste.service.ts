import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IListe } from '../../interface/interface-Liste-Chanson';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostListeService {
  private port = 4000;
  private apiUrl = `http://localhost:${this.port}/api/liste`;

  constructor(private http: HttpClient) { }

  postListe(liste: IListe): Observable<IListe> {
    return this.http.post<IListe>(this.apiUrl, liste);
  }

  lierListeChanson(listeId: string, chansonId: string): Observable<any> {
    // Convertir les IDs en chaînes pour s'assurer qu'ils sont valides
    const payload = {
      liste_id: listeId.toString(),
      chanson_id: chansonId.toString(),
      ordre: 1
    };

    return this.http.post(`${this.apiUrl}/chanson`, payload);
  }
}
