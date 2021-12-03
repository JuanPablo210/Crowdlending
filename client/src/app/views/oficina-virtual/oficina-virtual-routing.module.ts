import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TableroComponent} from "./tablero/tablero.component";
import {BandejaComponent} from "./bandeja/bandeja.component";

const routes: Routes = [
  {
    path: '', redirectTo: 'Tablero', pathMatch: 'full'
  },
  {
    path: 'Tablero' ,component: TableroComponent
  },
  {
    path: 'Bandeja-de-Entrada' ,component: BandejaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OficinaVirtualRoutingModule { }
