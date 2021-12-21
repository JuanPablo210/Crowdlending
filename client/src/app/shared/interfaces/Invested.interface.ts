export class PerfilUsuario {
  experiencia: boolean;
  experienciaDescripcion: string;
  margenPerdida: string;
  ahorroMaximo: string;
  juaegoAguilauno: boolean;
  juegoAguilacien: boolean;
  perdidaCrisis: string;
  ahorroPorMes: string;
  frecuenciaInversion: boolean;
  recuperacionInversion: string;
  recomendador: string;
}

export class SimulacionInversion {
  objetivo: string;
  nombreInversion: string;
  tipoInversion: string;
  montoInicial: number;
  depositoMensual: number;
  duracion: number;
}

export class usuario {
  username: string;
  password: string;

  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  mail: string;
  puesto: string;
  avatar = "Avatar";
  desde: Date;
  nuevo = true;

  nombreEmpresa: string;
  tamanoEmpresa: string;
}

export class InformacionPerfil {
  id: number;
  upLine: string;
  nombre: string;
  comisionar: boolean;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: Date;
  curp: string;
  rfc: string;
  sexo: string;
  calle: string;
  numeroExterno: string;
  numeroInterno: string;
  codigoPostal: string;
  localidad: string;
  ciudad: string;
  municipio: string;
  estado: string;
  telefono: string;
  giroActividad: string;
  fuenteIngresos: string;
  tipoPlan: string;

}

export class InformacionComplementaria {
  id:string;
  beneficiarios: beneficiarios[];
  bancoCargo: string;
  cuentaCargo: string;
  claveInterbancariaCargo: string;
  bancoAbono: string;
  cuentaAbono: string;
  claveInterbancariaAbono: string;
  disclaimer: boolean;
}

export class beneficiarios {
  nombre: string;
  apellidos: string;
  parentesco: string;
  porcentaje: number;
  telefono: string;
}

export class PerfilCliente {

  legalidadRecursos: boolean;
  propietarioRecursos: boolean;
  propietarioRecursosReal: string;
  puestoPolitico: boolean;
  nombrePersonaPolitica: string;
}

export class PreRegistro {

  //nombre: string;
  //apellidoPaterno: string;
  //apellidoMaterno: string;
  username: string;
  mail: string;
  password: string;
  cpassword: string;
}

export class VerificacionIdentidad {
  id: number;
  comprobante: boolean;
  tipoComprobante: string;
  idFrontal: boolean;
  tipoIdentificacion: string;
  tipoInfoBancaria: string;
  tipoInfoFiscal: string;
  autorizado: boolean;
  idTrasera: boolean;
}
export interface PrestarEfectivo{
  id: number;
  fondosMes: string;
  montoDeposito: string;
  origenRecursos: string;
  destinoInversion: string;
  detalleprestar: string;
}

export interface Calendar_{
  id: number;
  titulo: string;
  categoria: string;
  fechaInicio: Date;
  fechaFin: Date;
  detalle: string;

}

export interface SolicitudPrestamo{
  id: number;
  cantidadDinero: string;
  mesesAPagar: string;
  motivoPrestamo: string;
  detalleSolicitud: string;
}

export class _combo {
  id: any;
  descripcion: any;
  cuenta?: any;
}
export class _subconcepto {
  id: any;
  descripcion: any;
  tipoMovimiento: any;
  concepto: string;
}

export class _comboCp {
  id: any;
  descripcion: any;
  estado: any;
  municipio: any;
  ciudad: any;
  asentamiento: any;
}

export class _comboPlanes {
  id: any;
  descripcion: any;
  plazo: any;
  aportacion: any;
  tasa: any;
}

export class GiroActividad {
  id: number;
  claveGiroEmp: string;
  descripcionCorta: string;
  descripcion: string;
}

export class Estados {
  id: number;
  claveEstado: number;
  numeroPais: number;
  descripcionCorta: string;
  descripcion: string;
}

export class Municipios {
  id: number;
  numeroMunicipio: number;
  numeroEstado: number;
  numeroPais: number;
  descripcionCortaMunicipio: string;
  descripcionMunicipio: string;
}

export class Ciudades {
  id: number;
  numeroCiudad: number;
  numeroEstado: number;
  numeroPais: number;
  descripcion: string;
}

export class Cp {
  id: number;
  codigoPostal: number;
  asentamiento: string;
  ciudad: string;
  municipio: string;
  estado: string;
}

export class PlanesInverco {
  planElegido: string;
  plazo: string;
  aportacionMensual: string;
  tasaInteres: string;
}

export class _bancos {
  id: number;
  descripcionCorta: string;
  descripcionLarga: string;
  direccion_clc: string;
  direccion_con: string;
  direccion_dis: string;
  pais: string;
}

export class _importaciones {
  id: number;
  cuenta: string;
  fecha: Date;
  montoAbono: number;
  montoCargo: number;
  tipoMovimiento: string;
  referencia: string;
}


// Modelos de Mesa
export interface Cliente {
  id: number;
  accesoDP: boolean;
  accesoDR: boolean;
  accesoMC: boolean;
  accesoMD: boolean;
  accesoSI: boolean;
  asignacionAuto: boolean;
  asignacionFlex: boolean;
  atencion: string;
  comisionDeudor: number;
  contrato: number;
  contratoCustodio: Cliente;
  claveBmv: number;
  claveCustodia: boolean;
  claveLada: string;
  posicionPropia: boolean;
  cuentaDiscrecional: boolean;
  estadoCuenta: string;
  proveedor: boolean;
  extension: number;
  fechaAlta: Date;
  fax: string;
  fechaBaja: Date;
  fechaImpresion: Date;
  actividadEconomica: string;
  claveBanxico: string;
  grupo: string;
  impredocta: boolean;
  nacionalidad: number;
  plaza: number;
  claveProveedor: string;
  // region: Region;
  // sucursal: Sucursal;
  tipoFirma: string;
  tipoPortafolio: string;
  liquidaMod: boolean;
  montoLinea: number;
  identFiscal: string;
  numeroLinea: string;
  nombreCorto: string;
  nombreLargo: string;
  pagosParciales: boolean;
  procentajeMaxLinea: number;
  // promotor: Promotor;
  renovacionAuto: boolean;
  claveReparto: number;
  regFedCau: string;
  cortoEfe: boolean;
  cortoTit: boolean;
  sector: string;
  segmento: string;
  empleado: boolean;
  sliqSdo: boolean;
  telCasa: string;
  telOficina: string;
  // tipoInversion: TipoInversionistas;
  confirma: string;
  rfc: string;
  correo: string;
  estatus: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: Date;
  sexo: string;
  curp: string;
  estadoNacimiento: string;
  nivelMaximoDeEstudio: string;
  estadoCivil: string;
  nombreEmpresa: string;
  puestoActual: string;
  antiguedad: string;
  ingresoMensuaLibre: string;
  otrosingresos: string;
  estasAfiliadoIMSS: string;
  seguroMedicoDeGastosMayores: string;

  cantidadDinero: string;
  mesesAPagar: string;
  motivoPrestamo: string;
  detalleSolicitud: string;

  alimentosSaludRopa: string;
  renta: string;
  tarjetaYdeudas: string;
  servicios: string;
  transportesYgasolina: string;
  educacion: string;
  recreacionPersonal: string;
  seguros: string;
  otrosGastos: string;






}

export interface Mercados {
  cveMercado: string;
  descripcion: string;
  fecha: Date;
}

export interface PerfilCliente {
  descripcion: string;
  estatus: boolean;
  califMin: number;
  califMax: number;
}

export interface TipoCliente {

  descripcion: string;
  carta: boolean;
  tratamiento: string;
  cveTipoServicio: TipoServicio;
}

export interface Portafolios {

  cvePortafolio: number;
  descripcion: string;
  fecha: Date;
  mercados: Mercados;
  contratoVenta: Cliente;
}

export interface Promotor {
  id: number;
  cvePromotor: string;
  ciudad: string;
  colonia: string;
  direccion: string;
  nombre: string;
}

export interface TipoInversionistas {
  id: number;
  cveTipoInversionista: string;
  descripcion: string;
  institucional: boolean;
  pJuridica: boolean;
  sector: string;
  cambioTasa: string;
  prioridad: number;
}

export interface TipoServicio {
  descripcion: string;
  asesorado: boolean;
}

export interface Region {
  clave: string;
  descripcion: string;
  variacion: number;
}

export interface Sucursal {
  id: number
  descripcion: string;
  region: Region;
  ciudad: string;
  direccion: string;
  colonia: string;
  codigoPostal: string;
  telefono: string;
}

export interface TipoCliente {
  descripcion: string;
  carta: boolean;
  tratamiento: string;
  cveTipoServicio: TipoServicio;
}

//Modelos del SFF
export interface Agencia {
  id: number;
  nombre: string;
  sucursal: Sucursal;
  region: Region;
  portafolio: Portafolios;
  clave: string;
}

export interface Area {
  id: number;
  nombre: string;
}

export interface AreaRequirente {
  id: number;
  nombre: string;
  tipoCliente: string;
}

export interface Banco {
  id: number;
  descripcionCorta: string;
  descripcionLarga: string;
  direccion_clc: string;
  direccion_con: string;
  direccion_dis: string;
  pais: string;
  cveBancaria: string;
}

export interface Categorias {
  id: number;
  categoria: string;
}

export interface ChequeraCliente {
  id: number;
  titular: string;

  //Banco banco
  contrato: Cliente;
  divisa: Divisa;
  clabe: string;
  esDefault: boolean;
  tipoCuenta: string;

  //spei
  bancoDestino: Banco;
  referencia: string;
  cuenta: string;
  referenciado: boolean;

  //cie
  convenio: string;
  concepto: string;

  //opi
  asuntoBeneficiario: string;
  abaBic: string;
  bancoBeneficiario: string;
  paisBeneficiario: string;
  direccionBancoBeneficiario: string;
  paisBancoBeneficiario: string;
  direccionBeneficiario: string;
  telefonoBeneficiario: string;

  estatus: string;
  estatusH2H: string;
}

export interface ChequerasCasa {
  id: number;
  cvePortafolio: Portafolios;
  alias: string;
  bancoCasa: Banco;
  chequeraCasa: string;
  clabe: string;
  area: Area;
  plazaBancaria: PlazaBancaria;
  divisa: Divisa;
  tipoLinea: string;
  tipoCuenta: string;
  usoCuenta: string;
  minimo: number;
  orden: number;
  maximo: number;
  region: Region;
  financiera: Financiera;
  tipoTasa: string;
  instrumento: Instrumentos;
  tasa: number;
  spread: number;
  spreadComp: number;
  diaInhabil: string;
  iva: number;
  plazo: number;
  fechaVencimiento: Date;
  formato: string;
  cheque: string;
  interPlaza: boolean;
  regla: string;
  numeroChequeElec: number;
  numeroCheque: number;
  concentradora: string;
  empresaPrestamo: Cliente;
  titular: string;
  codigoVial: string;
}

export interface Colateral {
  id: number;
  nombre: string;
  descripcion: string;
  interes: boolean;
}

export interface ConceptoPago {
  id: number;
  clave: string;
  subclave: string;
  concepto: string;
}

export interface CuentaContable {
  id: number;
  regla: string;
  nombreCuenta: string;
  comentario: string;
  divisa: Divisa;
  cambioTasa: boolean;
  cuentaConta: string;
  tipoInstrumento: TipoInstrumentos;
  instrumento: Instrumentos;
  emisoras: Emisoras;
  contrato: Cliente;
  portafolios: Portafolios;
  plazoMax: number;
  sector: string;
  tipoOperacion: string;
  centroCosto: string;
  centroBeneficio: string;
  crOrigen: string;
  docType: string;
  textHeader: string;
  cveCont: string;
  tipoMovimiento: string;
  banco: Banco;
  chequerasCasa: ChequerasCasa;
  subconcepto: Subconcepto;
  sucursal: Agencia;
  colateral: Colateral;
}

export interface Divisa {
  id: number;
  clave: string;
  dateCreated: Date;
  iconta: string;
  descripcion: string;
  frecuencia: string;
  escenario: string;
}

export interface Emisoras {
  cveInstrumento: Instrumentos;
  cveInstDeposito: InstDepositos;
  tipoVal: string;
  cveEmisora: string;
  cveSerie: string;
  fecEmisora: Date;
  plazo: number;
  monValNom: number;
  indiceIni: number;
  calificacion: string;
  pzoCup: number;
  numCupones: number;
  diaSem: number;
  diaMes: number;
  inHabil: string;
  tasaFija: number;
  cpzoRev: number;
  pCapitaliz: number;
  numAmort: number;
  primAmort: number;
  metodoAmor: string;
  fecVence: Date;
  fecAlta: Date;
  usernameAlta: Usuario;
  subSubCuenta: number;
  subCuenta: string;
  emisIdentificador: string;
  fechaApart: Date;
  diaRevision: string;
  cveBanxico: string;
  mposRiesgo: number;
  ntitRiesgo: number;
  cuponIrregular: boolean;
  cveDivisa: Divisa;
  opervtacto: number;
  operctoadm: number;
  operaArbitraje: number;
  normalIntermediario: number;
  nCupVig: number;
  liquidacion: number;
  preculthechodiaant: number;
  cveMercado: Mercados;
  isinIndeval: string;
  precioActual: number;
  bursatilidad: string;
  capitalSocial: number;
  impPromDiaria: number;
  operador1: string;
  operador2: string;
  vectorCalif: string;
  emisoraCalif: number;
  emisBmv: string;
  nombre: string;
  tipoSubyacente: string;
  subyacente: string;
  sobretasa: number;
}

export interface FechaInhabil {
  id: number;
  fecha: Date;
  descripcion: string;
  divisa: Divisa;
}

export interface Financiera {
  id: number;
  nombre: string;
  cliente: Cliente;
}

export interface FormaLiquidacion {
  id: number;
  estatusAplicacion: string;
  bancoCasa: Banco;
  chequeraCasa: ChequerasCasa;
  divisa: Divisa;
  formaLiquidacion: string;
  tipoAplicacion: string;
  tipoImpresion: string;
  tipoMovimiento: string;
  montoMax: number;
  montoMin: number;
  descripcion: string;
  preguntaImpresion: string;
  pBanco: boolean;
  pBuscaConcentradora: boolean;
  pChequera: boolean;
  pDireccion: boolean;
  multibanco: boolean;
  numeroCheque: boolean;
  formaEnvio: string;
  codigoTransaccion: string;
}

export interface FormaLiquidacionCliente {
  id: number;
  contrato: Cliente;
  divisa: Divisa;
  titular: Titulares;
  banco: Banco;
  ctacheque: string;
  cvePortafolio: Portafolios;
  formaCobro: FormaLiquidacion;
  formaPago: FormaLiquidacion;
  formaDefault: boolean;
}

export interface FormatoUniversal {
  id: number;
  autorizo: string;
  de: string;
  estatus: string;
  fechaAplicacion: Date;
  fechaCreacion: Date;
  fechaAutorizacion: Date;
  folio: number;
  folioCuentas: number;
  folioGCIA: number;
  fechaOperacion: Date;
  recibio: Date;
  gastoPro: boolean;
  areaRequirente: AreaRequirente;
  importe: number;
  iva: number;
  noimp: number;
  para: string;
  preparo: string;
  retencion: number;
  total: number;
  tipoCaptura: string;
  cliente: Cliente;
  observacion: string;
  username: string;
  usernameAutoriza: string;
  usernameFirma: string;
  usernameDispersa: string;
  tipoValidacion: string;
  portafolio: Portafolios;
  tipoTasa: string;
  tasaFija: number;
  instrumentos: Instrumentos;
  spread: number;
  bullet: number;
}

export interface FormatoUniversal_DET {
  id: number;
  afavor: string;
  beneficiario: string;
  centresp: string;
  cuentacargo: ChequerasCasa;
  cuentacontreg: string;
  cuentaEnlace: string;
  cuentaValores: string;
  divisa: Divisa;
  digver: string;
  dispersado: number;
  estatus: string;
  factura: string;
  fechaCreacion: Date;
  fechaAutorizacion: Date;
  folio: number;
  fechaOperacion: Date;
  fechaRecibido: Date;
  areaRequirente: AreaRequirente;
  impapl: number;
  importe: number;
  imprech: number;
  iva: number;
  numeroCheque: string;
  noimp: number;
  numReg: number;
  observacion: string;
  observacionResultado: string;
  ocn: string;
  partPresu: string;
  partPresub: string;
  regapl: number;
  regrech: number;
  retencion: number;
  ruta: string;
  tipdis: number;
  tipoOperacion: string;
  total: number;
  federalEstatal: string;
  sat: string;
  fechaLiquidacion: Date;
  subconcepto: Subconcepto;
  bancoCasa: Banco;
  clabe: string;
  referencia: string;
  cie: string;
  referenciaCie: string;
  conceptoCie: string;
  numCliente: string;
  tipoCaptura: string;
  tipoFecha: string;
  bancoDestino: string;
  cuentaDestino: string;
  tipoCuentaDestino: string;
  ababic: string;
  paisBeneficiario: string;
  paisBancoBeneficiario: string;
  cuentaBeneficiario: string;
  direccionBanco: string;
  titular: string;
  direccionBeneficiario: string;
  telefonoBeneficiario: string;
  trafico: string;
  plazaBancaria: PlazaBancaria;
  urgente: boolean;
  cliente: Cliente;
  acuentaDe: Cliente;
  empresa: Cliente;
  conceptoPago: ConceptoPago;
  username: string;
  usernameAutoriza: string;
  usernameFirma: string;
  usernameDispersa: string;
  pedimento: string;
  cheque: boolean;
  tipoValidacion: string;
  portafolio: Portafolios;
  fechaFinal: Date;
  amortizacion: number;
  tasa: number;
  sobretasa: number;
  interesBruto: number;
}

export interface GastoFinanciero {
  id: number;
  subconcepto: Subconcepto;
  chequerasCasa: ChequerasCasa;
  prorrateo: number;
  agencia: Agencia;
  fechaAplicacion: Date;
}

export interface InstDepositos {
  id: number;
  cveInstDeposito: string;
  descripcion: string;
  contrato: Cliente;
  fecAlta: Date;
  usernameAlta: Usuario;
}

export interface Instrumentos {
  id: number;
  cveInstrumento: string;
  cveTipoInstrumento: TipoInstrumentos;
  cveEmisDefault: string;
  valorNominal: number;
  cveDivValnom: Divisa;
  cveDivInstr: Divisa;
  cveDivAjus: Divisa;
  manejaCupon: boolean;
  diasxCupon: number;
  baseValuacion: string;
  instrValua: string;
  fondea: boolean;
  pagaInt: boolean;
  calcInteres: string;
  tipoTasa: string;
  pzoRev: number;
  capitalizaInt: boolean;
  comisMax: number;
  puja: number;
  paramPiso: number;
  diasxAno: number;
  cveInstDeposito: InstDepositos;
  usernamealta: Usuario;
  fecAlta: Date;
  emisBmv: string;
  diasCorr: string;
  cveMercado: Mercados;
  tipoOperacion: number;
  descripcion: string;
  tipoCotizacion: string;
  tipoLiquidacion: string;
  finesOperacion: string;
}

export interface LimiteCaptura {
  id: number;
  captura: string;
  limite: number;
}

export interface LimiteContrato {
  id: number;
  cliente: Cliente;
  limite: number;
  divisa: Divisa;
}

export interface LimiteUsuario {
  id: number;
  usuario: Usuario;
  limite: number;
}

export interface PlazaBancaria {
  id: number;
  nombrePlaza: string;
}

export interface PlazaBancariaDetalle {
  id: number;
  plazaBancaria: PlazaBancaria;
  usuario: Usuario;
  cliente: Cliente;
  tipo: string;
}

export interface Poliza {
  id: number;
  nombre: string;
  regla: string;
  tipoPoliza: string;
  poliza: number;
}

export interface Secuencia {
  id: number;
  monto: number;
  comentario: string;
  nombreCuenta: string;
  poliza: Poliza;
  regla: string;
  secuencia: number;
  esLiquidadora: boolean;
  movConta: string;
}

export interface Subconcepto {
  id: number;
  cvePortafolio: Portafolios;
  banco: Banco;
  cuentaPropia: number;
  descripcion: string;
  aplica: string;
  concepto: string;
  contrato: string;
  chequeraCasa: ChequerasCasa;
  divisa: Divisa;
  formaLiquidacion: FormaLiquidacion;
  subconcepto: string;
  categorias: Categorias;
}

export interface TasaPrimaria {
  cveInstrBase: Instrumentos;
  fecCotiz: Date;
  cvePlazoRef: number;
  tasa: number;
  fecAlta: Date;
  usernameAlta: Usuario;
}

export interface TipoInstrumentos {
  cveTipoInstrumento: string;
  descripcion: string;
  fecAlta: Date;
  usernameAlta: Usuario;
  cveInstDeposito: InstDepositos;
  camxAsig1: string;
  camxAsig2: string;
  camxAsig3: string;
  camxAsig4: string;
  camxAsig5: string;
  cveDivisa: Divisa;
  tipoBur: string;
  cuentaAct: number;
  cuentaPas: number;
  cveMercado: Mercados;
}

export interface Titulares {
  id: number;
  contrato: number;
  consecutivo: number;
  tipocotit: string;
  nombre: string;
  paterno: string;
  materno: string;
  itipo_firma: string;
  arch_firma: string;
  rfc: string;
  nidenfis: string;
}

// Modelos de Security
export interface AuthenticationToken {
  id: number;
  username: string;
  token: string;
  refreshed: Date;
  sessionId: string;
  system: string;
}

export interface Menu {
  id: number;
  icono: string;
  nombre: string;
  etiqueta: string;
  habilitado: boolean;
  sistema: string;
}

export interface Role {
  id: number;
  authority: string;
  sistema: string;
}

export interface RoleDetalle {
  role: Role;
  submenu: Submenu;
  crear: boolean;
  borrar: boolean;
  editar: boolean;
}

export interface Submenu {
  id: number;
  menu: Menu;
  titulo: string;
  subtitulo: string;
  habilitado: boolean;
  etiqueta: string;
  url: string;
  controller: string;
  controllerAs: string;
  template: string;
  sistema: string;
  urlAjs: string;
  esCatalogo: boolean;
}

export interface Usuario {
  id: number;
  username: string;
  password: string;
  nombre: string;
  apellidopaterno: string;
  apellidomaterno: string;
  mail: string;
  puesto: string;
  avatar: string;
  desde: Date;
  nuevo: boolean;
  enabled: boolean;
  accountExpired: boolean;
  accountLocked: boolean;
  passwordExpired: boolean;
  autorizador: boolean;
}

export interface UsuarioRole {
  usuario: Usuario;
  role: Role;
}

export interface UsuarioHistorico {
  id: number;
  usuario: Usuario;
  password: string;
  ultimaActualizacion: Date;
}

export class verificacion {
  informacionPerfilValidator: boolean;
  informacionPrestamo: boolean;
  informacionPrestar: boolean;
  verificacionIdentidadValidator: boolean;

}

export class plan {
  monto: number;
  plazo: string;
  plan: string;
}

export class imagenes {
  id: any
  usuario: any;
  categoria: any;
  descripcion: any;
  fechaAlta: any;
  contentType: any;
  nombre: string;
  imagen: any;
}

export class ExpedienteInv {
  reporte: string;
  formato: string;
  titulo: string;
  multiplan: boolean;
  planesInverco: _comboPlanes;
}

export class DepositosProvicional {
  id: number;
  afiliado: string;
  usuario: string;
  monto: number;
  fecha: Date;
  divisa: string;
}

export class dashboard {
  balanceActual: number;
  depositos: number;
  invercoins: number;
}

export class chartInfo{
  data: any[];
  label: any[];
}

export class chart {
  xaxis: { labels: { show: boolean } };
  series: { data: number[]; labels: string[]; name: string }[];
  legend: { show: boolean };
  grid: { show: boolean };
  tooltip: { marker: { show: boolean }; x: { show: boolean }; fixed: { enabled: boolean } };
  chart: { type: string; sparkline: { enabled: boolean }; height: number };
  stroke: { curve: string };
  yaxis: { show: boolean };
  colors: string[]
}

export class Bitacora {
  seccion: string;
  parametro: string;
  mensaje: string;
  afiliado: string;
  role: string;
  estatus: string;
  fecha: Date;
}

export class BandejaEntrada{
  usuario: string;
  seccion: string;
  parametro: string;
  mensaje: string;
  afiliado: string;
  role: string;
  estatus: string;
  fecha: Date;

}

export class TasaPrimaria {
  cveInstrBase: Instrumentos;
  fecCotiz: Date;
  cvePlazoRef: number;
  tasa: number;
  fecAlta: Date;
  usernameAlta: Usuario;
}

export class formaLiquidacionCombo {
  formaLiq: any;
  formaLiqCliente: any;
  descripcion: any;
}

export class liquidacion{
  folio: number;
  contrato: string;
  formaLiquidacion: string;
  concepto: string;
  nombre: string;
}
