package mx.saccsa.Crowdlending

class PrestarEfectivo {

    String fondosMes
    String montoDeposito
    String origenRecursos
    String destinoInversion
    String detalleprestar

    static constraints = {
        fondosMes nullable: false, blank: false
        montoDeposito nullable: false, blank: false
        origenRecursos nullable: false, blank: false
        destinoInversion nullable: false, blank: false
        detalleprestar nullable: false, blank: false
    }
    static mapping = {
        table "PrestarEfectivo"
        version true
        id generator: "identity"
        fondosMes column: "fondosMes",name: "fondosMes"
        montoDeposito column: "montoDeposito",name: "montoDeposito"
        origenRecursos column: "origenRecursos",name: "origenRecursos"
        destinoInversion column: "destinoInversion",name: "destinoInversion"
        detalleprestar column: "detalleprestar",name: "detalleprestar"
    }
}
