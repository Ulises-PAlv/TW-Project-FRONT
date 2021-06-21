import { Component, Inject, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { PacientesService } from 'src/app/services/pacientes.service';
import { interval, Subscription } from 'rxjs';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifyComponent } from './notify/notify.component';

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
bandShowTableUsr = false;
arrayUsers: any;
subscription: Subscription | undefined;
notifyCont: number = 0;

  constructor(
    private _usrService: UsersService,
    private _patService: PacientesService,
    private _router: Router,
    public dialog: MatDialog
  ) {
    this.auxStorage = JSON.parse(localStorage.getItem('usrTmp') || '{}');
    this.localStrorageUsrName = this.auxStorage.userName;
    this.getUsers();
  }

  ngOnInit(): void {
    if(this.auxStorage.rol === 'Med') {
      const source = interval(7000);
      this.subscription = source.subscribe(val => this.opensnack());
    }
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

  opensnack(): void {
    console.log('check notifications');
    this.checkNotifycations();
  }

  async checkNotifycations() {
    await this._usrService.getNotify().toPromise().then((data: any) => {
      console.log(data.Doctor);
      console.log(this.auxStorage.name);
      if(data.Doctor == this.auxStorage.name) {
        this.notifyCont++;
        this.showNotify(data.Doctor);
      }
    });
  }

  showNotify(nomDoc: any) {
    if(this.notifyCont <= 1) {
      const dialogRef = this.dialog.open(NotifyComponent, {
        width: '550px',
        data: nomDoc
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
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

  showTablePacientes() {
    this.bandShowTableUsr = !this.bandShowTableUsr;

    if(this.bandShowTableUsr) {
      this.getPacientes();
      console.log(this.arrayUsers);
    }
  }

  async getPacientes() {
    var auxData: any;

    await this._patService.get().toPromise().then((data: any) => {
      auxData = data;
      console.log(auxData);
    });

    this.arrayUsers = auxData.array;
  }

  addUserToStorage(objUsr: any) {
    if(localStorage.getItem('selectedPat')) {
      localStorage.removeItem('selectedPat'); localStorage.setItem('selectedPat', JSON.stringify(objUsr));
      this.savePaciente(objUsr.PacID);
    } else {
      localStorage.setItem('selectedPat', JSON.stringify(objUsr));
      this.savePaciente(objUsr.PacID);
    }

    this.bandShowTableUsr = false;
  }

  async savePaciente(id: any) {
    await this._patService.getCallSave(id).toPromise().then((data: any) => {
      console.log(data);
    })
  }

  gotToEstadisticas(): void {
    // this._router.navigate(['/estadisticas']);
  }

  goToHistorial() {
    this._router.navigate(['/historial']);
  }
}
