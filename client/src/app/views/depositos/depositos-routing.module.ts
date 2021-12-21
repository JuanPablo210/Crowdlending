import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CargaArchivosComponent} from "./carga-archivos/carga-archivos.component";

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'Carga-Archivos'
  },
  {
    path: 'Captura-de-Depositos', component: CargaArchivosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepositosRoutingModule { }
