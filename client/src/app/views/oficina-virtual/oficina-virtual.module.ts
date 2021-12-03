import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OficinaVirtualRoutingModule } from './oficina-virtual-routing.module';
import { TableroComponent } from './tablero/tablero.component';

import { InformacionComplementariaFormComponent } from './tablero/informacion-complementaria/informacion-complementaria-form/informacion-complementaria-form.component';
// import { VerificacionIdentidadFormComponent } from './tablero/verificacion-identidad/verificacion-identidad-form/verificacion-identidad-form.component';
import { PerfilClienteFormComponent } from './tablero/perfil-cliente/perfil-cliente-form/perfil-cliente-form.component';
import { ExpedienteFormComponent } from './tablero/expediente-form/expediente-form.component';
import { ConsultasFormComponent } from './tablero/consultas-form/consultas-form.component';
import {SharedModule} from "../../shared/shared.module";
import { PerfilClienteDetailComponent } from './tablero/perfil-cliente/perfil-cliente-detail/perfil-cliente-detail.component';
import { InformacionComplementariaDetailComponent } from './tablero/informacion-complementaria/informacion-complementaria-detail/informacion-complementaria-detail.component';
// import { VerificacionIdentidadDetailComponent } from './tablero/verificacion-identidad/verificacion-identidad-detail/verificacion-identidad-detail.component';
import { BandejaComponent } from './bandeja/bandeja.component';
import {NgApexchartsModule} from "ng-apexcharts";

@NgModule({
  declarations: [
    TableroComponent,
    InformacionComplementariaFormComponent,
    PerfilClienteFormComponent, ExpedienteFormComponent, ConsultasFormComponent,
   PerfilClienteDetailComponent, InformacionComplementariaDetailComponent,  BandejaComponent

  ],
  imports: [
    CommonModule, SharedModule,
    OficinaVirtualRoutingModule, NgApexchartsModule
  ]
})
export class OficinaVirtualModule { }
