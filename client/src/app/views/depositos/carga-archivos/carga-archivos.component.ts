import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from "@angular/material/menu";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {
  DepositosProvicional,
  _combo,
  _importaciones,
  PerfilCliente
} from "../../../shared/interfaces/Invested.interface";
import {MatDialog} from "@angular/material/dialog";
import {BehaviorSubject, fromEvent, merge, Observable, Subscription} from "rxjs";
import {DataSource, SelectionModel} from "@angular/cdk/collections";
import {map} from "rxjs/operators";
import {MatPaginator} from "@angular/material/paginator";

import {MatSort} from "@angular/material/sort";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CargaArchivosFormComponent} from "./carga-archivos-form/carga-archivos-form.component";
import {GlobalService} from "../../../core/service/global.service";
import {AdvanceRestService} from "../../../core/service/advance-rest.service";

@Component({
  selector: 'app-carga-archivos',
  templateUrl: './carga-archivos.component.html',
  styleUrls: ['./carga-archivos.component.sass']
})
export class CargaArchivosComponent implements OnInit {
  public _datos = {
    _title: 'Depósito',
    _modulo: 'Depósitos',
    _icono: 'fas fa-coins',
    _dominio: 'DepositosProvicional',
    _componente: 'Captura de depósitos'
  }
  displayedColumns = [
    'fecha',
    'afiliado',
    'monto',
    'divisa',
    'usuario',
  ];

  selection = new SelectionModel<DepositosProvicional>(true, []);
  advanceTable: DepositosProvicional | null;

  id: number;
  role: string;
  public getRowsSub: Subscription;
  db: AdvanceRestService;
  dataSource: DepositosDataSource | null;

  constructor(
    public httpClient: HttpClient, private globalService: GlobalService, public dialog: MatDialog,
    public advanceTableService: AdvanceRestService, private snackBar: MatSnackBar, private fBuilder: FormBuilder
  ) {
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = {x: '0px', y: '0px'};

  ngOnInit() {
    this.loadData();
    this.role = this.globalService.getRole();
  }

  refresh() {
    this.loadData();
  }

  addNew() {
    let data: any;
    this.advanceTableService.create<DepositosProvicional>(this._datos._dominio).subscribe(result => {
      data = result;
      const dialogRef = this.dialog.open(CargaArchivosFormComponent, {
        data: {titulo: 'Captura de depósito', data: data, action: 'Agregar'}
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (!result) {
          return
        }

        this.advanceTableService.save<string>(this._datos._dominio, result).subscribe(data => {
          this.showNotification('snackbar-success', this._datos._title + 'Agregada!!', 'bottom', 'center');
          this.refresh();
        }, error => {
          if (error._embedded !== undefined) {
            this.showNotification('snackbar-danger', '¡¡Error al guardar!!', 'bottom', 'center');
            Object.entries(error._embedded.errors).forEach(([key, value]) => {
            });
          }
        })
        this.refreshTable();
      });
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize)
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.renderedData.forEach((row) => this.selection.select(row))
  }

  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      this.advanceTableService.delete<string>(this._datos._dominio, item.id).subscribe()
      this.selection = new SelectionModel<DepositosProvicional>(true, []);
    });
    this.loadData();
    this.showNotification('snackbar-danger', totalSelect + '¡¡Registros Eliminados!!', 'bottom', 'center');
  }

  public loadData() {
    this.db = new AdvanceRestService(this.httpClient, this.globalService, this.fBuilder);
    this.dataSource = new DepositosDataSource(this.db, this.paginator, this.sort, this._datos._dominio);
    fromEvent(this.filter.nativeElement, 'keyup').subscribe(() => {
      if (!this.dataSource) {
        return;
      }
      this.dataSource.filter = this.filter.nativeElement.value;
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

  onContextMenu(event: MouseEvent, item: DepositosProvicional) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = {item: item};
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
}

export class DepositosDataSource extends DataSource<DepositosProvicional> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: DepositosProvicional[] = [];
  renderedData: DepositosProvicional[] = [];

  constructor(public _dataSource: AdvanceRestService, public _paginator: MatPaginator, public _sort: MatSort, private _dominio: string) {
    super();
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }

  connect(): Observable<DepositosProvicional[]> {
    const displayDataChanges = [this._dataSource.dataChange, this._sort.sortChange, this._filterChange, this._paginator.page];
    this._dataSource.getAdvancedTable<any>(this._dominio, {'max': 100});
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this._dataSource.data.slice().filter((advanceTable: DepositosProvicional) => {
          const searchStr = (
            advanceTable.afiliado +
            advanceTable.usuario +
            advanceTable.monto +
            advanceTable.fecha +
            advanceTable.divisa
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

  sortData(data: DepositosProvicional[]): DepositosProvicional[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'afiliado':
          [propertyA, propertyB] = [a.afiliado, b.afiliado]
          break
        case 'usuario':
          [propertyA, propertyB] = [a.usuario, b.usuario]
          break
        case 'monto':
          [propertyA, propertyB] = [a.monto, b.monto]
          break
        case 'divisa':
          [propertyA, propertyB] = [a.divisa, b.divisa]
          break
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
  //
  // ngOnInit(): void {
  //   this._contratosFirmados = this._genericRestService.buildForm({
  //     fechaInicio: ['', Validators.required],
  //     fechaFin: ['', Validators.required],
  //     formato: ['PDF']
  //   })
  // }
  //
  // download() {
  //   const fechaInicio =  this.datePipe.transform(this._contratosFirmados.get('fechaInicio').value, 'yyyy-MM-dd');
  //   const fechaFin =  this.datePipe.transform(this._contratosFirmados.get('fechaFin').value, 'yyyy-MM-dd');
  //   const _observable = this._genericRestService.getReport(
  //     'contratosFirmados', 'Reporte',
  //     {
  //       fechaInicio: fechaInicio,
  //       fechaFin: fechaFin
  //     });
  //   // tslint:disable-next-line:max-line-length
  //   return this._genericRestService.printReport(_observable, 'ContratosFirmados.' + this._contratosFirmados.get( 'formato').value.toLowerCase());
  // }
}
