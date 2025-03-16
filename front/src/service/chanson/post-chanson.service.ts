import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IChanson } from '../../interface/interface-Liste-Chanson';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostChansonService {
  private port = 4000;
  private apiUrl = `http://localhost:${this.port}/api/chansons`;

  constructor(private http: HttpClient) {}

  postChanson(chanson: IChanson): Observable<IChanson> {
    const payload = {
      ...chanson,
      dateDePublication: new Date().toISOString(),
      nbLecture: chanson.nbLecture || 0
    };
    return this.http.post<IChanson>(this.apiUrl, payload);
  }
}

