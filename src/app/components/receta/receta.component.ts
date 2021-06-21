import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {
  receta: any

  constructor(
    private _userService : UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.receta=new FormGroup({
      DiagnosticoInput: new FormControl('', [
        Validators.required
      ]),
      TratamientoInput: new FormControl('', [
        Validators.required
      ]),
      FarmacosInput: new FormControl('', [
        Validators.required
      ]),
      FechaInput: new FormControl('', [
        Validators.required
      ]),
      RazonInput: new FormControl('',[

      ])
    });
  }

  MakeRecet(){
    const formValues = this.receta.getRawValue();
    this.nexstStep(formValues);
    this.router.navigate(['/', 'Crearpdf']);
  }

  nexstStep(fromValues:any){
    let auxStorage = JSON.parse(localStorage.getItem('usrTmp') || '{}');
    let nomStorage = localStorage.getItem('nomPaciente');
    var objReceta ={
      Doctor: auxStorage.name,
      Paciente: nomStorage,
      Fecha: fromValues.FechaInput,
      Razon: fromValues.RazonInput,
      Diagnostico: fromValues.DiagnosticoInput,
      Tratamiento: fromValues.TratamientoInput,
      Farmacos: fromValues.FarmacosInput
    };

    this._userService.postReceta(objReceta).then(data =>{
      console.log(data);
    })
  }

}
