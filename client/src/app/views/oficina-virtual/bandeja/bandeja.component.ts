import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bandeja',
  templateUrl: './bandeja.component.html',
  styleUrls: ['./bandeja.component.sass']
})
export class BandejaComponent implements OnInit {
  public _datos = {
    _title: 'Resumen',
    _modulo: 'Oficina Virtual',
    _icono: 'fas fa-home',
    _dominio: 'Resumen',
    _componente: 'Resumen'
  }
  constructor() { }

  ngOnInit(): void {
  }

  refresh() {

  }
}
