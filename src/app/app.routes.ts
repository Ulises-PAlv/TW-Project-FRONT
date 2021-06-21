import { NotifyComponent } from './components/home/notify/notify.component';
import { PDFOutPutComponent } from './components/pdfout-put/pdfout-put.component';
import { RecetaComponent } from './components/receta/receta.component';
import { Routes } from '@angular/router';

// ?? Componentes
import { Error404Component } from './components/shared/error404/error404.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RegisterPatientComponent } from './components/register-patient/register-patient.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { RoomComponent } from './components/room/room.component';
import { HistorialComponent } from './components/historial/historial.component';
// import { StatsNGraphsComponent } from './components/StatsNGraphs/stats-ngraphs.component';

// ** Array path's
export const ROUTES = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'register', component: RegisterPatientComponent },
  { path: 'buscar', component: BuscarComponent },
  { path: 'llamada', component: RoomComponent },
  { path: 'Receta', component: RecetaComponent },
  { path: 'Crearpdf', component: PDFOutPutComponent },
  { path: 'notify', component: NotifyComponent },
  { path: 'historial', component: HistorialComponent },
  // { path: 'estadisticas', component: StatsNGraphsComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', pathMatch: 'full', component: Error404Component }
];
