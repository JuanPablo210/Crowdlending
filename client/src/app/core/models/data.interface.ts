// tslint:disable-next-line:class-name
export class _usuario {
  id: number;
  username: string;
  password: string;
  password5: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  mail: string;
  cargo: _puestos;
  avatar: string;
  razonSocial: _razonSocial;
  desde: Date;
  nuevo: boolean;
  enabled: boolean;
  accountExpired: boolean;
  accountLocked: boolean;
  passwordExpired: boolean;
  role: string;
}

// tslint:disable-next-line:class-name
export interface _roleDetalle {
  id: number;
  menu: string;
  habilitado: boolean;
  etiqueta: string;
  sistema: string;
  urlAjs: string;
}

// tslint:disable-next-line:class-name
export class _role {
  id: number;
  authority: string;
}

// tslint:disable-next-line:class-name
export class _combo {
  id: any;
  descripcion: any;
  cuenta?: any;
}

// tslint:disable-next-line:class-name
export class _puestos {
  id: number;
  puesto?: string;
  razonSocial?: _razonSocial;

}
// export class _solicitudPrestamo{
//   id: number;
//   cantidadDinero: string;
//   mesesAPagar: string;
//   motivoPrestamo: string;
//   detalleSolicitud: string;
// }

// tslint:disable-next-line:class-name
export class _razonSocial {
  id: number;
  estatus: boolean;
  nombre: string;
  rfc: string;

  calle?: string;
  noExterior?: string;
  noInterior?: string;
  colonia?: string;
  codigoPostal?: string;
  localidad?: string;
  municipio?: string;
  estado?: string;
  pais?: string;
  telefono?: string;
  email?: string;
}

// tslint:disable-next-line:class-name
export class _categorias {
  id: number;
  descripcion: string;
}

export class Actividades {
  id: number;
  categoria: _categorias;
  nombre: string;
  fechaInicio: Date;
  fechaFin: Date;
  estatus: string;
  descripcion: string;
}

export class Menu {
  id: number;
  icono: string;
  nombre: string;
  etiqueta: string;
  habilitado: Boolean;
}

export class UsuarioRole{
  usuario: string;
  role: string;
}

export class Submenu{
  id: number;
  menu: Menu;
  titulo: string;
  subtitulo: string;
  habilitado: Boolean;
  etiqueta: string;
  url: string;
  controller: string;
  controllerAs: string;
  template: string;
  sistema: string;
  urlAjs: string;
  esCatalogo: Boolean;
}
