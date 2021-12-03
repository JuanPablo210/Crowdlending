import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {_combo, beneficiarios} from "../../../../../shared/interfaces/Invested.interface";
import {AdvanceRestService} from "../../../../../core/service/advance-rest.service";

@Component({
  selector: 'app-informacion-complementaria-form',
  templateUrl: './informacion-complementaria-form.component.html',
  styleUrls: ['./informacion-complementaria-form.component.sass']
})
export class InformacionComplementariaFormComponent implements OnInit {
  public conceptos = [];

  public nombreBanco: string = ''
  public clabe: string = ''

  isLinear = true;
  public porcentaje = 0;

  beneficiariosForm: FormGroup;
  listaBeneficiariosForm: FormGroup;
  conductoAportacionForm: FormGroup;

  public nombreCompleto;

  dialogTitle: any;
  public bancosCombo: _combo[];
  public tipoRelacionCombo: _combo[];

  constructor(
    public dialogRef: MatDialogRef<InformacionComplementariaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public advanceTableService: AdvanceRestService,
  ) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {

    this.beneficiariosFormulario();
    this.listaBeneficiarios();
    this.advanceTableService.combo<_combo[]>({id: 'Bancos'}, 'comboController').subscribe(result =>
      this.bancosCombo = result);
    this.advanceTableService.combo<_combo[]>({id: 'TipoRelacion'}, 'comboController').subscribe(result =>
      this.tipoRelacionCombo = result);

    this.conductoAportacionForm = this.advanceTableService.buildForm({
      bancoCargo: [this.data.data.bancoCargo ? this.data.data.bancoCargo : '', Validators.required],
      cuentaCargo: [this.data.data.cuentaCargo ? this.data.data.cuentaCargo : '', [Validators.required]],
      claveInterbancariaCargo: [this.data.data.claveInterbancariaCargo ? this.data.data.claveInterbancariaCargo : '', [Validators.required, Validators.minLength(18), Validators.maxLength(18)]],
      bancoAbono: [this.data.data.bancoAbono ? this.data.data.bancoAbono : '', [Validators.required]],
      cuentaAbono: [this.data.data.cuentaAbono ? this.data.data.cuentaAbono : '', [Validators.required]],
      claveInterbancariaAbono: [this.data.data.claveInterbancariaAbono ? this.data.data.claveInterbancariaAbono : '', [Validators.required, Validators.minLength(18), Validators.maxLength(18)]],
      disclaimer: [this.data.data.disclaimer ? this.data.data.disclaimer : true, Validators.required],
    });

  }

  listaBeneficiarios() {
    this.listaBeneficiariosForm = this.advanceTableService.buildForm({
      beneficiarios: [null, Validators.required]
    });
  }

  beneficiariosFormulario() {
    this.beneficiariosForm = this.advanceTableService.buildForm({
      nombre: [this.data.data.nombre ? this.data.data.nombre : '', Validators.required],
      apellidos: [this.data.data.apellidos ? this.data.data.apellidos : '', Validators.required],
      parentesco: [this.data.data.parentesco ? this.data.data.parentesco : '', Validators.required],
      porcentaje: [100 - this.porcentaje, [Validators.required, Validators.max(100 - this.porcentaje)]],
      telefono: [this.data.data.telefono ? this.data.data.telefono : '', [Validators.required, Validators.maxLength(10)]],
    });
  }

  addNewBeneficiario() {
    const portcetajeForm = Number(this.beneficiariosForm.get('porcentaje').value)
    if (portcetajeForm > 0) {
      let tipoRelacion = ''
      for (let tr of this.tipoRelacionCombo) {
        if (tr.id == this.beneficiariosForm.get('parentesco').value) {
          tipoRelacion = tr.descripcion
        }
      }
      this.conceptos.push({
        nombre: this.beneficiariosForm.get('nombre').value,
        apellidos: this.beneficiariosForm.get('apellidos').value,
        parentesco: this.beneficiariosForm.get('parentesco').value,
        porcentaje: this.beneficiariosForm.get('porcentaje').value,
        telefono: this.beneficiariosForm.get('telefono').value,
        tipoRelacion: tipoRelacion
      });
      let p = Number(this.beneficiariosForm.get('porcentaje').value)
      this.porcentaje = this.porcentaje + p
      this.beneficiariosFormulario();
    }
    if (this.porcentaje == 100) {
      this.listaBeneficiariosForm.patchValue({beneficiarios: this.conceptos})
    }
  }

  eliminarBeneficiario(c: beneficiarios) {
    let p = c.porcentaje
    this.porcentaje = this.porcentaje - p
    const indice = this.conceptos.indexOf(c);
    this.conceptos.splice(indice, 1);
    this.beneficiariosFormulario()
    this.listaBeneficiarios()
  }


  Guardar(): void {
    const infoComp = [
      {
        beneficiarios: this.conceptos,
        bancoCargo: this.conductoAportacionForm.get('bancoCargo').value,
        cuentaCargo: this.conductoAportacionForm.get('cuentaCargo').value,
        claveInterbancariaCargo: this.conductoAportacionForm.get('claveInterbancariaCargo').value,
        bancoAbono: this.conductoAportacionForm.get('bancoAbono').value,
        cuentaAbono: this.conductoAportacionForm.get('cuentaAbono').value,
        claveInterbancariaAbono: this.conductoAportacionForm.get('claveInterbancariaAbono').value,
        disclaimer: this.conductoAportacionForm.get('disclaimer').value,
      }
    ]
    this.dialogRef.close(infoComp[0]);
  }


  parcharBanco(value: any) {
    this.nombreBanco = ''
    for (let b of this.bancosCombo) {
      if (b.id == value) {
        this.nombreBanco = b.descripcion
      }
    }
  }

  parcharClabe() {
    this.clabe = this.conductoAportacionForm.get('claveInterbancariaCargo').value
  }
}
