import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-usuario-role-delete',
  templateUrl: './usuario-role-delete.component.html',
  styleUrls: ['./usuario-role-delete.component.sass']
})
export class UsuarioRoleDeleteComponent {
  constructor(public dialogRef: MatDialogRef<UsuarioRoleDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dialogRef.close(true);
  }
}
