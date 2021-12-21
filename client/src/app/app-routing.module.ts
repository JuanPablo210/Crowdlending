import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './authentication/page404/page404.component';
import { AuthGuard } from './core/guard/auth.guard';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import {SignupComponent} from "./authentication/signup/signup.component";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/Autenticacion/Login', pathMatch: 'full' },
      {
        path: 'Catalogos',
        loadChildren: () => import('./views/catalogos/catalogos.module').then((m) => m.CatalogosModule)
      },
      {
        path: 'Procesos',
        loadChildren: () => import('./views/procesos/procesos.module').then((m) => m.ProcesosModule)
      },
      {
        path: 'Depositos',
        loadChildren: () => import('../app/views/depositos/depositos.module').then((m) => m.DepositosModule)
      },
      {
        path: 'oficina-virtual',
        loadChildren: () => import('./views/oficina-virtual/oficina-virtual.module').then((m) => m.OficinaVirtualModule)
      }
    ]
  },
  {
    path: 'PreRegistro',
    component: SignupComponent,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      )
  },
  {
    path: 'Autenticacion',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      )
  },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
