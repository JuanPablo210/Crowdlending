import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-role-detalle-delete',
  templateUrl: './role-detalle-delete.component.html',
  styleUrls: ['./role-detalle-delete.component.sass']
})
export class RoleDetalleDeleteComponent {
  constructor(public dialogRef: MatDialogRef<RoleDetalleDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dialogRef.close(true);
  }
}
