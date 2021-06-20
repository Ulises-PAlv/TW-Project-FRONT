import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usrName: any;

  constructor( public _router: Router, private _usrService: UsersService ) {
    this.usrName = localStorage.getItem('usrTmp');
  }

  ngOnInit(): void {
  }

  // ?? Funciones
  logOut() {
    let auxStorage = JSON.parse(localStorage.getItem('usrTmp') || '{}');
    var objUsr = {
      Nombre: auxStorage.name,
      Estado: 'Ocupado'
    };

    this._usrService.desconectarMed(objUsr).then((data: any) => {
      console.log(data);
    });

    localStorage.clear();
    location.href = './login';
  }

}
