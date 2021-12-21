import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {
  chart, chartInfo,
  dashboard,
  InformacionComplementaria,
  InformacionPerfil,
  PerfilCliente, plan, verificacion,
  VerificacionIdentidad
} from "../../../shared/interfaces/Invested.interface";
// import {AdvanceRestService} from "../../../shared/services/advance-rest.service";
import {HttpClient} from "@angular/common/http";
// import {GlobalService} from "../../../shared/services/global.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatMenuTrigger} from "@angular/material/menu";

import {PerfilClienteDetailComponent} from "./perfil-cliente/perfil-cliente-detail/perfil-cliente-detail.component";
import {InformacionComplementariaDetailComponent} from "./informacion-complementaria/informacion-complementaria-detail/informacion-complementaria-detail.component";
// import {VerificacionIdentidadDetailComponent} from "./verificacion-identidad/verificacion-identidad-detail/verificacion-identidad-detail.component";
// import {DialogService} from "../../../shared/services/dialog.service";
import {ExpedienteFormComponent} from "./expediente-form/expediente-form.component";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTooltip,
  ApexPlotOptions
} from 'ng-apexcharts';
import {AdvanceRestService} from "../../../core/service/advance-rest.service";
import {GlobalService} from "../../../core/service/global.service";
import {DialogService} from "../../../core/service/dialog.service";

export type smallBarChart = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.sass']
})
export class TableroComponent implements OnInit {
  public _datos = {
    _title: 'Información',
    _modulo: 'Inicio',
    _icono: 'fas fa-folder-open',
  }
  public getRowsSub: Subscription;
  dash: dashboard = {
    balanceActual: 0,
    depositos: 0,
    invercoins: 0
  };
  // public rows: verificacion = {
    // informacionPerfilValidator: false,
    // informacionComplementariaValidator: false,
    // perfilClienteValidator: false,
    // verificacionIdentidadValidator: false,
  // };

  Balance: chart
  Depositado: chart
  Invercoins: chart

  constructor(
    public httpClient: HttpClient, private globalService: GlobalService, public dialog: MatDialog, private http: HttpClient,
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

    //this.index();
    this.dashboard();
  }



  // index() {
  //   this.getRowsSub = this.advanceTableService.index<verificacion>('InformacionPerfil', {}, 'verificar').subscribe(data => {
  //     this.rows = data;
  //   });
  // }

  private cardChart2() {
    this.advanceTableService.index<chartInfo>('SaldosProvisional', {}, 'depositosChart').subscribe(result => {
      this.Depositado = {
        series: [{
          name: 'Depositado', data: result.data,
          labels: result.label
        }],
        chart: {type: 'area', height: 50, sparkline: {enabled: true}},
        stroke: {curve: 'straight'},
        colors: ['#9933ff'],
        tooltip: {fixed: {enabled: false}, x: {show: true}, marker: {show: true}},
        xaxis: {labels: {show: true}},
        legend: {show: false},
        yaxis: {show: false},
        grid: {show: false}
      };
    });
  }

  // addAfiliacion(informacionPerfilValidator: boolean) {
  //   const _dominio = 'InformacionPerfil'
  //   if (informacionPerfilValidator) {
  //     let data: any;
  //     this.advanceTableService.create<InformacionPerfil>(_dominio).subscribe(result => {
  //       data = result;
  //       const dialogRef = this.dialog.open(AfiliacionFormComponent, {
  //         width: '80%', height: '95%',
  //         data: {title: this._datos._title, disableClose: true, data: data, action: 'Agregar'}
  //       });
  //       dialogRef.afterClosed().subscribe((result) => {
  //         if (!result) {
  //           return
  //         }
  //
  //         this.advanceTableService.save<string>(_dominio, result).subscribe(() => {
  //             this.ds.snack('success', '¡Afiliado creado satisfactoriamente!');
  //             this.index();
  //           }, () =>
  //             this.ds.snack('danger', '¡Error al guardar!')
  //         )
  //       })
  //     });
  //   } else {
  //     let datos: InformacionPerfil;
  //     this.advanceTableService.index<InformacionPerfil>(_dominio).subscribe(r => {
  //       datos = r[0]
  //       const dialogRef = this.dialog.open(AfiliacionDetailComponent, {
  //         data: {title: 'Afiliación', datos: datos},
  //         width: '60%'
  //       });
  //       dialogRef.afterClosed().subscribe((result) => {
  //         if (result) {
  //         }
  //       });
  //     })
  //   }
  // }
  //

  // addVerificacionIdentidad(verificacionIdentidadValidator: boolean) {
  //   const _dominio = 'VerificacionIdentidad'
  //   if (verificacionIdentidadValidator) {
  //     let data: any;
  //     this.advanceTableService.create<VerificacionIdentidad>(_dominio).subscribe(result => {
  //       data = result;
  //       const dialogRef = this.dialog.open(VerificacionIdentidadFormComponent, {
  //         data: {title: this._datos._title, data: data, disableClose: true, action: 'Agregar'}
  //       });
  //       dialogRef.afterClosed().subscribe((result) => {
  //         if (!result) {
  //           return;
  //         }
  //         const documentos = new FormData();
  //         if (result.file1 && result.file2 && result.file3) {
  //           documentos.append('file1', result.file1, result.file1.name);
  //           documentos.append('file2', result.file2, result.file2.name);
  //           documentos.append('file3', result.file3, result.file3.name);
  //           documentos.append('file5', result.file5, result.file5.name);
  //           documentos.append('tipoComprobante', result.tipoComprobante)
  //           documentos.append('tipoIdentificacion', result.tipoIdentificacion)
  //           documentos.append('tipoInfoBancaria', result.tipoInfoBancaria)
  //           documentos.append('tipoInfoFiscal', result.tipoInfoFiscal)
  //           documentos.append('imagen', result.imagen);
  //         }
  //         this.http.post(this.globalService.BASE_API_URL + 'VerificacionIdentidad' + '/save', documentos, {
  //           headers: {
  //             'Authorization': 'Bearer=' + this.globalService.getAuthToken()
  //           }
  //         }).subscribe(() => {
  //           this.ds.snack('success', '¡Verificación identidad creada satisfactoriamente!');
  //           this.index();
  //         }, () => this.ds.snack('danger', '¡Error al guardar!'));
  //       });
  //     });
  //   } else {
  //     let datos: VerificacionIdentidad;
  //     this.advanceTableService.index<VerificacionIdentidad>(_dominio).subscribe(r => {
  //       datos = r
  //       const dialogRef = this.dialog.open(VerificacionIdentidadDetailComponent, {
  //         data: {title: 'Verificación de Identidad', datos: datos},
  //         width: '60%'
  //       });
  //       dialogRef.afterClosed().subscribe((result) => {
  //         if (result) {
  //         }
  //       });
  //     })
  //   }
  // }

  // addPerfilCliente(perfilClienteValidator: boolean) {
  //   const _dominio = 'PerfilCliente'
  //   if (perfilClienteValidator) {
  //     let data: any;
  //     this.advanceTableService.create<PerfilCliente>(_dominio).subscribe(result => {
  //       data = result;
  //       const dialogRef = this.dialog.open(PerfilClienteFormComponent, {
  //         width: '50%',
  //         data: {title: this._datos._title, disableClose: true, data: data, action: 'Agregar'}
  //       });
  //       dialogRef.afterClosed().subscribe((result) => {
  //         if (!result) {
  //           return
  //         }
  //         this.advanceTableService.save<string>(_dominio, result).subscribe(data => {
  //           this.ds.snack('success', '¡Perfil del cliente agregado satisfactoriamente!');
  //           this.index();
  //         }, () => this.ds.snack('danger', '¡Error al guardar!'))
  //       });
  //     });
  //
  //   } else {
  //     let datos: InformacionPerfil;
  //     this.advanceTableService.index<PerfilCliente>(_dominio).subscribe(r => {
  //       datos = r[0]
  //       const dialogRef = this.dialog.open(PerfilClienteDetailComponent, {
  //         data: {title: 'Perfil del Cliente', datos: datos},
  //         width: '50%'
  //       });
  //       dialogRef.afterClosed().subscribe((result) => {
  //         if (result) {
  //         }
  //       });
  //     })
  //   }
  // }


  // addInformacionComplementaria(informacionComplementariaValidator: boolean) {
  //   const _dominio = 'InformacionComplementaria'
  //   if (informacionComplementariaValidator && this.rows.informacionPerfilValidator) {
  //     let data: any;
  //     this.advanceTableService.create<InformacionComplementaria>(_dominio).subscribe(result => {
  //       let datos: plan
  //       this.advanceTableService.index<plan>(_dominio, {}, 'informacionBancaria').subscribe(r => {
  //         datos = r[0]
  //         data = result;
  //         if (datos && data) {
  //           const dialogRef = this.dialog.open(InformacionComplementariaFormComponent, {
  //             width: '80%', height: '80%',
  //             data: {title: this._datos._title, disableClose: true, data: data, datos: datos, action: 'Agregar'}
  //           });
  //           dialogRef.afterClosed().subscribe((result) => {
  //             if (!result) {
  //               return
  //             }
  //             this.advanceTableService.save<string>(_dominio, result).subscribe(data => {
  //               this.ds.snack('success', '¡Información complementaria agregado satisfactoriamente!');
  //               this.index();
  //             }, () => this.ds.snack('danger', '¡Error al guardar!'))
  //           });
  //         }
  //       })
  //     });
  //   }
  //   if (!informacionComplementariaValidator && this.rows.informacionPerfilValidator) {
  //     let datos: InformacionComplementaria;
  //     this.advanceTableService.index<InformacionComplementaria>(_dominio).subscribe(r => {
  //       datos = r
  //       const dialogRef = this.dialog.open(InformacionComplementariaDetailComponent, {
  //         data: {title: 'Informacion Complementaria', datos: datos},
  //         width: '50%'
  //       });
  //       dialogRef.afterClosed().subscribe((result) => {
  //         if (result) {
  //         }
  //       });
  //     })
  //   }
  // }

  addExpediente() {
    const dominio = 'ExpedienteInv'
    this.advanceTableService.index<InformacionComplementaria>(dominio, {}, 'verificarExpediente').subscribe(() =>
      this.dialog.open(ExpedienteFormComponent, {
        height: '80%', width: '80%'
      }))
  }

  addConsultas() {

  }

  dashboard() {
    this.advanceTableService.index<dashboard>('SaldosProvisional', {}, 'dashboard').subscribe(r => this.dash = r)
  }
}


