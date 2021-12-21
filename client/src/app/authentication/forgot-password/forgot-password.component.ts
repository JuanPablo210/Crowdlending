import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";

import {MatSnackBar} from "@angular/material/snack-bar";
import {GlobalService} from "../../core/service/global.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private globalService: GlobalService,
    private snack: MatSnackBar
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }
  onSubmit() {
    const signinData = this.loginForm.value
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.http.post<any>(this.globalService.BASE_API_URL + 'proceso_solicitud_cuenta/recuperar', signinData).subscribe(data => {
        this.submitted = false;
        this.snack.open(data.message, 'OK', {duration: 4000});
        this.router.navigate(['/']);
      }, error => {
        this.submitted = false;
        if ( error.error.mensaje !== undefined) {
          this.snack.open(error.error.mensaje, 'OK', {duration: 4000});
        }
      });
    }
  }
}
