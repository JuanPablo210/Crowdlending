import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AdvanceRestService} from '../../../../core/service/advance-rest.service';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.sass']
})
export class RoleFormComponent implements OnInit {
  action: string;
  _categoriassForm: FormGroup;
  dialogTitle: string;
  constructor(
    public dialogRef: MatDialogRef<RoleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public advanceTableService: AdvanceRestService,
  ) {}

  submit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.dialogRef.close(this._categoriassForm.value);
  }

  ngOnInit(): void {

    this.action = this.data.action;
    if (this.action === 'Editar') {
      this.dialogTitle = this.data.data.authority;
      this._categoriassForm = this.advanceTableService.buildForm({
        id: [this.data.data.id, Validators.required],
        authority: [this.data.data.authority, Validators.required],
      });
    } else {
      this.dialogTitle = 'Crear ' + this.data.title;
      this._categoriassForm = this.advanceTableService.buildForm({
        id: [this.data.data.id],
        authority: [this.data.data.authority, Validators.required],
      });
    }
  }
}
