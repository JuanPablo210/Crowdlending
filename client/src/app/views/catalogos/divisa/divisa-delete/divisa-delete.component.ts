import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-divisa-delete',
  templateUrl: './divisa-delete.component.html',
  styleUrls: ['./divisa-delete.component.sass']
})
export class DivisaDeleteComponent {
  constructor( public dialogRef: MatDialogRef<DivisaDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: any ) {}

  onNoClick(): void { this.dialogRef.close(); }

  confirmDelete(): void { this.dialogRef.close(true); }
}

