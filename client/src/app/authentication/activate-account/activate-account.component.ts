import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import { timer } from 'rxjs';
import {GlobalService} from "../../core/service/global.service";
@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.sass']
})
export class ActivateAccountComponent implements OnInit {
  token: string;
  timeLeft: number = 10;
  interval;
  subscribeTimer: any;
  estado: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private globalService: GlobalService,
    private snack: MatSnackBar
  ) {}
  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get( 'token' )
    this.http.post<any>( this.globalService.BASE_API_URL + 'proceso_solicitud_cuenta/procesar/'+this.token , {}).subscribe(data => {
      this.snack.open(data.message, 'OK', {duration: 4000});
      this.estado = 'correcta.'
      this.timeLeft = 10;
      this.interval = setInterval(() => {
        if(this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(this.interval);
          this.router.navigate(['/']);
        }
      },1000)
    }, error => {
      if ( error.error.mensaje !== undefined) {
        this.snack.open(error.error.mensaje, 'OK', {duration: 4000});
        this.estado = 'incorrecta.'
      }
    });
  }

  oberserableTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      this.subscribeTimer = this.timeLeft - val;
    });
  }
}
