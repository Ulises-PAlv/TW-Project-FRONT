import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { GlobalModel } from '../common/global.model';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PacientesService {
originUrl = GlobalModel.apiURL;
actions = GlobalModel.querysPatients;

  constructor( private _http: HttpClient ) {
    console.log('Patient Service loaded...');
  }

  get() { return this._http.get(`${this.originUrl}${this.actions.GetAll}`); }

  getByID(id: any) { return this._http.get(`${this.originUrl}${this.actions.GetPatient}${id}`); }

  post(body: any) { return this._http.post(`${this.originUrl}${this.actions.PostRegister}`, body).toPromise(); }
}
