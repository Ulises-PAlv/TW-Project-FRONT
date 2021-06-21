import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-pdfout-put',
  templateUrl: './pdfout-put.component.html',
  styleUrls: ['./pdfout-put.component.css']
})
export class PDFOutPutComponent implements OnInit {
  Receta: any 
  recetas = []
  aux: any
  

  constructor(private _userService: UsersService) { }

  public openPDF():void {
    var DATA = (<HTMLInputElement>document.getElementById('htmlData'));
      
    html2canvas(DATA).then(canvas => {
        console.log(canvas);
        let fileWidth = 208;
        
        let fileHeight = canvas.height * fileWidth / canvas.width;

      
        
        var imgData = canvas.toDataURL('image/png')
        let PDF = new jsPDF();
        let position = 0;
        PDF.addImage(imgData, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save('Receta.pdf');
    });     
  }

  ngOnInit(): void {
    this.ObtenerRecetas();
  }

  async ObtenerRecetas(){
    await this._userService.getReceta().toPromise().then((data:any)=>{
      console.log(data);
      this.recetas=data.array;
    });

    console.log(this.recetas);

    let auxStorage = JSON.parse(localStorage.getItem('usrTmp') || '{}');
    let band=false;
    for(let i=0; i< this.recetas.length; i++){
      this.aux= this.recetas[i];
      if(this.aux.Doctor == auxStorage.name){
        this.Receta=this.aux;
        band=true;
      }
    }
    if(band){
      console.log("Receta del papu" + this.Receta);
    }else{
      console.error("no encontro la receta :c");
    }
    

  }


}
