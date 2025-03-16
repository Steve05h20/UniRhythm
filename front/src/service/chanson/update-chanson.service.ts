import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IChanson } from '../../interface/interface-Liste-Chanson';

@Injectable({
  providedIn: 'root'
})
export class UpdateChansonService {

  private apiUrl = 'http://localhost:4000/api/chansons';
  constructor(private http: HttpClient) { }

  updateChanson(chanson: IChanson) {
    return this.http.put(`${this.apiUrl}/${chanson._id}`, chanson);
  }
}
