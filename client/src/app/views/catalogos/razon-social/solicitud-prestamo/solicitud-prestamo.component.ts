import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AdvanceRestService} from "../../../../core/service/advance-rest.service";
import { SolicitudPrestamo} from "../../../../shared/interfaces/Invested.interface";

@Component({
  selector: 'app-solicitud-prestamo',
  templateUrl: './solicitud-prestamo.component.html',
  styleUrls: ['./solicitud-prestamo.component.sass']
})
export class SolicitudPrestamoComponent implements OnInit {
  action: string;
  _SolicitudPrestamo: FormGroup;
  dialogTitle: string;
  advanceTable: SolicitudPrestamo;
  isLinear: false;

  constructor(
    public dialogRef: MatDialogRef<SolicitudPrestamoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public advanceTableService: AdvanceRestService,

  ) { }

  submit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.dialogRef.close(this._SolicitudPrestamo.value);
  }
  ngOnInit(): void {

    this.action = this.data.action;
    if (this.action === 'Editar') {
      this.dialogTitle = this.data.data.nombre;
      this._SolicitudPrestamo = this.advanceTableService.buildForm({
        id: [this.data.data.id, Validators.required],
        cantidadDinero: [this.data.data.cantidadDinero, Validators.required],
        mesesAPagar: [this.data.data.mesesAPagar, Validators.required],
        motivoPrestamo: [this.data.data.motivoPrestamo, Validators.required],
        detalleSolicitud: [this.data.data.detalleSolicitud, Validators.required],
      });
    } else {
      this.dialogTitle = 'Crear ' + this.data.title;
      this._SolicitudPrestamo = this.advanceTableService.buildForm({
        id: [this.data.data.id],
        cantidadDinero: [this.data.data.cantidadDinero, Validators.required],
        mesesAPagar: [this.data.data.mesesAPagar, Validators.required],
        motivoPrestamo: [this.data.data.motivoPrestamo, Validators.required],
        detalleSolicitud: [this.data.data.detalleSolicitud, Validators.required],
      });
    }
  }
}
