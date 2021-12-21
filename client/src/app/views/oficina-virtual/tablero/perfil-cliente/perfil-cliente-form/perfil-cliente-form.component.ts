import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {PerfilCliente} from "../../../../../shared/interfaces/Invested.interface";
import {AdvanceRestService} from "../../../../../core/service/advance-rest.service";

@Component({
  selector: 'app-perfil-cliente-form',
  templateUrl: './perfil-cliente-form.component.html',
  styleUrls: ['./perfil-cliente-form.component.scss']
})
export class PerfilClienteFormComponent implements OnInit {

  formularioPerfil: FormGroup;

  isLinear = false;
  dialogTitle: string;
  yes: string ='Sí'

  constructor(
    public dialogRef: MatDialogRef<PerfilClienteFormComponent>,
    public advanceTableService: AdvanceRestService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.dialogRef.disableClose = true;
  }

  Guardar(): void {
    let proyectado: { propietarioRecursos: any; puestoPolitico: any; propietarioRecursosReal: any; nombrePersonaPolitica: any; legalidadRecursos: any; id: any } = {
      ///debo solucionar estoooooo
      id: this.formularioPerfil.get('id').value,
      legalidadRecursos: this.formularioPerfil.get('legalidadRecursos').value,
      propietarioRecursos: this.formularioPerfil.get('propietarioRecursos').value,
      propietarioRecursosReal: this.formularioPerfil.get('propietarioRecursosReal').value,
      puestoPolitico: this.formularioPerfil.get('puestoPolitico').value,
      nombrePersonaPolitica: this.formularioPerfil.get('nombrePersonaPolitica').value,
    }
    this.dialogRef.close(proyectado);
  }


  ngOnInit(): void {


    this.formularioPerfil = this.advanceTableService.buildForm({
      id: [this.data.data.id ? this.data.data.id : ''],
      legalidadRecursos: [this.data.data.legalidadRecursos ? this.data.data.legalidadRecursos : true, ],
      propietarioRecursos: [this.data.data.propietarioRecursos ? this.data.data.propietarioRecursos : true, ],
      propietarioRecursosReal: [this.data.data.propietarioRecursosReal ? this.data.data.propietarioRecursosReal : '', ],
      puestoPolitico: [this.data.data.puestoPolitico ? this.data.data.puestoPolitico : false, ],
      nombrePersonaPolitica: [this.data.data.nombrePersonaPolitica ? this.data.data.nombrePersonaPolitica : '', ],

    });
  }

}
