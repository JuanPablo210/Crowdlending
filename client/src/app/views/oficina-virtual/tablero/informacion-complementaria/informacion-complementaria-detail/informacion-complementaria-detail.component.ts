import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-informacion-complementaria-detail',
  templateUrl: './informacion-complementaria-detail.component.html',
  styleUrls: ['./informacion-complementaria-detail.component.sass']
})
export class InformacionComplementariaDetailComponent implements OnInit {
  dialogTitle: any;
  constructor(public dialogRef: MatDialogRef<InformacionComplementariaDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
