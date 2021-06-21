import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalModel } from '../common/global.model';

@Injectable({
  providedIn: 'root'
})

export class ExpedientesService {
originUrl = GlobalModel.apiURL;
actions = GlobalModel.querysExpedientes;

  constructor( private _http: HttpClient ) {
    console.log('Expediente Service loaded...');
  }

  get() { return this._http.get(`${this.originUrl}${this.actions.GetAll}`); }

  getByID(id: any) { return this._http.get(`${this.originUrl}${this.actions.GetExpedient}${id}`); }

  post(body: any) { return this._http.post(`${this.originUrl}${this.actions.PostCreate}`, body).toPromise(); }
}
