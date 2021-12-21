import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-perfil-cliente-detail',
  templateUrl: './perfil-cliente-detail.component.html',
  styleUrls: ['./perfil-cliente-detail.component.sass']
})
export class PerfilClienteDetailComponent implements OnInit {
  dialogTitle: any;
    yes: string = 'Sí';
  constructor(public dialogRef: MatDialogRef<PerfilClienteDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialogRef.disableClose = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.dialogTitle = this.data.title;
    console.log(this.data.datos)
  }

  confirmDelete(): void {
    this.dialogRef.close(true);
  }
}
