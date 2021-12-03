import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RazonSocialComponent} from './razon-social/razon-social.component';

import {MenuComponent} from "./menu/menu.component";
import {RoleComponent} from "./role/role.component";
import {RoleDetalleComponent} from "./role-detalle/role-detalle.component";
import {SubmenuComponent} from "./submenu/submenu.component";
import {UsuarioComponent} from "./usuario/usuario.component";
import {UsuarioRoleComponent} from "./usuario-role/usuario-role.component";

import {VerificacionIdentidadDetailComponent} from "./razon-social/verificacion-identidad/verificacion-identidad-detail/verificacion-identidad-detail.component";
import {VerificacionIdentidadFormComponent} from "./razon-social/verificacion-identidad/verificacion-identidad-form/verificacion-identidad-form.component";



const routes: Routes = [
  { path: '', redirectTo: 'Razon-Social', pathMatch: 'full' },
  { path: 'Razon-Social', component: RazonSocialComponent },
  { path: 'Menu', component: MenuComponent} ,
  { path: 'Role', component: RoleComponent },
  { path: 'Role-Detalle', component: RoleDetalleComponent },
  { path: 'Submenu', component: SubmenuComponent },
  { path: 'Usuario', component: UsuarioComponent },
  { path: 'Usuario-Role', component: UsuarioRoleComponent },
  { path: 'verificacion-identidad', component: VerificacionIdentidadDetailComponent },
  { path: 'verificacion-identidad', component: VerificacionIdentidadFormComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogosRoutingModule { }
