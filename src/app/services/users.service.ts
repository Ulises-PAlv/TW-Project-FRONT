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

}
