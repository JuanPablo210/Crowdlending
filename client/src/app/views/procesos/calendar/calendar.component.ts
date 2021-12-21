import { Component, ViewChild, OnInit, TemplateRef } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Calendar } from './calendar.model';
import { MatRadioChange } from '@angular/material/radio';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { CalendarService } from './calendar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Calendar_, PrestarEfectivo, SolicitudPrestamo} from "../../../shared/interfaces/Invested.interface";
import {SolicitudPrestamoComponent} from "../../catalogos/razon-social/solicitud-prestamo/solicitud-prestamo.component";
import {AdvanceRestService} from "../../../core/service/advance-rest.service";
import {DialogService} from "../../../core/service/dialog.service";
import {PrestarEfectivoComponent} from "../../catalogos/razon-social/prestar-efectivo/prestar-efectivo.component";

const d = new Date();
const day = d.getDate();
const month = d.getMonth();
const year = d.getFullYear();

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public _datos = {
    _title: 'Calendar',
    _modulo: 'Calendar',
    _icono: 'fas fa-id-card',
    _dominio: 'Calendar', _componente: 'Calendar'};

  @ViewChild('calendar', { static: false })
  calendar: Calendar | null;
  public addCusForm: FormGroup;
  dialogTitle: string;
  filterOptions = 'All';
  calendarData: any;
  advanceTable: Calendar_;
  public filters = [
    { name: 'Todo', value: 'todo', checked: 'true' },
    { name: 'Trabajo', value: 'trabajo', checked: 'false' },
    { name: 'Personal', value: 'Personal', checked: 'false' },
    { name: 'importante', value: 'Importante', checked: 'false' },
    { name: 'amigos', value: 'amigos', checked: 'false' }
  ];

  calendarVisible = true;
  calendarPlugins = [
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin,
    listPlugin
  ];
  calendarWeekends = true;
  @ViewChild('callAPIDialog', { static: false }) callAPIDialog: TemplateRef<
    any
  >;
  calendarEvents: EventInput[];
  tempEvents: EventInput[];
  todaysEvents: EventInput[];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    public calendarService: CalendarService,
    private snackBar: MatSnackBar,
    public advanceTableService: AdvanceRestService,  private fBuilder: FormBuilder, private ds: DialogService
  ) {
    this.calendar = new Calendar({});
    this.addCusForm = this.createContactForm(this.calendar);
  }

  public ngOnInit(): void {
    // this.calendarEvents = this.events();
    this.tempEvents = this.calendarEvents;
    // you can also get events from json file using following code
    // this.calendarService.getAllCalendars().subscribe((data: Calendar[]) => {
    //   this.calendarEvents = data;
    // })
  }

  createContactForm(calendar): FormGroup {
    return this.fb.group({
      id: [calendar.id],
      titulo: [calendar.titulo, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      categoria: [calendar.categoria],
      fechaInicio: [calendar.fechaInicio, [Validators.required]],
      fechaFin: [calendar.fechaFin, [Validators.required]],
      detalle: [calendar.detalle, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]
      ]
    });
  }


  addNewEvent() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        calendar: this.calendar,
        action: 'add'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'submit') {
        this.calendarData = this.calendarService.getDialogData();
        this.calendarEvents = this.calendarEvents.concat({
          // add new event data. must create new array
          id: this.calendarData.id,
          titulo: this.calendarData.titulo,
          start: this.calendarData.startDate,
          end: this.calendarData.endDate,
          className: this.calendarData.category,
          groupId: this.calendarData.category,
          details: this.calendarData.details
        });
        this.addCusForm.reset();
        this.showNotification(
          'snackbar-success',
          'Add Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }
  eventClick(b: boolean) {
    let data: any;

    this.advanceTableService.create<Calendar_>("Calendar_").subscribe(result => {
      data = result;
      const dialogRef = this.dialog.open(FormDialogComponent, {

        data: { title: this._datos._title, disableClose: true, data: data, action: 'Agregar' }
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (!result) {
          return
        }

        this.advanceTableService.save<string>("Calendar_",result).subscribe(data => {
          this.showNotification( 'snackbar-success',  'Agregada!!', 'bottom', 'center' );
        }, error => {
          if (error._embedded !== undefined) {
            this.showNotification( 'snackbar-danger', '¡¡Error al guardar!!', 'bottom', 'center' );
            Object.entries(error._embedded.errors).forEach(([key, value]) => { });
          }
        })
      });
    });
  }
  // eventClick(row) {
  //   const calendarData: any = {
  //     id: row.event.id,
  //     titulo: row.event.title,
  //     categoria: row.event.groupId,
  //     fechaInicio: row.event.start,
  //     fechaFin: row.event.end,
  //     detalle: row.event.extendedProps.details
  //   };
  //
  //   const dialogRef = this.dialog.open(FormDialogComponent, {
  //     data: {
  //       calendar: calendarData,
  //       action: 'edit'
  //     }
  //   });
  //
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result === 'submit') {
  //       this.calendarData = this.calendarService.getDialogData();
  //       this.calendarEvents.forEach(function (element, index) {
  //         if (this.calendarData.id === element.id) {
  //           this.editEvent(index, this.calendarData);
  //         }
  //       }, this);
  //       this.showNotification(
  //         'black',
  //         'Edit Record Successfully...!!!',
  //         'bottom',
  //         'center'
  //       );
  //       this.addCusForm.reset();
  //     } else if (result === 'delete') {
  //       this.calendarData = this.calendarService.getDialogData();
  //       this.calendarEvents.forEach(function (element, index) {
  //         if (this.calendarData.id === element.id) {
  //           this.filterEvent(element);
  //         }
  //       }, this);
  //       this.showNotification(
  //         'snackbar-danger',
  //         'Delete Record Successfully...!!!',
  //         'bottom',
  //         'center'
  //       );
  //     }
  //   });
  // }
  editEvent(eventIndex, calendarData) {
    const calendarEvents = this.calendarEvents.slice();
    const singleEvent = Object.assign({}, calendarEvents[eventIndex]);
    singleEvent.id = calendarData.id;
    singleEvent.titulo = calendarData.titulo;
    singleEvent.start = calendarData.fechaInicio;
    singleEvent.end = calendarData.fechaFin;
    singleEvent.className = this.getClassNameValue(calendarData.categoria);
    singleEvent.groupId = calendarData.categoria;
    singleEvent.details = calendarData.detalle;
    calendarEvents[eventIndex] = singleEvent;
    this.calendarEvents = calendarEvents; // reassign the array
  }
  handleEventRender(info) {
    // console.log(info)
    // this.todaysEvents = this.todaysEvents.concat(info);
  }
  changeCategory(e: MatRadioChange) {
    this.filterOptions = e.value;
    this.calendarEvents = this.tempEvents;
    this.calendarEvents.forEach(function (element, index) {
      if (
        this.filterOptions !== 'all' &&
        this.filterOptions.toLowerCase() !== element.groupId
      ) {
        this.filterEvent(element);
      }
    }, this);
  }
  filterEvent(element) {
    this.calendarEvents = this.calendarEvents.filter(
      (item) => item !== element
    );
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {}
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName
    });
  }
  public randomIDGenerate(length, chars) {
    let result = '';
    for (let i = length; i > 0; --i)
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  }
  getClassNameValue(category) {
    let className: string;

    if (category === 'work') className = 'fc-event-success';
    else if (category === 'personal') className = 'fc-event-warning';
    else if (category === 'important') className = 'fc-event-primary';
    else if (category === 'travel') className = 'fc-event-danger';
    else if (category === 'friends') className = 'fc-event-info';

    return className;
  }
}
