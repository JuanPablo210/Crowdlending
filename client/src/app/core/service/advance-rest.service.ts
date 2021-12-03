import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {GlobalService} from './global.service';
import {FormBuilder} from '@angular/forms';

@Injectable({providedIn: 'root'})
export class AdvanceRestService {
  private _controller: string;
  dialogData: any;

  dataChange: BehaviorSubject<any[]> = new BehaviorSubject< any[] >([]);

  constructor(private http: HttpClient, private globalService: GlobalService, private _formBuilder: FormBuilder) {}

  get data(): any[] { return this.dataChange.value; }
  getDialogData() { return this.dialogData; }

  initService(_controller) { this._controller = _controller;  }

  /** CRUD METHODS */
  getAdvancedTable<T>(_controller: string, _params?: { [key: string]: any; }, _action?: string): void {
    const opts = this.globalService.getHttpOptions();
    let action = '';
    if (_params !== undefined) { opts['params'] = _params; }
    if (_action !== undefined && _action !== '') { action = _action; }
    this.http.get<T[]>(this.globalService.BASE_API_URL + _controller + '/' + action, opts).subscribe(
      (data) => { this.dataChange.next(data); },(error: HttpErrorResponse) => { console.log(error.name + ' ' + error.message); }
    );
  }

  index<T>(_dominio: string, _params?: {}, _action?: string) {
    const opts = this.globalService.getHttpOptions();
    let action: string = '';
    if (_params !== undefined) { opts['params'] = _params; }
    // @ts-ignore
    if (_action !== undefined && _action !== '') { action = _action; }
    return this.http.get<T>(this.globalService.BASE_API_URL + this._controller + '/' + action, opts);
  }

  buildForm(formItems: { [key: string]: any; }) { return this._formBuilder.group(formItems); }

  create<T>(_params?: string, _action?: string) {
    const opts = this.globalService.getHttpOptions();
    let action = 'create';
    if (_params !== undefined) { opts['params'] = _params; }
    if (_action !== undefined && _action !== '') { action = _action; }
    return this.http.get<T>(this.globalService.BASE_API_URL + this._controller + '/' + action, opts);
  }

  edit<T>(_id, _params?: number, _action?: string) {
    const opts = this.globalService.getHttpOptions();
    let action = 'edit';
    if (_params !== undefined) { opts['params'] = _params; }
    if (_action !== undefined && _action !== '') { action = _action; }
    return this.http.get<T>(this.globalService.BASE_API_URL + this._controller + '/' + action + '/' + _id, opts);
  }

  combo<T>(_params?: {[key: string]: any}, _action?: string, _controller?: string) {
    const opts = this.globalService.getHttpOptions();
    let action = 'index';
    let controller = 'combo';
    if (_params !== undefined) { opts['params'] = _params; }
    if (_action !== undefined && _action !== '') { action = _action; }
    if (_controller !== undefined && _controller !== '') { controller = _controller; }
    return this.http.get<T>(this.globalService.BASE_API_URL + controller + '/' + action, opts);
  }

  save<T>(_data: string, _params?: { [p: string]: any }, _action?: string) {
    const opts = this.globalService.getHttpOptions();
    const data = _data;
    let action = 'save';
    if (_params !== undefined) { opts['params'] = _params; }
    if (_action !== undefined && _action !== '') { action = _action; }
    return this.http.post<T>(this.globalService.BASE_API_URL + this._controller + '/' + action, data, opts);
  }

  update<T>(_id, _data: { [key: string]: any; }, _params?: { [key: string]: any; }, _action?: string) {
    const opts = this.globalService.getHttpOptions();
    const data = _data;
    let action = 'update';
    if (_params !== undefined) { opts['params'] = _params; }
    if (_action !== undefined && _action !== '') { action = _action; }
    return this.http.put<T>(this.globalService.BASE_API_URL + this._controller + '/' + action + '/' + _id, data, opts);
  }

  delete<T>(_id, _params?: number, _action?: string) {
    const opts = this.globalService.getHttpOptions();
    let action = 'delete';
    if (_params !== undefined) { opts['params'] = _params; }
    if (_action !== undefined && _action !== '') { action = _action; }
    return this.http.delete<T>(this.globalService.BASE_API_URL + this._controller + '/' + action + '/' + _id, opts);
  }

  getReport(_action?: string, _controller?: string, _params?: {[key: string]: any}) {
    const opts = this.globalService.getHttpOptionsReport();
    if (_params !== undefined) { opts['params'] = _params; }
    return this.http.get(this.globalService.BASE_API_URL + _controller + '/' + _action, opts);
  }

  printReport(observable: any, _name: string) {
    observable.subscribe((response: any) => {
      const dataType = response.type;
      const binaryData = [];
      binaryData.push(response);
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
      downloadLink.setAttribute('download', _name);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    });
  }
}
