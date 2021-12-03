import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AdvanceRestService} from '../../../../core/service/advance-rest.service';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.sass']
})
export class MenuFormComponent implements OnInit {
  action: string;
  MenuForm: FormGroup;
  dialogTitle: string;
  constructor(
    public dialogRef: MatDialogRef<MenuFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public advanceTableService: AdvanceRestService,
  ) { }

  submit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.dialogRef.close(this.MenuForm.value);
  }

  ngOnInit(): void {
    this.action = this.data.action;
    const accion = this.action === 'Editar' ? this.action + ' ' : 'Crear ';
    this.dialogTitle = accion + this.data.title;
    this.MenuForm = this.advanceTableService.buildForm({
      id: [this.data.data.id ? this.data.data.id : ''], // nullable y blank true y los id
      icono: [this.data.data.icono ? this.data.data.icono : '', Validators.required],
      nombre: [this.data.data.nombre ? this.data.data.nombre : '', Validators.required],
      etiqueta: [this.data.data.etiqueta ? this.data.data.etiqueta : '', Validators.required],
      habilitado: [this.data.data. habilitado ? this.data.data. habilitado : ''],
    });
  }
}

