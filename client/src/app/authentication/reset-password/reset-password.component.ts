import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

import {MatSnackBar} from "@angular/material/snack-bar";
import {GlobalService} from "../../core/service/global.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string;
  submitted = false;
  constructor( private formBuilder: FormBuilder,
               private route: ActivatedRoute,
               private router: Router,
               private http: HttpClient,
               private globalService: GlobalService,
               private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get( 'token' )
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      password_conf: ['', Validators.required]
    });
  }

  onSubmit() {
    const signinData = this.resetPasswordForm.value
    this.submitted = true;
    if (this.resetPasswordForm.invalid) {
      return;
    } else {
      this.http.post<any>(this.globalService.BASE_API_URL + 'proceso_solicitud_cuenta/procesar/'+this.token, signinData).subscribe(data => {
        this.submitted = false;
        this.snack.open(data.message, 'OK', {duration: 4000});
        this.router.navigate(['/']);
      }, error => {
        this.submitted = false;
        if ( error.error.message !== undefined) {
          this.snack.open(error.error.message, 'OK', {duration: 4000});
        }
      });
    }
  }
}
