import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// !! Importe para hacer un HTTP Request
import { HttpClientModule } from '@angular/common/http';
  // Hacer funcionar nuestras rutas
  import {  RouterModule } from '@angular/router';
  import { ROUTES } from './app.routes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { Error404Component } from './components/shared/error404/error404.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/login/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BuscarComponent } from './components/buscar/buscar.component';
import { VideoComponent } from './components/room/video/video.component';
import { RoomComponent } from './components/room/room.component';
import { PDFOutPutComponent } from './components/pdfout-put/pdfout-put.component';
import { RecetaComponent } from './components/receta/receta.component';
// import { StatsNGraphsComponent } from './components/StatsNGraphs/stats-ngraphs.component';

// !! ANGULAR MATERIAL
import { AngularMaterialModule } from './material.module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RegisterPatientComponent } from './components/register-patient/register-patient.component';

import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";

const config: SocketIoConfig = {url: 'http://localhost:3002', options: {withCredentials: '*'}};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    Error404Component,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    WelcomeComponent,
    RecetaComponent,
    RegisterPatientComponent,
    BuscarComponent,
    RoomComponent,
    VideoComponent,
    PDFOutPutComponent,
    // StatsNGraphsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
    AngularMaterialModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
