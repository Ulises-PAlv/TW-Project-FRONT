import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { GlobalModel } from '../common/global.model';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
originUrl = GlobalModel.apiURL;
actions = GlobalModel.querysUsers;

  constructor(private _http: HttpClient) {
    console.log('User Service loaded...');
  }

  get() { return this._http.get(`${this.originUrl}${this.actions.GetAll}`); }

  getByID(id: any) { return this._http.get(`${this.originUrl}${this.actions.GetID}${id}`); }

  getConfirmation(mail: any) { return this._http.get(`${this.originUrl}${this.actions.Correo}${mail}`) }

  post(body: any) { return this._http.post(`${this.originUrl}${this.actions.PostUsr}`, body).toPromise(); }

  postConect(body: any) { return this._http.post(`${this.originUrl}${this.actions.PostConect}`, body).toPromise(); }

  getConect() { return this._http.get(`${this.originUrl}${this.actions.GetConect}`); }

  getChange(nombre: any){ return this._http.get(`${this.originUrl}${this.actions.ChangeSate}${nombre}`); }

  desconectarMed(body: any) { return this._http.post(`${this.originUrl}${this.actions.Desconect}`, body).toPromise(); }

  postReceta(body: any){ return this._http.post(`${this.originUrl}${this.actions.Receta}`, body).toPromise(); }

  getReceta() { return this._http.get(`${this.originUrl}${this.actions.Receta}`); }

  conectarDoctor(name: any) { return this._http.get(`${this.originUrl}${this.actions.getDoctor}${name}`); }

  getNotify() { return this._http.get(`${this.originUrl}${this.actions.Notify}`); }

  popDoc() { return this._http.get(`${this.originUrl}${this.actions.popDoc}`); }
}
