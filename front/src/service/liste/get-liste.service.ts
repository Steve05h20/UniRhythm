import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IListe } from '../../interface/interface-Liste-Chanson';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetListeService {


  Port=4000
  apiUrl=`http://localhost:${this.Port}/api/`

  constructor(private http: HttpClient) { }

  getListe():Observable<IListe[]>{
    return this.http.get<IListe[]>(this.apiUrl+"liste")
  }

  getListeById(_id:string):Observable<IListe>{
    return this.http.get<IListe>(`${this.apiUrl+"liste"}/${_id}`)
  }

  getListeWithChansonsWithListeId(_id:string):Observable<IListe>{
    return this.http.get<IListe>(`${this.apiUrl}chansons/liste/${_id}`)
  }
}
