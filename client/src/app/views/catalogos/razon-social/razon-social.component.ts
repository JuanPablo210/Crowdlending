import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {RazonSocialFormComponent} from './razon-social-form/Afiliacion-Form/razon-social-form.component';
import {MatMenuTrigger} from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {GlobalService} from '../../../core/service/global.service';

import {AdvanceRestService} from '../../../core/service/advance-rest.service';
import {
  chart,
  Cliente, dashboard,
  PrestarEfectivo,
  SolicitudPrestamo,
  verificacion,
  VerificacionIdentidad
} from "../../../shared/interfaces/Invested.interface";
import {DialogService} from "../../../core/service/dialog.service";
import {SolicitudPrestamoComponent} from "./solicitud-prestamo/solicitud-prestamo.component";
import {PrestarEfectivoComponent} from "./prestar-efectivo/prestar-efectivo.component";
import {VerificacionIdentidadFormComponent} from "./verificacion-identidad/verificacion-identidad-form/verificacion-identidad-form.component";
import {VerificacionIdentidadDetailComponent} from "./verificacion-identidad/verificacion-identidad-detail/verificacion-identidad-detail.component";
import {Subscription} from "rxjs";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTooltip,
  ApexPlotOptions
} from 'ng-apexcharts';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AfiliacionDetailComponent} from "./razon-social-form/afiliacion-detail/afiliacion-detail.component";

export type smallBarChart = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
};


@Component({
  selector: 'app-razon-social',
  templateUrl: './razon-social.component.html',
  styleUrls: ['./razon-social.component.sass']
})
export class RazonSocialComponent implements OnInit {
  public _datos = {
    _title: 'Razón Social',
    _modulo: 'Catálogos',
    _icono: 'fas fa-id-card',
    _dominio: 'RazonSocial', _componente: 'Razónes Sociales'};

  public getRowsSub: Subscription;
  dash: dashboard = {
    balanceActual: 0,
    depositos: 0,
    invercoins: 0
  };
  public rows: verificacion = {
    verificacionIdentidadValidator: false,
    informacionPerfilValidator: false,
    informacionPrestamo: false,
    informacionPrestar: false,
  };

  Balance: chart


  constructor(
    public httpClient: HttpClient, private globalService: GlobalService, public dialog: MatDialog,  private http: HttpClient,
    public advanceTableService: AdvanceRestService, private snackBar: MatSnackBar, private fBuilder: FormBuilder, private ds: DialogService
  ) {

  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = {x: '0px', y: '0px'};



  ngOnInit() {
    this.index();


  }
  index() {
    this.getRowsSub = this.advanceTableService.index<verificacion>('InformacionPerfil', {}, 'verificar').subscribe(data => {
      this.rows = data;
    });
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName
    });
  }

  simulador(informacionPerfilValidator: boolean) {
      let data: any;
      this.advanceTableService.initService('Cliente')
      this.advanceTableService.create<Cliente>().subscribe(result => {
        data = result;
        const dialogRef = this.dialog.open(RazonSocialFormComponent, {

          data: { title: this._datos._title, disableClose: true, data: data, action: 'Agregar' }
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (!result) {
            return
          }

          this.advanceTableService.save<string>(result).subscribe(data => {
            this.showNotification( 'snackbar-success', this._datos._title + 'Agregada!!', 'bottom', 'center' );
          }, error => {
            if (error._embedded !== undefined) {
              this.showNotification( 'snackbar-danger', '¡¡Error al guardar!!', 'bottom', 'center' );
              Object.entries(error._embedded.errors).forEach(([key, value]) => { });
            }
          })
        });
      });
    }




  addVerificacionIdentidad(verificacionIdentidadValidator: boolean) {
    const _dominio = 'VerificacionIdentidad'
    if (verificacionIdentidadValidator) {
      let data: any;
      this.advanceTableService.create<VerificacionIdentidad>(_dominio).subscribe(result => {
        data = result;
        const dialogRef = this.dialog.open(VerificacionIdentidadFormComponent, {
          data: {title: this._datos._title, data: data, disableClose: true, action: 'Agregar'}
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (!result) {
            return;
          }
          const documentos = new FormData();
          if (result.file1 && result.file2 && result.file3) {
            documentos.append('file1', result.file1, result.file1.name);
            documentos.append('file2', result.file2, result.file2.name);
            documentos.append('file3', result.file3, result.file3.name);
            documentos.append('file5', result.file5, result.file5.name);
            documentos.append('tipoComprobante', result.tipoComprobante)
            documentos.append('tipoIdentificacion', result.tipoIdentificacion)
            documentos.append('tipoInfoBancaria', result.tipoInfoBancaria)
            documentos.append('tipoInfoFiscal', result.tipoInfoFiscal)
            documentos.append('imagen', result.imagen);
          }
          this.http.post(this.globalService.BASE_API_URL + 'VerificacionIdentidad' + '/save', documentos, {
            headers: {
              'Authorization': 'Bearer=' + this.globalService.getAuthToken()
            }
          }).subscribe(() => {
            this.ds.snack('success', '¡Verificación identidad creada satisfactoriamente!');
            this.index();
          }, () => this.ds.snack('danger', '¡Error al guardar!'));
        });
      });
    } else {
      let datos: VerificacionIdentidad;
      this.advanceTableService.index<VerificacionIdentidad>(_dominio).subscribe(r => {
        datos = r
        const dialogRef = this.dialog.open(VerificacionIdentidadDetailComponent, {
          data: {title: 'Verificación de Identidad', datos: datos},
          width: '60%'
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
          }
        });
      })
    }
  }

  Prestamo(b: boolean) {
    let data: any;
    this.advanceTableService.initService('SolicitudPrestamo')
    this.advanceTableService.create<SolicitudPrestamo>().subscribe(result => {
      data = result;
      const dialogRef = this.dialog.open(SolicitudPrestamoComponent, {

        data: { title: this._datos._title, disableClose: true, data: data, action: 'Agregar' }
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (!result) {
          return
        }

        this.advanceTableService.save<string>(result).subscribe(data => {
          this.showNotification( 'snackbar-success',  'Agregada!!', 'bottom', 'center' );
        }, error => {
          if (error._embedded !== undefined) {
            this.showNotification( 'snackbar-danger', '¡¡Error al guardar!!', 'bottom', 'center' );
            Object.entries(error._embedded.errors).forEach(([key, value]) => { });
          }
        })
      });
    });
  }

  Prestar(b: boolean) {
    let data: any;
    this.advanceTableService.initService('PrestarEfectivo')
    this.advanceTableService.create<PrestarEfectivo>().subscribe(result => {
      data = result;
      const dialogRef = this.dialog.open(PrestarEfectivoComponent, {

        data: { title: this._datos._title, disableClose: true, data: data, action: 'Agregar' }
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (!result) {
          return
        }

        this.advanceTableService.save<string>(result).subscribe(data => {
          this.showNotification( 'snackbar-success',  'Agregada!!', 'bottom', 'center' );
        }, error => {
          if (error._embedded !== undefined) {
            this.showNotification( 'snackbar-danger', '¡¡Error al guardar!!', 'bottom', 'center' );
            Object.entries(error._embedded.errors).forEach(([key, value]) => { });
          }
        })
      });
    });
  }




}

