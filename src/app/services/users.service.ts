import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private _http: HttpClient) {
    console.log('User Service loaded...');
  }

  getQuery(str: string) {
    const url = `http://localhost:3000/${str}`;

    return this._http.get(url);
  }
}
