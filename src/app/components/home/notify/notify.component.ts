import { HomeComponent } from './../home.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})

export class NotifyComponent implements OnInit {
nomDoc: any;

  constructor(
    private dialogRef : MatDialogRef<HomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private _router: Router
  ) {
    this['nomDoc'] = JSON.parse(localStorage.getItem('usrTmp') || '{}').name;
    console.log(this.nomDoc);
  }

  ngOnInit(): void {
  }

  goToCall() {
    this.dialogRef.close();
    this._router.navigate(['/llamada']);
  }

  rechazar() { this.dialogRef.close(); }

}
