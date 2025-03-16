import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteChansonService {

  apiUrl = 'http://localhost:4000/api/chansons';
  constructor(private http: HttpClient) { }

  deleteChanson(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
