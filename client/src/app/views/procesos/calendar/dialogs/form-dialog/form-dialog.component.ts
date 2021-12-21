import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CalendarService } from '../../calendar.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { Calendar } from '../../calendar.model';
import { formatDate } from '@angular/common';
import {AdvanceRestService} from "../../../../../core/service/advance-rest.service";
import {Calendar_, PrestarEfectivo} from "../../../../../shared/interfaces/Invested.interface";
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  calendarForm: FormGroup;
  calendar: Calendar;
  showDeleteBtn = false;
  advanceTable: Calendar_;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public calendarService: CalendarService,
    private fb: FormBuilder,
    public advanceTableService: AdvanceRestService
  ) {
    // Set the defaults
  }
  submit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.dialogRef.close(this.calendarForm.value);
  }
  ngOnInit(): void {
    this.action = this.data.action;
    if (this.action === 'Editar') {
      this.dialogTitle = this.data.data.nombre;
      this.calendarForm = this.advanceTableService.buildForm({

        titulo: [this.data.data.titulo, Validators.required],
        categoria: [this.data.data.categoria, Validators.required],
        fechaInicio: [this.data.data.fechaInicio, Validators.required],
        fechaFin: [this.data.data.fechaFin, Validators.required],
        detalle: [this.data.data.detalle, Validators.required],
      });
    } else {
      this.dialogTitle = 'Crear ' + this.data.title;
      this.calendarForm = this.advanceTableService.buildForm({

        titulo: [this.data.data.titulo, Validators.required],
        categoria: [this.data.data.categoria, Validators.required],
        fechaInicio: [this.data.data.fechaInicio, Validators.required],
        fechaFin: [this.data.data.fechaFin, Validators.required],
        detalle: [this.data.data.detalle, Validators.required],
      });
    }
  }

}
