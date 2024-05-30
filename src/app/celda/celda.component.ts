import { Component, OnInit } from '@angular/core';
import { ObtenerDatosService } from '../obtener-datos.service';
import { KeyValue } from '../keyValue';

@Component({
  selector: 'app-celda',
  templateUrl: './celda.component.html',
  styleUrls: ['./celda.component.css']
})
export class CeldaComponent implements OnInit {
  datosMostrar: KeyValue[] = [];

  constructor(private servicioDatos: ObtenerDatosService) {
    console.log("Se construye un componente Celda!!!!");
  }

  ngOnInit() {
    this.cargarInformacion();
  }

  cargarInformacion() {
    this.servicioDatos.main().then((datos: KeyValue[]) => {
      this.datosMostrar = datos;
    }).catch(error => {
      console.error('Error al cargar la información:', error);
    });
  }

  isScrolled = false;
  onScroll(event: Event) {
    const target = event.target as HTMLElement;
    const scrollPosition = target.scrollTop;

    this.isScrolled = scrollPosition > 100;
  }

}
