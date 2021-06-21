import { Component, OnInit } from '@angular/core';
import { ExpedientesService } from 'src/app/services/expedientes.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
results: any[] = [];

  constructor( private _expService: ExpedientesService ) {
    this.getExpedientes();
    console.log(this.results);
  }

  ngOnInit(): void {
  }

  async getExpedientes() {
    await this._expService.get().toPromise().then((data: any) => {
      this.results = data.array;
      console.log(data);
    });
  }
}
