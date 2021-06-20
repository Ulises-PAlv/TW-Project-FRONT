import { Routes } from '@angular/router';

// ?? Componentes
import { Error404Component } from './components/shared/error404/error404.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RegisterPatientComponent } from './components/register-patient/register-patient.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { RoomComponent } from './components/room/room.component';

// ** Array path's
export const ROUTES = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'register', component: RegisterPatientComponent },
  { path: 'buscar', component: BuscarComponent },
  { path: 'llamada', component: RoomComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', pathMatch: 'full', component: Error404Component }
];
