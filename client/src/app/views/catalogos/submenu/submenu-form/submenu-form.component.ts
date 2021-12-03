import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AdvanceRestService} from '../../../../core/service/advance-rest.service';
import {_combo} from '../../../../core/models/data.interface';

@Component({
  selector: 'app-submenu-form',
  templateUrl: './submenu-form.component.html',
  styleUrls: ['./submenu-form.component.sass']
})
export class SubmenuFormComponent implements OnInit {
  action: string;
  submenu: FormGroup;
  dialogTitle: string;
  menuCombo: any;

  constructor(
    public dialogRef: MatDialogRef<SubmenuFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public advanceTableService: AdvanceRestService,
  ) { }

  submit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.dialogRef.close(this.submenu.value);
  }
  ngOnInit(): void {

    this.advanceTableService.combo<_combo[]>({id: 'Menu'}, 'comboSecurity').subscribe(res =>
      this.menuCombo = res); // Combo categorias
    this.action = this.data.action;
    const accion = this.action === 'Editar' ? this.action + ' ' : 'Crear ';
    this.dialogTitle = accion + this.data.title;
    this.submenu = this.advanceTableService.buildForm({
      id: [this.data.data.id ? this.data.data.id : ''],
      menu: [this.data.data.menu ? this.data.data.menu.id : '', Validators.required],
      titulo: [this.data.data.titulo ? this.data.data.titulo : '', Validators.required],
      subtitulo: [this.data.data.subtitulo ? this.data.data.subtitulo : '', Validators.required],
      habilitado: [this.data.data.habilitado ? this.data.data.habilitado : '', Validators.required],
      etiqueta: [this.data.data.etiqueta ? this.data.data.etiqueta : '', Validators.required],
      url: [this.data.data.url ? this.data.data.url : '', Validators.required],
      controller: [this.data.data.controller ? this.data.data.controller : '', Validators.required],
      controllerAs: [this.data.data.controllerAs ? this.data.data.controllerAs : '', Validators.required],
      template: [this.data.data.template ? this.data.data.template : '', Validators.required],
      sistema: [this.data.data.sistema ? this.data.data.sistema : '', Validators.required],
      urlAjs: [this.data.data.urlAjs ? this.data.data.urlAjs : '', Validators.required],
      esCatalogo: [this.data.data.esCatalogo ? this.data.data.esCatalogo : true, Validators.required]
    });
  }

}
