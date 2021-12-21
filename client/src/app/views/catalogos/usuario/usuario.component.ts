import { Component, OnInit } from '@angular/core';
import {UsuarioDeleteComponent} from './usuario-delete/usuario-delete.component';
import {UsuarioFormComponent} from './usuario-form/usuario-form.component';
import {_usuario} from '../../../core/models/data.interface';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AdvanceRestService} from '../../../core/service/advance-rest.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.sass']
})
export class UsuarioComponent implements OnInit {

  public _datos = { _title: 'Usuario', _modulo: 'Catálogos', _icono: 'fas fa-folder-open', _dominio: 'Usuario'};
  public rows: _usuario;
  public getRowsSub: Subscription;
  activeView = 'overview';
  id: number;
  constructor(private router: ActivatedRoute, private dialog: MatDialog,
              private snack: MatSnackBar,
              private advanceTableService: AdvanceRestService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.activeView = this.router.snapshot.params['view'];

    this.index();
  }
  index() {
    this.getRowsSub = this.advanceTableService.index<_usuario>(this._datos._dominio).subscribe(data => { this.rows = data; });
  }


  addNew() {
    let data: any;
    this.advanceTableService.create<_usuario>(this._datos._dominio).subscribe(result => {
      data = result;
      const dialogRef = this.dialog.open(UsuarioFormComponent, {
        data: { title: this._datos._title, disableClose: true, data: data, action: 'Agregar' }
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (!result) { return; }

        this.advanceTableService.save<string>(this._datos._dominio,result).subscribe(data => {
          this.showNotification( 'snackbar-success', this._datos._title + 'Agregada!!', 'bottom', 'center' );
        }, error => {
          if (error._embedded !== undefined) {
            this.showNotification( 'snackbar-danger', '¡¡Error al guardar!!', 'bottom', 'center' );
            Object.entries(error._embedded.errors).forEach(([key, value]) => { });
          }
        });
        this.index();
      });
    });
  }


  editCall(row) {
    this.id = row.id;
    let data: any;
    this.advanceTableService.edit<_usuario>(this._datos._dominio,this.id).subscribe(result => {
      data = result;
      const nombre = row.nombre + ' ' + row.apellidoPaterno + ' ' + row.apellidoMaterno;
      const dialogRef = this.dialog.open(UsuarioFormComponent, {
        data: { title: nombre.toUpperCase() , disableClose: true, data: data, action: 'Editar' }
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (!result) { return; }
        this.advanceTableService.update<string>(this._datos._dominio,this.id, result)
          .subscribe(data => {
            this.showNotification( 'snackbar-success', '¡¡ ' + this._datos._title + ' Editada!!', 'bottom', 'center' );
          }, error => {
            if (error._embedded !== undefined) {
              this.showNotification( 'snackbar-danger', 'Error al guardar', 'bottom', 'center' );
              Object.entries(error._embedded.errors).forEach(([key, value]) => {});
            }});
        this.index();
      });
    });
  }

  deleteItem(row) {
    this.id = row.id;
    const dialogRef = this.dialog.open(UsuarioDeleteComponent, { data: row });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.advanceTableService.delete<string>(this._datos._dominio,row.id)
            .subscribe(data => {
            this.showNotification( 'snackbar-danger', '¡¡ ' + this._datos._title + ' Eliminada!!', 'bottom', 'center' );
            this.index();
          }, error => {
            this.showNotification( 'snackbar-danger', '¡Error al eliminar! Este registro esta siendo utilizado', 'bottom', 'center' );
            Object.entries(error._embedded.errors).forEach(([key, value]) => { });
          });
      }
    });
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', { duration: 2000, verticalPosition: placementFrom, horizontalPosition: placementAlign, panelClass: colorName });
  }
}
