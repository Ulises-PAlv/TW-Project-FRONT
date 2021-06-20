import { Component, Inject, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
// ?? VARIABLES
localStrorageUsrName: any;
auxStorage: any;
logUser: any;

  constructor(
    private _usrService: UsersService,
    private _router: Router
  ) {
    this.auxStorage = JSON.parse(localStorage.getItem('usrTmp') || '{}');
    this.localStrorageUsrName = this.auxStorage.userName;
    this.getUsers();
  }

  ngOnInit(): void {
  }

  async getUsers() {
    var resultsUsr: any;
    await this._usrService
      .get()
      .toPromise()
      .then((data: any) => {
        resultsUsr = data.array;
      });

      resultsUsr.forEach( (user: { UsrName: any; }) => {
        if(user.UsrName === this.auxStorage.userName) { this.logUser = user }
      });

      console.log(this.logUser);
  }

  gotToRegisterComponent() {
    this._router.navigate(['/register']);
  }

  goToConsultaComponent() {
    this._router.navigate(['/buscar']);
  }
}
