import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProcesosRoutingModule} from './procesos-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CalendarComponent} from "./calendar/calendar.component";
import {CalendarService} from "./calendar/calendar.service";
import {FormDialogComponent} from "./calendar/dialogs/form-dialog/form-dialog.component";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import {FullCalendarModule} from "@fullcalendar/angular";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MaterialFileInputModule} from "ngx-material-file-input";
import {MatSortModule} from "@angular/material/sort";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    CalendarComponent,
    FormDialogComponent,
  ],
  providers: [
    CalendarService

  ],
  imports: [

    CommonModule,
    FormsModule,
    PerfectScrollbarModule,
    FullCalendarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatMenuModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatSortModule,
    MatToolbarModule,
    MaterialFileInputModule,
    MatSidenavModule,
    //   CommonModule,
    ProcesosRoutingModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    DragDropModule,
    CKEditorModule,
  ],
})
export class ProcesosModule {
}
