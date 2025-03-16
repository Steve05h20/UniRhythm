import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IChanson } from '../../interface/interface-Liste-Chanson';

@Injectable({
  providedIn: 'root'
})
export class GetChansonService {

  Port=4000
  apiUrl=`http://localhost:${this.Port}/api/chansons`

  constructor(private http: HttpClient) { }

  getChanson():Observable<IChanson[]>{
    return this.http.get<IChanson[]>(this.apiUrl)
  }

  getChansonById(id:string):Observable<IChanson>{
    return this.http.get<{success: boolean, data: IChanson}>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    )
  }

}
