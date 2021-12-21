import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, Validators} from "@angular/forms";
import {PrestarEfectivo, SolicitudPrestamo} from "../../../../shared/interfaces/Invested.interface";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AdvanceRestService} from "../../../../core/service/advance-rest.service";

@Component({
  selector: 'app-prestar-efectivo',
  templateUrl: './prestar-efectivo.component.html',
  styleUrls: ['./prestar-efectivo.component.sass']
})
export class PrestarEfectivoComponent implements OnInit {
  action: string;
  _PrestarEfectivo: FormGroup;
  dialogTitle: string;
  advanceTable: PrestarEfectivo;
  isLinear: false;

  constructor(
    public dialogRef: MatDialogRef<PrestarEfectivoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public advanceTableService: AdvanceRestService,

  ) { }

  submit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.dialogRef.close(this._PrestarEfectivo.value);
  }
  ngOnInit(): void {
    this.action = this.data.action;
    if (this.action === 'Editar') {
      this.dialogTitle = this.data.data.nombre;
      this._PrestarEfectivo = this.advanceTableService.buildForm({
        id: [this.data.data.id, Validators.required],
        fondosMes: [this.data.data.fondosMes, Validators.required],
        montoDeposito: [this.data.data.montoDeposito, Validators.required],
        origenRecursos: [this.data.data.origenRecursos, Validators.required],
        destinoInversion: [this.data.data.destinoInversion, Validators.required],
        detalleprestar: [this.data.data.detalleprestar, Validators.required],

      });
    } else {
      this.dialogTitle = 'Crear ' + this.data.title;
      this._PrestarEfectivo = this.advanceTableService.buildForm({
        id: [this.data.data.id, Validators.required],
        fondosMes: [this.data.data.fondosMes, Validators.required],
        montoDeposito: [this.data.data.montoDeposito, Validators.required],
        origenRecursos: [this.data.data.origenRecursos, Validators.required],
        destinoInversion: [this.data.data.destinoInversion, Validators.required],
        detalleprestar: [this.data.data.detalleprestar, Validators.required],
      });
    }
  }
}

