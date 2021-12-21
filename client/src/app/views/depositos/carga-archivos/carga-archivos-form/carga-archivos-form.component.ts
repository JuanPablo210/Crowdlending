import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {_bancos, _combo} from "../../../../shared/interfaces/Invested.interface";
import {AdvanceRestService} from "../../../../core/service/advance-rest.service";

@Component({
  selector: 'app-carga-archivos-form',
  templateUrl: './carga-archivos-form.component.html',
  styleUrls: ['./carga-archivos-form.component.sass']
})
export class CargaArchivosFormComponent implements OnInit {
  action: string;
  _depositosForm: FormGroup;
  dialogTitle: string;
  advanceTable: _bancos;
  // currentDate = new Date()

  public clienteCombo: _combo[];
  public divisaCombo: _combo[];

  constructor(
    public dialogRef: MatDialogRef<CargaArchivosFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public advanceTableService: AdvanceRestService,
  ) {}

  submit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.dialogRef.close(this._depositosForm.value);
  }

  ngOnInit(): void {

    this.advanceTableService.combo<_combo[]>({id: 'Cliente'}, 'comboController').subscribe(result =>
      this.clienteCombo = result);
    this.advanceTableService.combo<_combo[]>({id: 'Divisa'}, 'comboController').subscribe(result =>
      this.divisaCombo = result);
    this.action = this.data.action;
      this.dialogTitle = this.data.titulo;
      this._depositosForm = this.advanceTableService.buildForm({
        id: [this.data.data.id?this.data.data.id:''],
        afiliado: [this.data.data.afiliado?this.data.data.afiliado:'', Validators.required],
        fecha: [this.data.data.fecha?this.data.data.fecha:'', Validators.required],
        monto: [this.data.data.monto?this.data.data.monto:'', Validators.required],
        divisa: [this.data.data.divisa?this.data.data.divisa:'', Validators.required],
      });
  }
}
