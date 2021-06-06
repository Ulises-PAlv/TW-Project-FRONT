import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usrName: any;

  constructor( public _router: Router ) {
    this.usrName = localStorage.getItem('usrTmp');
  }

  ngOnInit(): void {
  }

  // ?? Funciones
  logOut() {
    localStorage.clear();
    location.href = './login';
  }

}
