package mx.saccsa.Crowdlending

import mx.saccsa.security.Usuario

class InformacionPerfil {
    //Informacion personal
    String upLine
    Boolean comisionar
    String nombre
    String apellidoPaterno
    String apellidoMaterno
    Date fechaNacimiento
    String curp
    String rfc
    String sexo

    //Informacion de contacto
    String calle
    String numeroExterno
    String numeroInterno
    String codigoPostal
    String localidad
    String ciudad
    String municipio
    String estado
    String telefono

    //Origen de recursos
    String giroActividad
    String fuenteIngresos
    //Boolean puestoPolitico

    //String plan
    PlanesInverco tipoPlan

    Usuario usuario
    Date fechaAlta = new Date()
    Date fechaVerificacion

    static constraints = {
        numeroInterno nullable: true, blank: true
        fechaAlta nullable: true, blank: true
        fechaVerificacion nullable: true, blank: true
    }

    static mapping = {
        table ("InformacionPerfil")
        version(false)
        id generator: 'identity'
    }

    static transients = ['descLabel']
    String getDescLabel() { nombre + ' ' + apellidoPaterno + ' ' +apellidoMaterno }

}
