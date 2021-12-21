import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InversionesComponent} from "./inversiones/inversiones.component";
import {DepositosRetirosComponent} from "./depositos-retiros/depositos-retiros.component";

const routes: Routes = [
  {
    path: '', redirectTo: 'Inversiones', pathMatch: 'full'
  },
  {
    path: 'Inversiones', component: InversionesComponent
  },
  {
    path: 'DepositosRetiros', component: DepositosRetirosComponent
  },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapturasRoutingModule { }
