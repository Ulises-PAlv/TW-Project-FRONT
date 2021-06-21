import { Component, OnInit } from '@angular/core';
// import { Canvas } from 'canvasjs.min';

@Component({
  selector: 'app-stats-ngraphs',
  templateUrl: './stats-ngraphs.component.html',
  styleUrls: ['./stats-ngraphs.component.css']
})

export class StatsNGraphsComponent implements OnInit {

  constructor() { }
  //Grafica 1
  ngOnInit(): void {
    let Pacientes = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Numero de pacientes"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: 150, label: "Apple" }
        ]
      }]
    });

    Pacientes.render();

  //Grafica 2
  let Personnel = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		exportEnabled: true,
		title: {
			text: "Personal en el sistema"
		},
		data: [{
			type: "column",
			dataPoints: [
				{ y: 100, label: "Doctores" },
				{ y: 120, label: "Enfermeras" }
			]
		}]
	});

	Personnel.render();
  //Grafica 3
  let PacAge = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		exportEnabled: true,
		title: {
			text: "Edad de pacientes"
		},
		data: [{
			type: "column",
			dataPoints: [
				{ y: 16, label: "50" },
				{ y: 19, label: "45" },
				{ y: 21, label: "60" },
				{ y: 15, label: "85" },
				{ y: 11, label: "74" },
				{ y: 10, label: "37" },
				{ y: 22, label: "52" },
				{ y: 9, label: "29" },
				{ y: 15, label: "40" }
			]
		}]
	});

	PacAge.render();

  //Grafica 4
	let wght = new CanvasJS.Chart("chartContainer", {
		theme: "light2",
		animationEnabled: true,
		exportEnabled: true,
		title:{
			text: "Peso en los pacientes"
		},
		data: [{
			type: "pie",
			showInLegend: true,
			toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
			indexLabel: "{name} - #percent%",
			dataPoints: [
				{ y: 1200, name: "SobrePeso" },
				{ y: 950, name: "En Peso ideal" },
				{ y: 50, name: "Bajo el peso ideal" }
			]
		}]
	});

	wght.render();

  //Grafica 5
  let gei = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		exportEnabled: true,
		title: {
			text: "Poblacion de hombres y mujeres"
		},
		data: [{
			type: "column",
			dataPoints: [
				{ y: 69, label: "Hombres" },
				{ y: 69, label: "Mujeres" }
			]
		}]
	});

	gei.render();
}}
