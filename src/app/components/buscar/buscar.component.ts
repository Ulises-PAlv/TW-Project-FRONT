import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css'],
})
export class BuscarComponent implements OnInit {
  UsersConnects: Array<any> = [];
  index: Array<number> = [];

  constructor(
    private _usrService: UsersService,
    @Inject(DOCUMENT) private document: any,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.obtenerConectados();
  }

  async obtenerConectados() {
    console.log('Entre a obtener');
    await this._usrService
      .getConect()
      .toPromise()
      .then((data: any) => {
        this.UsersConnects = data.conectados;
      });

    for (let i = 0; i < this.UsersConnects.length; i++) {
      console.log(this.UsersConnects[i].Estado);
      this.index.push(i);
    }
  }

  checarEstado(): void {
    var inputValue;
    console.log('Entro a checar estado');
    for (let i = 0; i < this.UsersConnects.length; i++) {
      let state = this.UsersConnects[i].Estado;
      console.log('Estados de esos wetes' + state);

      if (state == 'Ocupado') {
        let cad = i.toString();
        console.log('el id a obtener: ' + cad);
        inputValue = <HTMLInputElement>document.getElementById(cad);
        inputValue.style.backgroundColor = 'red';
      }
    }
  }

  gotoCall(nombre: any): void {
    this._usrService.conectarDoctor(nombre).toPromise().then((data: any) => {
      console.log(data);
    });

    this._usrService
      .getChange(nombre)
      .toPromise()
      .then((data: any) => {
        console.log(data);
      });

    this.route.navigate(['/', "llamada"]);
  }

  refrescar(): void {
    location.reload();
  }
}
