import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import {ExpedienteInv} from "../../../../shared/interfaces/Invested.interface";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

import {MatSnackBar} from "@angular/material/snack-bar";

import {FormBuilder, FormGroup} from "@angular/forms";

import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {BehaviorSubject, fromEvent, merge, Observable, Subscription} from "rxjs";
import Swal from "sweetalert2";
import {DataSource} from "@angular/cdk/table";
import {map} from "rxjs/operators";
import {MatMenuTrigger} from "@angular/material/menu";
import {HttpClient} from "@angular/common/http";
import {DialogService} from "../../../../core/service/dialog.service";
import {AdvanceRestService} from "../../../../core/service/advance-rest.service";
import {GlobalService} from "../../../../core/service/global.service";

@Component({
  selector: 'app-expediente-form',
  templateUrl: './expediente-form.component.html',
  styleUrls: ['./expediente-form.component.sass']
})
export class ExpedienteFormComponent implements OnInit {
  cargoAbono: boolean = false
  action: string;
  monto: number;
  saldo: number;
  importeAcumulado: number;
  etiqueta: string;
  ExpedienteInvForm: FormGroup;
  dialogTitle: string = 'sadsadas';
  advanceTable: ExpedienteInv | null;
  constructor(
    public dialogRef: MatDialogRef<ExpedienteFormComponent>, private dialogService: DialogService,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    public httpClient: HttpClient, private globalService: GlobalService, public dialog: MatDialog,
    public advanceTableService: AdvanceRestService, private snackBar: MatSnackBar, private fBuilder: FormBuilder
  ) {}

  submit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
  }

  ngOnInit(): void {
    // this.advanceTableService.initService(this._datos._dominio);
    this.loadData();
  }
  public _datos = { _title: 'Expediente', _modulo: 'Catalogos', _icono: 'fas fa-folder-open', _dominio: 'ExpedienteInv', _componente: 'Expediente'}
  displayedColumns = [ 'select',  'titulo', 'actions' ];
  selection = new SelectionModel<ExpedienteInv>(true, []);
  datos = {
    modulo: 'Oficina Virtual',
    componente: 'Tablero',
    subComponente: 'Expediente',
    icono: 'fas fa-home',
    titulo: 'Archivo',
    controlador: 'ExpedienteInv'
  }
  id: number;
  public getRowsSub: Subscription;
  db: AdvanceRestService;
  dataSource: BancosDataSource | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  refresh() { this.loadData(); }

  private refreshTable() { this.paginator._changePageSize(this.paginator.pageSize) }

    descargar(row: ExpedienteInv) {
    const _dominio = 'Reporte'
    const _observable = this.advanceTableService.getReport(_dominio, 'reporte', {
      formatoArchivo: row.formato,
      reporte: row.reporte
    });
    return this.advanceTableService.printReport(_observable, row.titulo);
  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      this.descargar(item)
      this.dialogService.snack('success', '¡' + item.titulo + ' descargado!');
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }

  masterToggle() { this.isAllSelected() ? this.selection.clear() : this.dataSource.renderedData.forEach((row) => this.selection.select(row))}

  public loadData() {
    this.db = new AdvanceRestService(this.httpClient, this.globalService, this.fBuilder);
    this.dataSource = new BancosDataSource( this.db, this.paginator, this.sort, this._datos._dominio);
    fromEvent(this.filter.nativeElement, 'keyup').subscribe(() => {
      if (!this.dataSource) { return; }
      this.dataSource.filter = this.filter.nativeElement.value;
    });
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', { duration: 2000, verticalPosition: placementFrom, horizontalPosition: placementAlign, panelClass: colorName });
  }

  onContextMenu(event: MouseEvent, item: ExpedienteInv) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

}
export class BancosDataSource extends DataSource<ExpedienteInv> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }
  filteredData: ExpedienteInv[] = [];
  renderedData: ExpedienteInv[] = [];

  constructor(public _dataSource: AdvanceRestService, public _paginator: MatPaginator, public _sort: MatSort, private _dominio: string) {
    super();
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }

  connect(): Observable<ExpedienteInv[]> {
    const displayDataChanges = [ this._dataSource.dataChange, this._sort.sortChange, this._filterChange, this._paginator.page ];
    this._dataSource.getAdvancedTable<any>(this._dominio);
    return merge(...displayDataChanges).pipe( map(() => {
        this.filteredData = this._dataSource.data.slice().filter((advanceTable: ExpedienteInv) => {
          const searchStr = (
            advanceTable.titulo
          ).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });
        const sortedData = this.sortData(this.filteredData.slice());
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice( startIndex, this._paginator.pageSize );
        return this.renderedData;
      })
    );
  }

  disconnect() {}

  sortData(data: ExpedienteInv[]): ExpedienteInv[] {
    if (!this._sort.active || this._sort.direction === '') { return data; }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'titulo':
          [propertyA, propertyB] = [a.titulo, b.titulo];
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
