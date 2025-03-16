import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IListe } from '../../interface/interface-Liste-Chanson';

@Injectable({
  providedIn: 'root'
})
export class UpdateListeService {

  private apiUrl = 'http://localhost:4000/api/liste';
  constructor(private http: HttpClient) { }

  updateListe(liste: IListe) {
    return this.http.put(`${this.apiUrl}/${liste._id}`, liste);
  }
}
