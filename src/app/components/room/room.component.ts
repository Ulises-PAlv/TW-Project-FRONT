import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from './../../services/web-socket.service';
import { PeerService } from './../../services/peer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  roomName: any;
  currentStream: any;
  otherStream: any;
  listUser: Array<any> = [];
  bandAudio: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private webSocketService: WebSocketService,
    private peerService: PeerService,
    private router: Router
  ) {
    this.roomName = 'llamda';
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

    this.router.navigate(['/', 'crearPDF']);
  }
}
