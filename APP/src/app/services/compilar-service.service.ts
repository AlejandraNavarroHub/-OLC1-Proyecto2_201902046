import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { COMPILADOR } from '../modules/compilar';

@Injectable({
  providedIn: 'root'
})
export class CompilarServiceService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }

  COMPILAR(CODIGO: COMPILADOR): any{
    console.log(CODIGO);
    return this.http.post<any>(`${this.API_URI}/RUN/`, CODIGO);
  }

  GRAFICAR(CODIGO: COMPILADOR): any{
    return this.http.post<any>(`${this.API_URI}/GRAF/`, CODIGO);
  }
}
