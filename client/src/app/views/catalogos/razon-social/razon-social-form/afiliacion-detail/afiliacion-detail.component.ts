import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-afiliacion-detail',
  templateUrl: './afiliacion-detail.component.html',
  styleUrls: ['./afiliacion-detail.component.sass']
})
export class AfiliacionDetailComponent implements OnInit {
  dialogTitle: any;
  constructor(public dialogRef: MatDialogRef<AfiliacionDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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



