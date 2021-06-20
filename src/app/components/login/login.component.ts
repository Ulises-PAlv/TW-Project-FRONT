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
  user: any;
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
        this['user'] = user;

        if(user.Role == "Med"){
          var Objconectar = {
            Nombre: user.Nombre,
            Estado: "Desocupado"
          };
          this._usrService.postConect(Objconectar).then(data => {
            console.log(data);
          })
        }
      }
    });

    this.nextStep(formValues.usrName, this.user.Nombre, this.user.Role);
  }

  nextStep( key: any, name?: string, role?: string ) {
    if( !this.bandLogIn ) {
      window.alert("Has tenido un fallo en el usuario o contraseña, intenta nuevamente...");
      location.reload();
    } else {
      var bodyStorage = {
        userName: key,
        name: name,
        rol: role
      }

      if(localStorage.getItem('usrTmp')) {
          localStorage.removeItem('usrTmp'); localStorage.setItem('usrTmp', JSON.stringify(bodyStorage));
        } else {
          localStorage.setItem('usrTmp', JSON.stringify(bodyStorage));
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
