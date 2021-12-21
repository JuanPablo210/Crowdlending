package mx.saccsa.Crowdlending

import mx.saccsa.security.Usuario

class VerificacionIdentidad {
    String ruta
    Usuario usuario
    String contentType
    String categoria
    String descripcion
    String nombre
    Boolean autorizado = false
    Date fechaAlta = new Date()

    static constraints = {
        ruta nullable: true, blank: true
        usuario nullable: true, blank: true
        autorizado nullable: false, blank: false
    }

    static mapping = {
        table "VerificacionIdentidad"
        version(true)
        id generator: 'identity'
        ruta name:"ruta", column: "ruta"
        usuario name:"usuario", column: "usuario"
        contentType name: 'contentType', column: 'contentType'
        categoria name: 'categoria', column: 'categoria'
        descripcion name: 'descripcion', column: 'descripcion'
        autorizado name: 'autorizado', column: 'autorizado'
        fechaAlta name: 'fechaAlta', column: 'fechaAlta'
        nombre name: 'nombre', column: 'nombre'
    }
}

