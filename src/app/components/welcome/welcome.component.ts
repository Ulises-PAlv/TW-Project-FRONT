import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { UsersService } from './../../services/users.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
private infoUsr : any;

  constructor( private _usrService: UsersService, @Inject(DOCUMENT) private document: any ) {
    this.infoUsr = localStorage.getItem('BufferUsr');
    this.infoUsr = JSON.parse(this.infoUsr);

    var objUsr = {
      Nombre: this.infoUsr.nameInput,
      Email: this.infoUsr.emailInput,
      UsrName: this.infoUsr.usrNameInput,
      Pswd: this.infoUsr.passwdInput,
      Role: this.infoUsr.rolInput,
      Asignados: '0'
    }

    this.addUsrDB(objUsr);
  }

  ngOnInit(): void {
  }

  addUsrDB(objUsr: any) {
    this._usrService.post(objUsr).then((data: any) => {
      console.log(data);

      if( data.success ) {
        localStorage.removeItem('BufferUsr');

        if(localStorage.getItem('usrTmp')) {
          localStorage.removeItem('usrTmp'); localStorage.setItem('usrTmp', objUsr.UsrName);
        } else {
          localStorage.setItem('usrTmp', objUsr.UsrName);
        }
      }
    });
  }

  goToHome() {
    this.document.location.href = '../home';
  }

}
