import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-submenu-delete',
  templateUrl: './submenu-delete.component.html',
  styleUrls: ['./submenu-delete.component.sass']
})
export class SubmenuDeleteComponent {
  constructor(public dialogRef: MatDialogRef<SubmenuDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dialogRef.close(true);
  }
}
