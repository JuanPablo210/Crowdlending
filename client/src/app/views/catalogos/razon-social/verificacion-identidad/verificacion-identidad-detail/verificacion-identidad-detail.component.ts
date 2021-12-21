import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WebcamImage, WebcamInitError, WebcamUtil} from "ngx-webcam";
import {observable, Observable, Subject} from "rxjs";

import {MatSnackBar} from "@angular/material/snack-bar";
import {imagenes} from "../../../../../shared/interfaces/Invested.interface";
import {AdvanceRestService} from "../../../../../core/service/advance-rest.service";

@Component({
  selector: 'app-verificacion-identidad-detail',
  templateUrl: './verificacion-identidad-detail.component.html',
  styleUrls: ['./verificacion-identidad-detail.component.sass']
})
export class VerificacionIdentidadDetailComponent implements OnInit {

  action: string;
  formulario: FormGroup;
  domicilioForm: FormGroup;
  identificacionForm: FormGroup;
  bancarioForm: FormGroup;
  fiscalForm: FormGroup;
  fotografiaForm: FormGroup;
  dialogTitle: any;
  isLinear = true;

  domicilioImg: imagenes;
  identificacionImg: imagenes;
  bancarioImg: imagenes;
  fiscalImg: imagenes;
  fotografiaImg: imagenes;

  constructor(public dialogRef: MatDialogRef<VerificacionIdentidadDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder, private restSerice: AdvanceRestService) {
    this.dialogRef.disableClose = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
  }

  ngOnInit(): void {

    for (let img of this.data.datos) {

      if (img.categoria == 'Comprobante de domicilio') {
        this.domicilioImg = img
      }
      if (img.categoria == 'Identificación Oficial') {
        this.identificacionImg = img
      }
      if (img.categoria == 'Información Bancaria') {
        this.bancarioImg = img
      }
      if (img.categoria == 'Información Fiscal') {
        this.fiscalImg = img
      }
      if (img.categoria == 'Información Personal') {
        this.fotografiaImg = img
      }

    }


    console.log(this.data.datos)
    this.dialogTitle = this.data.title;
    this.formulario = this.formBuilder.group({
      id: [null],
      file1: [null],
      file2: [null],
      file3: [null],
      file5: [null],
      tipoComprobante: [''],
      tipoIdentificacion: [''],
      tipoInfoBancaria: [''],
      tipoInfoFiscal: [''],
      imagen: [null]
    });

    this.domicilioForm = this.formBuilder.group({
      file1: [null],
      tipoComprobante: [null],
    })
    this.identificacionForm = this.formBuilder.group({
      file2: [null],
      tipoIdentificacion: [null],
    })
    this.bancarioForm = this.formBuilder.group({
      file3: [null],
      tipoInfoBancaria: [null],
    })
    this.fiscalForm = this.formBuilder.group({
      file5: [null],
      tipoInfoFiscal: [null],
    })
    this.fotografiaForm = this.formBuilder.group({
      imagen: [null]
    })
  }

  descargar(archivo: imagenes) {
    const _dominio = 'VerificacionIdentidad'
    const _observable = this.restSerice.getReport(_dominio, 'descargarArchivo', {
      id: archivo.id
    });
    return this.restSerice.printReport(_observable, archivo.nombre);
  }

}
