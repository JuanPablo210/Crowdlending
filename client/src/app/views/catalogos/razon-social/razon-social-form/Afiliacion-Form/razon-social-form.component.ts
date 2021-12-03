import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {_razonSocial} from '../../../../../core/models/data.interface';
import {AdvanceRestService} from '../../../../../core/service/advance-rest.service';

@Component({
  selector: 'app-razon-social-form',
  templateUrl: './razon-social-form.component.html',
  styleUrls: ['./razon-social-form.component.scss']
})
export class RazonSocialFormComponent implements OnInit {
  action: string;
  _razonSocialForm: FormGroup;
  dialogTitle: string;
  advanceTable: _razonSocial;
  isLinear: false;
  // private estadoNacimientoCombo: _combo[];
  constructor(
    public dialogRef: MatDialogRef<RazonSocialFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public advanceTableService: AdvanceRestService,

  ) { }

  submit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.dialogRef.close(this._razonSocialForm.value);

  }

  ngOnInit(): void {

    this.action = this.data.action;
    if (this.action === 'Editar') {
      this.dialogTitle = this.data.data.nombre;
      this._razonSocialForm = this.advanceTableService.buildForm({
        id: [this.data.data.id, Validators.required],
        nombre: [this.data.data.nombre, Validators.required],
        apellidoPaterno:  [this.data.data.nombre, Validators.required],
        apellidoMaterno:  [this.data.data.nombre, Validators.required],
        fechaNacimiento:  [this.data.data.nombre, Validators.required],
        sexo:  [this.data.data.nombre, Validators.required],
        curp:  [this.data.data.nombre, Validators.required],
        // estadoNacimiento:  [this.data.data.nombre, Validators.required],
        nivelMaximoDeEstudio:  [this.data.data.nombre, Validators.required],
        estadoCivil:  [this.data.data.nombre, Validators.required],
        nombreEmpresa:  [this.data.data.nombre, Validators.required],
        puestoActual:  [this.data.data.nombre, Validators.required],
        rfc: [this.data.data.rfc, [ Validators.required, Validators.minLength(12), Validators.maxLength(13)]],
        estatus: [this.data.data.estatus],
        calle: [this.data.data.calle, Validators.required],
        noExterior: [this.data.data.noExterior, Validators.required],
        noInterior: [this.data.data.noInterior, Validators.required],
        colonia: [this.data.data.colonia, Validators.required],
        codigoPostal: [this.data.data.codigoPostal, Validators.required],
        localidad: [this.data.data.localidad, Validators.required],
        municipio: [this.data.data.municipio, Validators.required],
        estado: [this.data.data.estado, Validators.required],
        pais: [this.data.data.pais, Validators.required],
        telefono: [this.data.data.telefono, Validators.required],
        email: [this.data.data.email, Validators.required],

        // cantidadDinero: [this.data.data.cantidadDinero, Validators.required],
        // mesesAPagar: [this.data.data.mesesAPagar, Validators.required],
        // motivoPrestamo: [this.data.data.motivoPrestamo, Validators.required],
        // detalleSolicitud: [this.data.data.detalleSolicitud, Validators.required],

      });
    } else {
      this.dialogTitle = 'Crear ' + this.data.title;
      this._razonSocialForm = this.advanceTableService.buildForm({
        id: [this.data.data.id],
        nombre: [this.data.data.nombre, Validators.required],
        apellidoPaterno: [this.data.data.apellidoPaterno, Validators.required],
        apellidoMaterno: [this.data.data.apellidoMaterno, Validators.required],
        fechaNacimiento: [this.data.data.fechaNacimiento, Validators.required],
        sexo: [this.data.data.sexo, Validators.required],
        curp: [this.data.data.curp, Validators.required],
        // estadoNacimiento: [this.data.data.nombre, Validators.required],
        nivelMaximoDeEstudio: [this.data.data.nivelMaximoDeEstudio, Validators.required],
        estadoCivil: [this.data.data.estadoCivil, Validators.required],
        nombreEmpresa: [this.data.data.nombreEmpresa, Validators.required],
        puestoActual: [this.data.data.puestoActual, Validators.required],
        rfc: [this.data.data.rfc, [ Validators.required, Validators.minLength(12), Validators.maxLength(13)]],
        estatus: [this.data.data.estatus],
        calle: [this.data.data.calle, Validators.required],
        noExterior: [this.data.data.noExterior, Validators.required],
        noInterior: [this.data.data.noInterior, Validators.required],
        colonia: [this.data.data.colonia, Validators.required],
        codigoPostal: [this.data.data.codigoPostal, Validators.required],
        localidad: [this.data.data.localidad, Validators.required],
        municipio: [this.data.data.municipio, Validators.required],
        estado: [this.data.data.estado, Validators.required],
        pais: [this.data.data.pais, Validators.required],
        telefono: [this.data.data.telefono, Validators.required],
        email: [this.data.data.email, Validators.required],

        // cantidadDinero: [this.data.data.cantidadDinero, Validators.required],
        // mesesAPagar: [this.data.data.mesesAPagar, Validators.required],
        // motivoPrestamo: [this.data.data.motivoPrestamo, Validators.required],
        // detalleSolicitud: [this.data.data.detalleSolicitud, Validators.required],


        alimentosSaludRopa: [this.data.data.alimentosSaludRopa, Validators.required],
        renta: [this.data.data.renta, Validators.required],
        tarjetaYdeudas: [this.data.data.tarjetaYdeudas, Validators.required],
        servicios: [this.data.data.servicios, Validators.required],
        transportesYgasolina: [this.data.data.transportesYgasolina, Validators.required],
        educacion: [this.data.data.educacion, Validators.required],
        recreacionPersonal: [this.data.data.recreacionPersonal, Validators.required],
        seguros: [this.data.data.seguros, Validators.required],
        otrosGastos: [this.data.data.otrosGastos, Validators.required],


      });
    }
  }
}
