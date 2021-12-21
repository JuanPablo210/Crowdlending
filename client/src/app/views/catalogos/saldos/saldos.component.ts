import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataSource, SelectionModel} from "@angular/cdk/collections";

import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, fromEvent, merge, Observable, Subscription} from "rxjs";

import {HttpClient} from "@angular/common/http";

import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {map} from "rxjs/operators";
import { DatePipe } from '@angular/common';
import {DateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-saldos',
  templateUrl: './saldos.component.html',
  styleUrls: ['./saldos.component.sass']
})
export class SaldosComponent implements OnInit {
  public _datos = {
    _title: 'Consulta de saldo',
    _modulo: 'Consultas',
    _icono: 'fas fa-desktop',
    _dominio: 'Consultas',
    _componente: 'Consulta de saldos por cliente'
  }
  displayedColumns = [
    'folio',
    'fechaLiquidacion',
    'concepto',
    'masMenos',
    'importe',
    'saldoProyectado',
    'saldoEfectivo',
    'estatus'
  ];
  selection = new SelectionModel<saldoData>(true, []);
  advanceTable: saldoData | null;

  formulario: FormGroup
  id: number;

  saldo: saldoXcliente|null
  public getRowsSub: Subscription;
  db: AdvanceRestService;
  dataSource: ReportesDatasource | null;
  public divisaCombo: _combo[];
  public razonSocialId: any;
  public aliassCombo: _combo[];

  constructor(
    public httpClient: HttpClient, private globalService: GlobalService, public dialog: MatDialog, private datepipe: DatePipe,
    public advanceTableService: AdvanceRestService, private snackBar: MatSnackBar, private fBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  submit() {
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;

  ngOnInit() {
    this.id = Number(this.globalService.getContrato())
    this.formulario =  new FormGroup({
      fechaIni: new FormControl('', Validators.required),
      fechaFin: new FormControl('', Validators.required),
      contrato: new FormControl(this.id, Validators.required),
    });
    this.loadData();
  }

  refresh() {
    // this.loadData();
    this.cargarSaldo()
  }

  cargarSaldo() {
    let fechaIni =  this.datepipe.transform(this.formulario.get('fechaIni').value, 'yyyy/MM/dd')
    let fechaFin =  this.datepipe.transform(this.formulario.get('fechaFin').value, 'yyyy/MM/dd')
    let contrato = this.formulario.get('contrato').value;
    this.advanceTableService.combo<saldoXcliente>({
      fechaIni: fechaIni,
      fechaFin: fechaFin,
      contrato: contrato
    }, 'saldoXclienteInvercoSaldo', this._datos._dominio).subscribe(r => this.saldo = r)
  }

  download() {
    const _observable = this.advanceTableService.getReport(
      'historicoPagos', 'Reporte',
      {
        fechaIni: new Date(this.formulario.get('fechaIni').value).toJSON(),
        fechaFin: new Date(this.formulario.get('fechaFin').value).toJSON(),
        contrato: this.formulario.get('contrato').value,
      });

    return this.advanceTableService.printReport(_observable, 'Reporte de Saldos');
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize)
  }

  public loadData() {
    let fechaIni =  this.datepipe.transform(this.formulario.get('fechaIni').value, 'yyyy/MM/dd')
    let fechaFin =  this.datepipe.transform(this.formulario.get('fechaFin').value, 'yyyy/MM/dd')
    let contrato = this.formulario.get('contrato').value;
    this.db = new AdvanceRestService(this.httpClient, this.globalService, this.fBuilder);
    this.dataSource = new ReportesDatasource(this.db, this.paginator, this.sort, this._datos._dominio, fechaIni, fechaFin, contrato);
    fromEvent(this.filter.nativeElement, 'keyup').subscribe(() => {
      if (!this.dataSource) {
        return;
      }
      this.dataSource.filter = this.filter.nativeElement.value;
    });
  }

}

export class ReportesDatasource extends DataSource<saldoData> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: saldoData[] = [];
  renderedData: saldoData[] = [];

  constructor(public _dataSource: AdvanceRestService, public _paginator: MatPaginator, public _sort: MatSort, private _dominio: string, private fechaIni, private fechaFin, private contrato) { super();
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }

  connect(): Observable<saldoData[]> {
    const displayDataChanges = [this._dataSource.dataChange, this._sort.sortChange, this._filterChange, this._paginator.page];
    if (this.fechaIni != null && this.fechaFin != null) {
      this._dataSource.getAdvancedTable<any>(this._dominio, {
        fechaIni: this.fechaIni,
        fechaFin: this.fechaFin,
        contrato: this.contrato
      }, 'saldoXclienteInverco');
    }
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this._dataSource.data.slice().filter((advanceTable: saldoData) => {
          const searchStr = (
            advanceTable.estatus +
            advanceTable.folio +
            advanceTable.fechaLiquidacion +
            advanceTable.concepto +
            advanceTable.masMenos +
            advanceTable.importe +
            advanceTable.saldoProyectado +
            advanceTable.saldoEfectivo
          ).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });
        const sortedData = this.sortData(this.filteredData.slice());
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      })
    );
  }

  disconnect() {
  }

  sortData(data: saldoData[]): saldoData[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'folio':
          [propertyA, propertyB] = [a.folio, b.folio]
          break;
        case 'concepto':
          [propertyA, propertyB] = [a.concepto, b.concepto]
          break;
        case 'masMenos':
          [propertyA, propertyB] = [a.masMenos, b.masMenos]
          break;
        case 'importe':
          [propertyA, propertyB] = [a.importe, b.importe]
          break;
        case 'saldoProyectado':
          [propertyA, propertyB] = [a.saldoProyectado, b.saldoProyectado]
          break;
        case 'saldoEfectivo':
          [propertyA, propertyB] = [a.saldoEfectivo, b.saldoEfectivo]
          break;
        case 'estatus':
          [propertyA, propertyB] = [a.estatus, b.estatus]
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
