import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataSource, SelectionModel} from "@angular/cdk/collections";
import {liquidacion, Divisa} from "../../../shared/interfaces/Invested.interface";
import {BehaviorSubject, fromEvent, merge, Observable, Subscription} from "rxjs";

import {HttpClient} from "@angular/common/http";

import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatMenuTrigger} from "@angular/material/menu";
import {map} from "rxjs/operators";
import {DepositosRetirosFormComponent} from "./depositos-retiros-form/depositos-retiros-form.component";
import {GlobalService} from "../../../core/service/global.service";
import {AdvanceRestService} from "../../../core/service/advance-rest.service";

@Component({
  selector: 'app-depositos-retiros',
  templateUrl: './depositos-retiros.component.html',
  styleUrls: ['./depositos-retiros.component.sass']
})
export class DepositosRetirosComponent implements OnInit {
  public _datos = {
    _title: 'Depósito o Retiro',
    _modulo: 'Capturas',
    _icono: 'fas fa-edit',
    _dominio: 'Liquidacion',
    _componente: 'Captura de Depósitos y Retiros'
  }
  displayedColumns = [
    'folio',
    'contrato',
    'nombre',
    'concepto'
  ];

  selection = new SelectionModel<liquidacion>(true, []);
  advanceTable: liquidacion | null;

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
    this.advanceTableService.create<liquidacion>(this._datos._dominio).subscribe(result => {
      data = result;
      const dialogRef = this.dialog.open(DepositosRetirosFormComponent, {
        data: {titulo: 'Alta de liquidación', data: data, action: 'Agregar'}
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
      this.advanceTableService.delete<string>(this._datos._dominio, item.folio).subscribe()
      this.selection = new SelectionModel<liquidacion>(true, []);
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

  onContextMenu(event: MouseEvent, item: liquidacion) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = {item: item};
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
}

export class DepositosDataSource extends DataSource<liquidacion> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: liquidacion[] = [];
  renderedData: liquidacion[] = [];

  constructor(public _dataSource: AdvanceRestService, public _paginator: MatPaginator, public _sort: MatSort, private _dominio: string) {
    super();
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }

  connect(): Observable<liquidacion[]> {
    const displayDataChanges = [this._dataSource.dataChange, this._sort.sortChange, this._filterChange, this._paginator.page];
    this._dataSource.getAdvancedTable<any>(this._dominio, {'max': 100});
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this._dataSource.data.slice().filter((advanceTable: liquidacion) => {
          const searchStr = (
            advanceTable.contrato +
            advanceTable.nombre +
            advanceTable.folio +
            advanceTable.concepto
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

  sortData(data: liquidacion[]): liquidacion[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'contrato':
          [propertyA, propertyB] = [a.contrato, b.contrato]
          break
        case 'nombre':
          [propertyA, propertyB] = [a.nombre, b.nombre]
          break
        case 'concepto':
          [propertyA, propertyB] = [a.concepto, b.concepto]
          break
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
