package mx.saccsa.Crowdlending

import mx.saccsa.security.Usuario

class PerfilCliente {
    Boolean legalidadRecursos
    Boolean propietarioRecursos
    String propietarioRecursosReal
    Boolean puestoPolitico
    String nombrePersonaPolitica
    Usuario usuario

    static constraints = {
        legalidadRecursos nullable: false, blank: false
        propietarioRecursos nullable: false, blank: false
        propietarioRecursosReal nullable: true, blank: true
        puestoPolitico nullable: false, blank: false
        nombrePersonaPolitica nullable: true, blank: true
        usuario nullable: false, blank: false
    }
    static mapping = {
        table ("PerfilCliente")
        version(false)
        id generator: 'identity'
    }

    static transients = ['descLabel']
    String getDescLabel() { propietarioRecursosReal }
}
