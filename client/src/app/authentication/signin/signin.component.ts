import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {MatButton} from "@angular/material/button";
import {MatProgressBar} from "@angular/material/progress-bar";
import {GlobalService} from "../../core/service/global.service";
import {AuthGuard} from "../../core/guard/auth.guard";
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  @ViewChild(MatProgressBar, {static: false}) progressBar: MatProgressBar;
  @ViewChild(MatButton, {static: false}) submitButton: MatButton;
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  hide = true;

  constructor(
    private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private http: HttpClient,
   private globalService: GlobalService, private snack: MatSnackBar, private authGuard: AuthGuard
  ) {}

  ngOnInit() {
    const validate = this.validateSession();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    validate.subscribe( data => {
      const c = data as any;
      this.authGuard.saveCredentials(c.role, c.puesto, c.avatar, c.usuario, c.menu);
      let ruta = this.ruta(c.role)
      this.router.navigate([ruta]);
    });
  }

  onSubmit() {
    const signinData = this.loginForm.value
    this.submitButton.disabled = true;
    this.http.post(this.globalService.BASE_API_URL + 'api/login', signinData).subscribe(data => {
      this.submitButton.disabled = false;
      const d = data as any;
      let options;
      this.authGuard.autheticate(d.access_token, signinData.username);
      options = this.globalService.getHttpOptions();
      options.params = {id: signinData.username};
      this.http.get(this.globalService.BASE_API_URL + 'init/getsession', options).subscribe(next => {
        const c = next as any;
        this.authGuard.saveCredentials(c.role, c.puesto, c.avatar, c.usuario, c.menu);
        let ruta = this.ruta(c.role)
        this.router.navigate([ruta]);
      });
    }, error => {
      this.submitButton.disabled = false;
      if ( error.error.mensaje !== undefined) {
        this.snack.open(error.error.mensaje, 'OK', {duration: 4000});
      }
    });
  }

  validateSession() {
    return this.http.get(this.globalService.BASE_API_URL + 'init/getsession', this.globalService.getHttpOptions());
  }

  ruta(role: string){
    let ruta = '/Catalogos/'
    switch (role){
      case 'Administrador de Sistemas':
        ruta = ruta + 'Afiliados';
        break;
      case 'Afiliado':
        ruta = ruta + 'Tablero';
        break;
      case 'Mesa de Control':
        ruta = ruta + 'Bandeja-de-Entrada';
        break;
    }
    return ruta
  }
}
