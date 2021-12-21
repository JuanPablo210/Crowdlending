import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RazonSocialComponent} from './razon-social/razon-social.component';

import {MenuComponent} from "./menu/menu.component";

import {UsuarioComponent} from "./usuario/usuario.component";


import {VerificacionIdentidadDetailComponent} from "./razon-social/verificacion-identidad/verificacion-identidad-detail/verificacion-identidad-detail.component";
import {VerificacionIdentidadFormComponent} from "./razon-social/verificacion-identidad/verificacion-identidad-form/verificacion-identidad-form.component";
import {MainComponent} from "./main/main.component";
import {DivisaComponent} from "./divisa/divisa.component";



const routes: Routes = [
  { path: '', redirectTo: 'Razon-Social', pathMatch: 'full' },
  { path: 'Razon-Social', component: RazonSocialComponent },
  { path: 'Menu', component: MenuComponent} ,

  { path: 'Usuario', component: UsuarioComponent },

  { path: 'verificacion-identidad', component: VerificacionIdentidadDetailComponent },
  { path: 'verificacion-identidad', component: VerificacionIdentidadFormComponent },
  { path: 'Main', component: MainComponent },
  {
    path: 'Divisa', component: DivisaComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogosRoutingModule { }
