import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, Validators} from "@angular/forms";
import {Divisa} from "../../../../shared/interfaces/Invested.interface";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AdvanceRestService} from "../../../../core/service/advance-rest.service";


@Component({
  selector: 'app-divisa-form',
  templateUrl: './divisa-form.component.html',
  styleUrls: ['./divisa-form.component.sass']
})
export class DivisaFormComponent implements OnInit {
  action: string;
  divisaForm: FormGroup;
  dialogTitle: string;
  advanceTable: Divisa;
  constructor(
    public dialogRef: MatDialogRef<DivisaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public advanceTableService: AdvanceRestService,
  ) {}

  submit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.dialogRef.close(this.divisaForm.value);
  }

  ngOnInit(): void {

    this.action = this.data.action;
    if (this.action === 'Editar') {
      this.dialogTitle = this.data.data.descripcionCorta;
      this.divisaForm = this.advanceTableService.buildForm({
        id: [this.data.data.id],
        clave: [this.data.data.clave, Validators.required],
        descripcion: [this.data.data.descripcion, Validators.required],
        iconta: [this.data.data.iconta],
        frecuencia: [this.data.data.frecuencia],
        escenario: [this.data.data.escenario],
      });
    } else {
      this.dialogTitle = 'Crear ' + this.data.title;
      this.divisaForm = this.advanceTableService.buildForm({
        id: [this.data.data.id],
        clave: [this.data.data.clave, Validators.required],
        descripcion: [this.data.data.descripcion, Validators.required],
        iconta: [this.data.data.iconta],
        frecuencia: [this.data.data.frecuencia],
        escenario: [this.data.data.escenario],
      });
    }
  }
}
