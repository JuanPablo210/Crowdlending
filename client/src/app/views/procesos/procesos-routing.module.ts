import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CalendarComponent} from "./calendar/calendar.component";



const routes: Routes = [
  {path: '', redirectTo: 'Calendar', pathMatch: 'full'},
  {path: 'Calendar', component: CalendarComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcesosRoutingModule {
}
