import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AdvanceRestService} from '../../../../core/service/advance-rest.service';
import {FormGroup, Validators} from "@angular/forms";
import {_combo} from "../../../../core/models/data.interface";

@Component({
  selector: 'app-usuario-role-form',
  templateUrl: './usuario-role-form.component.html',
  styleUrls: ['./usuario-role-form.component.sass']
})
export class UsuarioRoleFormComponent implements OnInit {
  action: string;
  UsuarioRole: FormGroup;
  dialogTitle: string;
  usuariosCombo: _combo[];
  roleCombo: _combo[];
  constructor(
    public dialogRef: MatDialogRef<UsuarioRoleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public advanceTableService: AdvanceRestService,
  ) { }
  submit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.dialogRef.close(this.UsuarioRole.value);
  }
  ngOnInit(): void {
    this.advanceTableService.combo<_combo[]>({id: 'Usuario'}, 'comboSecurity').subscribe(res =>
      this.usuariosCombo = res); // Combo categorias
    this.advanceTableService.combo<_combo[]>({id: 'Role'}, 'comboSecurity').subscribe(res =>
      this.roleCombo = res); // Combo categorias
    this.action = this.data.action;
    const accion = this.action === 'Editar' ? this.action + ' ' : 'Crear ';
    this.dialogTitle = accion + this.data.title;
    this.UsuarioRole = this.advanceTableService.buildForm({
      usuario: [this.data.data.usuario ? this.data.data.usuario : '', Validators.required],
      role: [this.data.data.role ? this.data.data.role : '', Validators.required],
    });
    }
}
