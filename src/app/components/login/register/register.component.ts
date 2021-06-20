import { DialogData, LoginComponent } from './../login.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
register: any;

ROL_LIST = {
  1: 'Usuario/Paciente',
  2: 'Médico',
  3: 'Enfermera'
}

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _usrService: UsersService
  ) { }

  ngOnInit(): void {
    this.register = new FormGroup({
      emailInput: new FormControl('', [
        Validators.required
      ]),
      nameInput: new FormControl('', [
        Validators.required
      ]),
      usrNameInput: new FormControl('', [
        Validators.required
      ]),
      passwdInput: new FormControl('', [
        Validators.required
      ]),
      rolInput: new FormControl('', [
        Validators.required
      ])
    });
  }

  submitData(): void {
    this.dialogRef.close();
  }

  async sendConfirmation() {
    // ** Obtener datos del formulario
    const formValues = this.register.getRawValue();

    // ?? Set localStorage
    if(localStorage.getItem('BufferUsr') !== null) {
      localStorage.removeItem('BufferUsr');
    }

    localStorage.setItem('BufferUsr', JSON.stringify(formValues));

    let serverResp;
    await this._usrService.getConfirmation(formValues.emailInput).toPromise().then((data: any) => {
      serverResp = data;
    });
  }
}

