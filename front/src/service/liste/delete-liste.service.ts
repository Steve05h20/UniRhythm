import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteListeService {
  private port = 4000;
  private apiUrl = `http://localhost:${this.port}/api/liste`;

  constructor(private http: HttpClient) { }

  deleteListe(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
