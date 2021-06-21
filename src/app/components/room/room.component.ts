import { ExpedientesService } from './../../services/expedientes.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from './../../services/web-socket.service';
import { PeerService } from './../../services/peer.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  encapsulation: ViewEncapsulation.None // ?? Para modificar mat-tab en css
})

export class RoomComponent implements OnInit {
  roomName: any;
  currentStream: any;
  otherStream: any;
  listUser: Array<any> = [];
  bandAudio: boolean = true;
  userStorage: any;
  patCall: any;
  expediente: any;
  paciente: any;

  constructor(
    private route: ActivatedRoute,
    private webSocketService: WebSocketService,
    private peerService: PeerService,
    private router: Router,
    private _usrService: UsersService,
    private _patService: PacientesService,
    private _expService: ExpedientesService
  ) {
    this.roomName = 'llamda';
    let auxStorage = JSON.parse(localStorage.getItem('usrTmp') || '{}');
    this.userStorage = auxStorage;

    if(auxStorage.rol === 'Med') {
      this.getCallPaciente();
      // ?? this.findExpediente(this.patCall);
    }
  }

  ngOnInit(): void {
    this.checkMediaDevices();
    this.initPeer();
    this.initSocket();
  }

  initPeer = () => {
    const { peer } = this.peerService;
    peer.on('open', (id: any) => {
      const body = {
        idPeer: id,
        roomName: this.roomName,
      };

      this.webSocketService.joinRoom(body);
    });

    peer.on(
      'call',
      (callEnter: any) => {
        callEnter.answer(this.currentStream);
        callEnter.on('stream', (streamRemote: any) => {
          this.addVideoUser(streamRemote);
        });
      },
      (err: any) => {
        console.log('*** ERROR *** Peer call ', err);
      }
    );
  };

  initSocket = () => {
    this.webSocketService.cbEvent.subscribe((res) => {
      if (res.name === 'new-user') {
        const { idPeer } = res.data;
        this.sendCall(idPeer, this.currentStream);
      }
    });
  };

  checkMediaDevices = () => {
    if (navigator && navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({
          audio: this.bandAudio,
          video: true,
        })
        .then((stream) => {
          this.currentStream = stream;
          this.addVideoUser(stream);
        })
        .catch(() => {
          console.log('*** ERROR *** Not permissions');
        });
    } else {
      console.log('*** ERROR *** Not media devices');
    }
  };

  addVideoUser = (stream: any) => {
    this.listUser.push(stream);
    const unique = new Set(this.listUser);
    this.listUser = [...unique];
  };

  sendCall = (idPeer: any, stream: any) => {
    const newUserCall = this.peerService.peer.call(idPeer, stream);
    if (!!newUserCall) {
      newUserCall.on('stream', (userStream: any) => {
        this.addVideoUser(userStream);
      });
    }
  };

  changeAudio() {
    this.bandAudio = !this.bandAudio;
    if (this.listUser.length > 1) {
      for (let i = 0; i < this.listUser.length; i++) {
        if (i == 1) {
          this.otherStream = this.listUser[i];
        }
        this.listUser.pop();
      }
      this.checkMediaDevices();
    } else {
      this.listUser.splice(0, 1);
      this.checkMediaDevices();
    }
  }

  goToReceta() {
    for (let i = 0; i < this.listUser.length; i++) {
      this.listUser.pop();
    }

    let auxStorage = JSON.parse(localStorage.getItem('usrTmp') || '{}');
    this._usrService.getChange(auxStorage.name).toPromise().then((data: any) => {
      console.log(data);
    });

    console.log("rol del men: " + auxStorage.rol);
    if(auxStorage.rol == "Med"){
      this.router.navigate(['/', 'Receta']);
    }else if(auxStorage.rol == "Enf") {
      this.router.navigate(['/', 'home']);
    }else{
      console.error("Estas mal en el rol compare");
    }
  }

  async getCallPaciente() {
    await this._patService.getCall().toPromise().then((data: any) => {
      this.patCall = data.pacienteID;
      console.log(this.patCall);
      this.findExpediente(this.patCall);
    });
  }

  async findExpediente(id: any) {
    console.log('Funcion expediente ' + this.patCall);

    this._expService.getByID(id).toPromise().then((data: any) => {
      console.log(data);
      this.expediente = data.array;
      console.log(this.expediente);
      this.findPaciente(id);
    });
  }

  async findPaciente(id: any) {
    await this._patService.getByID(id).toPromise().then((data: any) => {
      this.paciente = data.array;
      console.log(this.paciente);
      this.wardPaciente(this.paciente.Nombre)
    });
  }

  wardPaciente(name: string) {
    if(localStorage.getItem('nomPaciente')) {
      localStorage.removeItem('nomPaciente'); localStorage.setItem('nomPaciente', name);
    } else {
      localStorage.setItem('nomPaciente', name);
    }
  }
}
