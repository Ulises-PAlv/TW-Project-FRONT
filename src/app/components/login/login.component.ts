import { RegisterComponent } from './register/register.component';
import { UsersService } from './../../services/users.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

export interface DialogData {
  name: string,
  email: string,
  usrName: string,
  passwd: string,
  role: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  resultsUsr = [];
  bandLogIn: boolean = false;
  logIn: any;

  constructor(
    private _usrService: UsersService,
    @Inject(DOCUMENT) private document: any,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.logIn = new FormGroup({
      usrName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('^[a-zA-Z0-9_.-]*$'),
      ]),
      passwd: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10),
      ]),
    });
  }

  async validateUsr() {
    await this._usrService
      .get()
      .toPromise()
      .then((data: any) => {
        this.resultsUsr = data.array;
      });

      console.log(this.resultsUsr);

    // ** Obtener datos del formulario
    const formValues = this.logIn.getRawValue();

    this.resultsUsr.forEach((user: any) => {
      if (user.UsrName == formValues.usrName && user.Pswd == formValues.passwd) {
        this.bandLogIn = true;
      }
    });

    this.nextStep(formValues.usrName);
  }

  nextStep( key: any ) {
    if( !this.bandLogIn ) {
      window.alert("Has tenido un fallo en el usuario o contraseña, intenta nuevamente...");
      location.reload();
    } else {
      if(localStorage.getItem('usrTmp')) {
          localStorage.removeItem('usrTmp'); localStorage.setItem('usrTmp', key);
        } else {
          localStorage.setItem('usrTmp', key);
        }
      this.document.location.href = '../home';
    }
  }

  // ?? Modal de Registro
  openDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
