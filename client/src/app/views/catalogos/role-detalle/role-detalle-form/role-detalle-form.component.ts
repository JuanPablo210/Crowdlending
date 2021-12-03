import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-role-detalle-form',
  templateUrl: './role-detalle-form.component.html',
  styleUrls: ['./role-detalle-form.component.sass']
})
export class RoleDetalleFormComponent implements OnInit {
  action: string;
  role: FormGroup;
  dialogTitle: string;
  constructor() { }

  ngOnInit(): void {
  }

}
