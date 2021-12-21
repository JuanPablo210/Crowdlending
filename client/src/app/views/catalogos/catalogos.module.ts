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


import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { UsuarioDeleteComponent } from './usuario/usuario-delete/usuario-delete.component';

import { MenuComponent } from './menu/menu.component';
import { MenuFormComponent } from './menu/menu-form/menu-form.component';
import { MenuDeleteComponent } from './menu/menu-delete/menu-delete.component';

import {VerificacionIdentidadFormComponent} from "./razon-social/verificacion-identidad/verificacion-identidad-form/verificacion-identidad-form.component";
import {VerificacionIdentidadDetailComponent} from "./razon-social/verificacion-identidad/verificacion-identidad-detail/verificacion-identidad-detail.component";
import { AfiliacionDetailComponent } from './razon-social/razon-social-form/afiliacion-detail/afiliacion-detail.component';
import {MainComponent} from "./main/main.component";
import {NgApexchartsModule} from "ng-apexcharts";
import {ChartsModule} from "ng2-charts";
import { DivisaComponent } from './divisa/divisa.component';
import {DivisaFormComponent} from "./divisa/divisa-form/divisa-form.component";
import {DivisaDeleteComponent} from "./divisa/divisa-delete/divisa-delete.component";



@NgModule({
  declarations: [RazonSocialComponent, RazonSocialFormComponent,


    UsuarioComponent,
    UsuarioFormComponent,
    UsuarioDeleteComponent,

    MenuComponent,
    MenuFormComponent,
    MenuDeleteComponent,
    MainComponent,


    VerificacionIdentidadFormComponent,
    VerificacionIdentidadDetailComponent,
    AfiliacionDetailComponent,
    DivisaComponent,
    DivisaFormComponent,
    DivisaDeleteComponent

  ],

  imports: [
    CommonModule, SharedModule,
    FormsModule, ReactiveFormsModule, MatMenuModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule,
    MatFormFieldModule, MatInputModule, MatSnackBarModule, MatButtonModule, MatIconModule, MatRadioModule,
    MatSelectModule, MatCheckboxModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatSortModule,
    MatToolbarModule, MaterialFileInputModule, MatMenuModule, MatTooltipModule, OwlDateTimeModule, MatSlideToggleModule,
    CatalogosRoutingModule, NgApexchartsModule, ChartsModule,
  ]
})
export class CatalogosModule { }
