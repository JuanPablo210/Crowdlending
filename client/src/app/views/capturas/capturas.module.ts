import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapturasRoutingModule } from './capturas-routing.module';
import { InversionesComponent } from './inversiones/inversiones.component';
import { InversionesFormComponent } from './inversiones/inversiones-form/inversiones-form.component';
import {SharedModule} from "../../shared/shared.module";
import { DepositosRetirosComponent } from './depositos-retiros/depositos-retiros.component';
import { DepositosRetirosFormComponent } from './depositos-retiros/depositos-retiros-form/depositos-retiros-form.component';


@NgModule({
  declarations: [InversionesComponent, InversionesFormComponent, DepositosRetirosComponent, DepositosRetirosFormComponent],
  imports: [
    CommonModule, SharedModule,
    CapturasRoutingModule
  ]
})
export class CapturasModule { }
