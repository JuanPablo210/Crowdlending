import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageLoaderComponent } from './layout/page-loader/page-loader.component';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { HttpClientModule, HTTP_INTERCEPTORS, } from '@angular/common/http';
import { WINDOW_PROVIDERS } from './core/service/window.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';

import {LayoutModule} from './layout/layout.module';

import {environment} from '../environments/environment';

import {DynamicScriptLoaderService} from './core/service/dynamic-script-loader.service';
import {RightSidebarService} from './core/service/rightsidebar.service';
import {RestService} from './core/service/rest.service';
import {GlobalService} from './core/service/global.service';
import {ConfigService} from './config/config.service';
import { SolicitudPrestamoComponent } from './views/catalogos/razon-social/solicitud-prestamo/solicitud-prestamo.component';
import { PrestarEfectivoComponent } from './views/catalogos/razon-social/prestar-efectivo/prestar-efectivo.component';
import {HttpCalIInterceptor} from "./http.interceptor";


@NgModule({
  declarations: [ AppComponent, PageLoaderComponent, SolicitudPrestamoComponent, PrestarEfectivoComponent, ],
  imports: [
    BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule,
    CoreModule,  SharedModule, NgbModule, ReactiveFormsModule, LayoutModule,
    SharedModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }, { provide: 'API_URL', useValue: environment.serverUrl},
    { provide: HTTP_INTERCEPTORS, useClass: HttpCalIInterceptor, multi: true },
    DynamicScriptLoaderService, RightSidebarService, RestService, GlobalService, ConfigService, WINDOW_PROVIDERS
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
