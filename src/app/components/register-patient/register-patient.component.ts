import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Router } from '@angular/router';
import { ExpedientesService } from 'src/app/services/expedientes.service';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})

export class RegisterPatientComponent implements OnInit {
register: any;
expedient: any;

  constructor(
    private _pacienteService: PacientesService,
    private _expedienteServicew: ExpedientesService,
    private _route: Router
  ) { }

  ngOnInit(): void {
    this.register = new FormGroup({
      nombreInput: new FormControl('', [
        Validators.required
      ]),
      estadoInput: new FormControl('', [
        Validators.required
      ]),
      localidadInput: new FormControl('', [
        Validators.required
      ]),
      edadInput: new FormControl('', [
        Validators.required
      ]),
      generoInput: new FormControl('', [
        Validators.required
      ]),
      telefonoInput: new FormControl('', [
        Validators.required
      ])
    });

    this.expedient = new FormGroup({
      malestarInput: new FormControl('', [
        Validators.required
      ]),
      historialInput: new FormControl('', [
        Validators.required
      ]),
      fechaInput: new FormControl('', [
        Validators.required
      ]),
      pesoInput: new FormControl('', [
        Validators.required
      ]),
      tallaInput: new FormControl('', [
        Validators.required
      ]),
      presionInput: new FormControl('', [
        Validators.required
      ]),
      temperaturaInput: new FormControl('', [
        Validators.required
      ]),
      pulsoInput: new FormControl('', [
        Validators.required
      ]),
      alturaInput: new FormControl('', [
        Validators.required
      ])
    });
  }

  registerPatient() {
    const formValues = this.register.getRawValue();
    this.nextStepPatient(formValues);
    this._route.navigate(['/home']);
  }

  async nextStepPatient(formValues: any) {
    await this._pacienteService.get().toPromise().then((data: any) => {
      var objPatient = {
        Nombre: formValues.nombreInput,
        Estado: formValues.estadoInput,
        Localidad: formValues.localidadInput,
        Edad: formValues.edadInput,
        Genero: formValues.generoInput,
        Telefono: formValues.telefonoInput,
        ExpID: data.array.length + 1
      }

      console.log(typeof(data.array.length + 1));
      console.log(objPatient);


      this.addPatient(objPatient);
    });
  }

  async addPatient(patient: any) {
    this._pacienteService.post(patient).then((data: any) => {
      console.log(data);
    });
  }

  createExpedient() {
    const formValues = this.expedient.getRawValue();
    this.nextStepExpedient(formValues);
  }

  async nextStepExpedient(formValues: any) {
    var objExp = {
      Fecha: formValues.fechaInput,
      Peso: formValues.pesoInput,
      Altura: formValues.alturaInput,
      Talla: formValues.tallaInput,
      PresionArt: formValues.presionInput,
      PulsoCardiaco: formValues.pulsoInput,
      MotivoConsulta: formValues.malestarInput,
      HistorialMedico: formValues.historialInput
    }

    this._expedienteServicew.post(objExp).then((data: any) => {
      console.log(data);
    });
  }
}
