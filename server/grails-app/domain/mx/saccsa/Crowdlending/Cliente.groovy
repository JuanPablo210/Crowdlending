package mx.saccsa.Crowdlending

import mx.saccsa.security.Usuario


class Cliente {

//    Portafolios portafolio
    Boolean accesoDP=false
    Boolean accesoDR=false
    Boolean accesoMC=false
    Boolean accesoMD=true
    Boolean accesoSI=false
    Boolean asignacionAuto=true
    Boolean asignacionFlex=true
    String atencion
    Long comisionDeudor=0l
    Usuario usuario
//    Long contrato
//    Cliente contratoCustodio
    Long claveBmv=0l
    Boolean claveCustodia=false
    String claveLada
    Boolean posicionPropia=false
    Boolean cuentaDiscrecional=false
    String estadoCuenta
    Boolean proveedor=false
    Long extension
    Date fechaAlta=null
    String fax
    Date fechaBaja
    Date fechaImpresion
    String actividadEconomica
    String claveBanxico
    String grupo
    Boolean impredocta
    Long nacionalidad=0l
    Long plaza=0l
    String claveProveedor
//    Region region
//    sucursal sucursal
    String tipoFirma
    String tipoPortafolio //DV Disponible para la Venta, NE Negociacion, CV Conservado a Vencimiento, PA Pasivo
    Boolean liquidaMod=false
    BigDecimal montoLinea=0.0
    String identFiscal
    String numeroLinea
    String nombreCorto='N/A'
    String nombreLargo
    Boolean pagosParciales=false
    BigDecimal procentajeMaxLinea=0.0
//    Promotor promotor
    Boolean renovacionAuto=false
    Long claveReparto=0l
    String regFedCau
    Boolean cortoEfe=false
    Boolean cortoTit=false
    String sector
    String segmento
    Boolean empleado=false
    Boolean sliqSdo=false
    String telCasa
    String telOficina
//    TipoInversionistas tipoInversion
    String confirma
    String rfc
    String correo
    String estatus
    String nombre
    String apellidoPaterno
    String apellidoMaterno
    Date fechaNacimiento
    String sexo
    String curp
    String estadoNacimiento
    String nivelMaximoDeEstudio
    String estadoCivil
    String nombreEmpresa
    String puestoActual
    String antiguedad
    String ingresoMensuaLibre
    String otrosingresos
    String estasAfiliadoIMSS
    String seguroMedicoDeGastosMayores

    String cantidadDinero
    String mesesAPagar
    String motivoPrestamo
    String detalleSolicitud


    String alimentosSaludRopa
    String renta
    String tarjetaYdeudas
    String servicios
    String transportesYgasolina
    String educacion
    String recreacionPersonal
    String seguros
    String otrosGastos
    String total
    String auto



    static constraints = {

        accesoDP nullable:true
        accesoDR nullable:true
        accesoMC nullable:true
        accesoMD nullable:true
        accesoSI nullable:true
        asignacionAuto nullable:true
        asignacionFlex nullable:true
        atencion nullable:true,blank:true
        comisionDeudor nullable:true
        usuario nullable: false
//        contratoCustodio nullable:true
        claveBmv nullable:true
        claveCustodia nullable:true
        claveLada nullable:true,blank:true
        posicionPropia nullable:true
        cuentaDiscrecional nullable:true
        estadoCuenta nullable:true,blank:true
        proveedor nullable:true
        extension nullable:true
        fechaAlta nullable:true
        fax nullable:true,blank:true
        fechaBaja nullable:true
        fechaImpresion nullable:true
        actividadEconomica nullable:true,blank:true
        claveBanxico nullable:true,blank:true
        grupo nullable:true,blank:true
        impredocta nullable:true
        nacionalidad nullable:true
        plaza nullable:true
        claveProveedor nullable:true,blank:true
//        sucursal nullable:true
        tipoFirma nullable:true,blank:true
        tipoPortafolio nullable:true,blank:true
        liquidaMod nullable:true
        montoLinea nullable:true
        identFiscal nullable:true,blank:true
        numeroLinea nullable:true,blank:true
        nombreCorto nullable: false,blank:false
        nombreLargo nullable:true,blank:true
        pagosParciales nullable:true
        procentajeMaxLinea nullable:true
//        promotor nullable:true,blank:true,size:0..8
        renovacionAuto nullable:true
        claveReparto nullable:true
        regFedCau nullable:true,blank:true
        cortoEfe nullable:true
        cortoTit nullable:true
        sector nullable:true,blank:true
        segmento nullable:true,blank:true
        empleado nullable:true
        sliqSdo nullable:true
        telCasa nullable:true,blank:true
        telOficina nullable:true,blank:true
//        tipoInversion nullable:true,blank:true,size:0..6
        confirma nullable: true,blank: true
        rfc nullable:true
        correo nullable:true
        estatus nullable: true
        nombre  nullable: true, blank: true
        apellidoPaterno nullable:true, blank: true
        apellidoMaterno nullable: true, blank: true
        //
        nombreEmpresa nullable: true, blank: true
        puestoActual nullable: true, blank: true
        antiguedad nullable: true, blank: true
        ingresoMensuaLibre nullable: true, blank: true
        otrosingresos nullable: true, blank: true
        estasAfiliadoIMSS nullable: true, blank: true
        seguroMedicoDeGastosMayores nullable: true, blank: true
        fechaNacimiento  nullable: true, blank: true
        sexo nullable: true, blank: true
        curp nullable: true, blank: true
        estadoNacimiento nullable: true, blank: true
        nivelMaximoDeEstudio nullable: true, blank: true
        estadoCivil nullable: true, blank: true

        cantidadDinero nullable: true, blank: true
        mesesAPagar nullable: true, blank: true
        motivoPrestamo nullable: true, blank: true
        detalleSolicitud nullable: true, blank: true

        alimentosSaludRopa nullable: true, blank: true
        renta nullable: true, blank: true
        tarjetaYdeudas nullable: true, blank: true
        servicios nullable: true, blank: true
        transportesYgasolina nullable: true, blank: true
        educacion nullable: true, blank: true
        recreacionPersonal nullable: true, blank: true
        seguros nullable: true, blank: true
        otrosGastos nullable: true, blank: true
        total nullable: true, blank: true
        auto nullable: true, blank: true


    }
    //
    static mapping={
        table "CLIENTE"
//        id generator: "assigned", name:'contrato',column:'contrato'
        id generator: 'identity'
//        portafolio name:"portafolio", column: "portafolio"
        accesoDP name:'accesoDP', column:'accesoDP'
        accesoDR name:'accesoDR', column:'accesoDR'
        accesoMC name:'accesoMC', column:'accesoMC'
        accesoMD name:'accesoMD', column:'accesoMD'
        accesoSI name:'accesoSI', column:'accesoSI'
        asignacionAuto name:'asignacionAuto', column:'asignacionAuto'
        asignacionFlex name:'asignacionFlex', column:'asignacionFlex'
        atencion name:'atencion', column:'atencion'
        comisionDeudor name:'comisionDeudor', column:'comisionDeudor'
        usuario name:'usuario', column:'usuario'
//        contratoCustodio name:'contratoCustodio', column:'contratoCustodio'
        claveBmv name:'claveBmv', column:'claveBmv'
        claveCustodia name:'claveCustodia', column:'claveCustodia'
        claveLada name:'claveLada', column:'claveLada'
        posicionPropia name:'posicionPropia', column:'posicionPropia'
        cuentaDiscrecional name:'cuentaDiscrecional', column:'cuentaDiscrecional'
        estadoCuenta name:'estadoCuenta', column:'estadoCuenta'
        proveedor name:'proveedor', column:'proveedor'
        extension name:'extension', column:'extension'
        fechaAlta name:'fechaAlta', column:'fechaAlta'
        fax name:'fax', column:'fax'
        fechaBaja name:'fechaBaja', column:'fechaBaja'
        fechaImpresion name:'fechaImpresion', column:'fechaImpresion'
        actividadEconomica name:'actividadEconomica', column:'actividadEconomica'
        claveBanxico name:'claveBanxico', column:'claveBanxico'
        grupo name:'grupo', column:'grupo'
        impredocta name:'impredocta', column:'impredocta'
        nacionalidad name:'nacionalidad', column:'nacionalidad'
        plaza name:'plaza', column:'plaza'
        claveProveedor name:'claveProveedor', column:'claveProveedor'
//        region name:'region', column:'region'
//        sucursal name:'sucursal', column:'sucursal'
        tipoFirma name:'tipoFirma', column:'tipoFirma'
        tipoPortafolio name:'tipoPortafolio', column:'tipoPortafolio'
        liquidaMod name:'liquidaMod', column:'liquidaMod'
        montoLinea name:'montoLinea', column:'montoLinea'
        identFiscal name:'identFiscal', column:'identFiscal'
        numeroLinea name:'numeroLinea', column:'numeroLinea'
        nombreCorto name:'nombreCorto', column:'nombreCorto'
        nombreLargo name:'nombreLargo', column:'nombreLargo'
        pagosParciales name:'pagosParciales', column:'pagosParciales'
        procentajeMaxLinea name:'procentajeMaxLinea', column:'procentajeMaxLinea'
//        promotor name:'promotor', column:'promotor'
        renovacionAuto name:'renovacionAuto', column:'renovacionAuto'
        claveReparto name:'claveReparto', column:'claveReparto'
        regFedCau name:'regFedCau', column:'regFedCau'
        cortoEfe name:'cortoEfe', column:'cortoEfe'
        cortoTit name:'cortoTit', column:'cortoTit'
        sector name:'sector', column:'sector'
        segmento name:'segmento', column:'segmento'
        empleado name:'empleado', column:'empleado'
        sliqSdo name:'sliqSdo', column:'sliqSdo'
        telCasa name:'telCasa', column:'telCasa'
        telOficina name:'telOficina', column:'telOficina'
//        tipoInversion name:'tipoInversion', column:'tipoInversion'
        confirma name:'confirma', column:'confirma'
        rfc name:'rfc', column: 'rfc'
        correo name:'correo', column: 'correo'
        nombre name:"nombre", column: "nombre"
        apellidoPaterno name:"apellidoPaterno", column:"apellidoPaterno"
        apellidoMaterno name:"apellidoMaterno", column:"apellidoMaterno"
        fechaNacimiento name:"fechaNacimiento", column:"fechaNacimiento"
        sexo name:"sexo", column:"sexo"
        curp name:"curp", column:"curp"
        estadoNacimiento name:"estadoNacimiento", column:"estadoNacimiento"
        nivelMaximoDeEstudio name:"nivelMaximoDeEstudio", column:"nivelMaximoDeEstudio"
        estadoCivil name:"estadoCivil", column:"estadoCivil"
        //
        nombreEmpresa name:"nombreEmpresa", column:"nombreEmpresa"
        puestoActual name:"puestoActual", column:"puestoActual"
        antiguedad name:"antiguedad", column:"antiguedad"
        ingresoMensuaLibre name:"ingresoMensuaLibre", column:"ingresoMensuaLibre"
        otrosingresos name:"otrosingresos", column:"otrosingresos"
        estasAfiliadoIMSS name:"estasAfiliadoIMSS", column:"estasAfiliadoIMSS"
        seguroMedicoDeGastosMayores name:"seguroMedicoDeGastosMayores", column:"seguroMedicoDeGastosMayores"

        cantidadDinero name:"cantidadDinero", column:"cantidadDinero"
        mesesAPagar name:"mesesAPagar", column:"mesesAPagar"
        motivoPrestamo name:"motivoPrestamo", column:"motivoPrestamo"
        detalleSolicitud name:"detalleSolicitud", column:"detalleSolicitud"

        alimentosSaludRopa name:"alimentosSaludRopa", column:"alimentosSaludRopa"
        renta name:"renta", column:"renta"
        tarjetaYdeudas name:"tarjetaYdeudas", column:"tarjetaYdeudas"
        servicios name:"servicios", column:"servicios"
        transportesYgasolina name:"transportesYgasolina", column:"transportesYgasolina"
        educacion name:"educacion", column:"educacion"
        recreacionPersonal name:"recreacionPersonal", column:"recreacionPersonal"
        seguros name:"seguros", column:"seguros"
        otrosGastos name:"otrosGastos", column:"otrosGastos"
        total name:"total", column:"total"
        auto name:"auto", column:"auto"




    }

    /* Agregado en Portafolios*/
    String toString() {
//        contrato + " " + nombreCorto
        nombreCorto
    }

    static transients = ['descLabel']
//    String getDescLabel(){  contrato + " " + nombreCorto }
    String getDescLabel(){ nombreCorto }
}
