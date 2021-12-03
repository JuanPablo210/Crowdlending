import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogosRoutingModule } from './catalogos-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {RazonSocialComponent} from './razon-social/razon-social.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {OwlDateTimeModule} from 'ng-pick-datetime';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {RazonSocialFormComponent} from './razon-social/razon-social-form/Afiliacion-Form/razon-social-form.component';

import { UsuarioRoleComponent } from './usuario-role/usuario-role.component';
import { UsuarioRoleFormComponent } from './usuario-role/usuario-role-form/usuario-role-form.component';
import { UsuarioRoleDeleteComponent } from './usuario-role/usuario-role-delete/usuario-role-delete.component';
import { RoleDetalleComponent } from './role-detalle/role-detalle.component';
import { RoleDetalleFormComponent } from './role-detalle/role-detalle-form/role-detalle-form.component';
import { RoleDetalleDeleteComponent } from './role-detalle/role-detalle-delete/role-detalle-delete.component';
import { RoleComponent } from './role/role.component';
import { RoleFormComponent } from './role/role-form/role-form.component';
import { RoleDeleteComponent } from './role/role-delete/role-delete.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { UsuarioDeleteComponent } from './usuario/usuario-delete/usuario-delete.component';
import { SubmenuComponent } from './submenu/submenu.component';
import { SubmenuFormComponent } from './submenu/submenu-form/submenu-form.component';
import { SubmenuDeleteComponent } from './submenu/submenu-delete/submenu-delete.component';
import { MenuComponent } from './menu/menu.component';
import { MenuFormComponent } from './menu/menu-form/menu-form.component';
import { MenuDeleteComponent } from './menu/menu-delete/menu-delete.component';

import {VerificacionIdentidadFormComponent} from "./razon-social/verificacion-identidad/verificacion-identidad-form/verificacion-identidad-form.component";
import {VerificacionIdentidadDetailComponent} from "./razon-social/verificacion-identidad/verificacion-identidad-detail/verificacion-identidad-detail.component";
import { AfiliacionDetailComponent } from './razon-social/razon-social-form/afiliacion-detail/afiliacion-detail.component';


@NgModule({
  declarations: [RazonSocialComponent, RazonSocialFormComponent,

    UsuarioRoleComponent,
    UsuarioRoleFormComponent,
    UsuarioRoleDeleteComponent,
    RoleDetalleComponent,
    RoleDetalleFormComponent,
    RoleDetalleDeleteComponent,
    RoleComponent,
    RoleFormComponent,
    RoleDeleteComponent,
    UsuarioComponent,
    UsuarioFormComponent,
    UsuarioDeleteComponent,
    SubmenuComponent,
    SubmenuFormComponent,
    SubmenuDeleteComponent,
    MenuComponent,
    MenuFormComponent,
    MenuDeleteComponent,


    VerificacionIdentidadFormComponent,
    VerificacionIdentidadDetailComponent,
    AfiliacionDetailComponent,
 ],

  imports: [
    CommonModule, SharedModule,
    FormsModule, ReactiveFormsModule, MatMenuModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule,
    MatFormFieldModule, MatInputModule, MatSnackBarModule, MatButtonModule, MatIconModule, MatRadioModule,
    MatSelectModule, MatCheckboxModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatSortModule,
    MatToolbarModule, MaterialFileInputModule, MatMenuModule, MatTooltipModule, OwlDateTimeModule, MatSlideToggleModule,
    CatalogosRoutingModule,
  ]
})
export class CatalogosModule { }
