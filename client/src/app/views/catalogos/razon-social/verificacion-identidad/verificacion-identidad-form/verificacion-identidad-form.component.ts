import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {MatSnackBar} from "@angular/material/snack-bar";
import {WebcamImage, WebcamInitError, WebcamUtil} from "ngx-webcam";
import {Observable, Subject} from "rxjs";
import {AdvanceRestService} from "../../../../../core/service/advance-rest.service";


@Component({
  selector: 'app-verificacion-identidad-form',
  templateUrl: './verificacion-identidad-form.component.html',
  styleUrls: ['./verificacion-identidad-form.component.scss']
})
export class VerificacionIdentidadFormComponent implements OnInit {
  action: string;
  formulario: FormGroup;
  dialogTitle: string;
  isLinear = true;

  domicilioForm: FormGroup;
  identificacionForm: FormGroup;
  bancarioForm: FormGroup;
  fiscalForm: FormGroup;
  fotografiaForm: FormGroup;

  //Variables utilizadas para la implementacion de la camara
  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
  };
  public errors: WebcamInitError[] = [];
  public webcamImage: WebcamImage = null;
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  constructor(  public dialogRef: MatDialogRef<VerificacionIdentidadFormComponent>, private formBuilder: FormBuilder,
                @Inject(MAT_DIALOG_DATA) public data: any, public advanceTableService: AdvanceRestService, private snackBar: MatSnackBar ) {
    this.dialogRef.disableClose = true;
  }

  submit() {}

  onNoClick(): void { this.dialogRef.close(); }

  public confirmAdd(): void {
    console.log(this.formulario.value)
    this.dialogRef.close(this.formulario.value);
  }

  ngOnInit(): void {
      this.dialogTitle = this.data.title;
      this.formulario = this.advanceTableService.buildForm({
        id: [this.data.data.id],
        file1: [null],
        file2: [null],
        file3: [null],
        file5: [null],
        tipoComprobante: [this.data.data.tipoComprobante ? this.data.data.tipoComprobante : ''],
        tipoIdentificacion: [this.data.data.tipoIdentificacion ? this.data.data.tipoIdentificacion : ''],
        tipoInfoBancaria: [this.data.data.tipoInfoBancaria ? this.data.data.tipoInfoBancaria : ''],
        tipoInfoFiscal: [this.data.data.tipoInfoFiscal ? this.data.data.tipoInfoFiscal : ''],
        imagen: [null]
      });

    this.domicilioForm = this.formBuilder.group({
      file1: [null],
      tipoComprobante: [this.data.data.tipoComprobante ? this.data.data.tipoComprobante : ''],
    })
    this.identificacionForm = this.formBuilder.group({
      file2: [null, Validators.required],
      tipoIdentificacion: [this.data.data.tipoIdentificacion ? this.data.data.tipoIdentificacion : '', Validators.required],
    })
    this.bancarioForm = this.formBuilder.group({
      file3: [null],
      tipoInfoBancaria: [this.data.data.tipoInfoBancaria ? this.data.data.tipoInfoBancaria : ''],
    })
    this.fiscalForm = this.formBuilder.group({
      file5: [null],
      tipoInfoFiscal: [this.data.data.tipoInfoFiscal ? this.data.data.tipoInfoFiscal : ''],
    })
    this.fotografiaForm = this.formBuilder.group({
      imagen: [null]
    })
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  onFileChange1(event) {
    const reader = new FileReader();
    const [file1] = event.target.files;
    this.formulario.patchValue({file1: file1, tipoComprobante: this.domicilioForm.get('tipoComprobante').value});
    this.domicilioForm.patchValue({file1: file1});
  }
  onFileChange2(event) {
    const reader = new FileReader();
    const [file2] = event.target.files;
    this.formulario.patchValue({file2: file2, tipoIdentificacion: this.identificacionForm.get('tipoIdentificacion').value});
    this.identificacionForm.patchValue({file2: file2});
  }
  onFileChange3(event) {
    const reader = new FileReader();
    const [file3] = event.target.files;
    this.formulario.patchValue({file3: file3, tipoInfoBancaria: this.bancarioForm.get('tipoInfoBancaria').value});
    this.bancarioForm.patchValue({file3: file3});
  }

  onFileChange5(event) {
    const reader = new FileReader();
    const [file5] = event.target.files;
    this.formulario.patchValue({file5: file5, tipoInfoFiscal: this.fiscalForm.get('tipoInfoFiscal').value});
    this.fiscalForm.patchValue({file5: file5});
  }

  public triggerSnapshot(): void {
    this.trigger.next();
    this.formulario.patchValue({imagen: this.webcamImage.imageAsBase64})
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

}
