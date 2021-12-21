import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, Validators} from "@angular/forms";
import {_bancos, _combo, _subconcepto, formaLiquidacionCombo} from "../../../../shared/interfaces/Invested.interface";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AdvanceRestService} from "../../../../core/service/advance-rest.service";


@Component({
  selector: 'app-depositos-retiros-form',
  templateUrl: './depositos-retiros-form.component.html',
  styleUrls: ['./depositos-retiros-form.component.sass']
})
export class DepositosRetirosFormComponent implements OnInit {
  action: string;
  _depositosForm: FormGroup;
  dialogTitle: string;
  advanceTable: _bancos;
  // currentDate = new Date()

  public contratoCombo: _combo[];
  public divisaCombo: _combo[];
  subconceptoCombo: _combo[];
  formaLiquidacionCombo: formaLiquidacionCombo[];

  constructor(
    public dialogRef: MatDialogRef<DepositosRetirosFormComponent>,
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

    this.advanceTableService.combo<_subconcepto[]>({}, 'subconcepto').subscribe(result =>
      this.subconceptoCombo = result);
    this.advanceTableService.combo<_combo[]>({id: 'Cliente'}, 'comboController').subscribe(result =>
      this.contratoCombo = result);
    this.advanceTableService.combo<_combo[]>({id: 'Divisa'}, 'comboController').subscribe(result =>
      this.divisaCombo = result);
    this.action = this.data.action;
    this.dialogTitle = this.data.titulo;
    this._depositosForm = this.advanceTableService.buildForm({
      folio: [this.data.data.folio?this.data.data.folio:''],
      contrato: [this.data.data.contrato?this.data.data.contrato:'', Validators.required],
      fechaOperacion: [this.data.data.fechaOperacion?this.data.data.fechaOperacion:new Date(), Validators.required],
      fechaLiquidacion: [this.data.data.fechaLiquidacion?this.data.data.fechaLiquidacion:new Date(), Validators.required],
      monto: [this.data.data.monto?this.data.data.monto:'', Validators.required],
      formaLiquidacion: [this.data.data.formaLiquidacion?this.data.data.formaLiquidacion:'', Validators.required],
      subconcepto: [this.data.data.subconcepto?this.data.data.subconcepto:'', Validators.required],
      divisa: [this.data.data.divisa?this.data.data.divisa:'', Validators.required],
    });
  }

  cargarFormaLiquidacion(tipoMovimiento: _subconcepto){
    const contrato = this._depositosForm.get('contrato').value
    this.advanceTableService.combo<formaLiquidacionCombo[]>({contrato: contrato, tipoMovimiento: tipoMovimiento.tipoMovimiento}, 'obtenFormaLiq', 'Liquidacion').subscribe(result =>
      this.formaLiquidacionCombo = result);
  }
}
