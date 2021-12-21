import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepositosRoutingModule } from './depositos-routing.module';
import { CargaArchivosComponent } from './carga-archivos/carga-archivos.component';
import { CargaArchivosFormComponent } from './carga-archivos/carga-archivos-form/carga-archivos-form.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [CargaArchivosComponent, CargaArchivosFormComponent],
  imports: [
    CommonModule, SharedModule,
    DepositosRoutingModule
  ]
})
export class DepositosModule { }
