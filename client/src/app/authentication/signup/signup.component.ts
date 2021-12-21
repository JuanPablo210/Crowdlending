import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {AdvanceRestService} from "../../core/service/advance-rest.service";
import {GlobalService} from "../../core/service/global.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public _datos = { _title: 'Signup', _modulo: 'Authentication', _icono: 'fas fa-folder-open', _dominio: 'preusuario', _componente: 'signup'};
  formulario: FormGroup;
  _data: any;
  submitted = false;
  hide = true;
  chide = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,public httpClient: HttpClient, private globalService: GlobalService, public dialog: MatDialog,
    public advanceTableService: AdvanceRestService, private snackBar: MatSnackBar, private _genericRestService: AdvanceRestService,
    private fBuilder: FormBuilder, private snack: MatSnackBar,
  ) {}
  ngOnInit() {

    this.formulario = this._genericRestService.buildForm({
      id: ['', Validators.required],
      username: ['', Validators.required],
      mail: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required, Validators.minLength(8)]]

    });
    //Validators.pattern('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$/')
    this._genericRestService.create<any>(this._datos._dominio)
      .subscribe(data => {
        this._data = data;
        this.formulario = this._genericRestService.buildForm({
          id: [this._data.id, Validators.required],
          username: [this._data.username, Validators.required],
          mail: [this._data.mail, Validators.required],
          password: [this._data.password, [Validators.required, Validators.minLength(8) ]],
          password2: [this._data.password2, [Validators.required, Validators.minLength(8) ]]
        });
      });
  }

  submit() {}

  save() {
    if(this.formulario.get("password").value !== this.formulario.get("password2").value ){
      this.snack.open("La contraseña y la confirmacion deben ser iguales", 'OK', {duration: 4000});
      return
    }
    this._genericRestService.save<string>(this._datos._dominio,this.formulario.value).subscribe(data => {
      this.snack.open(' Informacion capturada!, espere instrucciones via email', 'OK', {duration: 8000});
      this.router.navigate(['/']);
    }, error => {
      this.snack.open(error.error.mensaje, 'OK', {duration: 4000});
    });
  }



}
