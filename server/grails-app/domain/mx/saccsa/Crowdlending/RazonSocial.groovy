package mx.saccsa.Crowdlending

class RazonSocial {
    String nombre
    String rfc
    Boolean estatus = true

    static constraints = {
        nombre nullable: false, blank: false
        rfc nullable: false, blank: false
        estatus nullable: false, blank: false

    }

    static mapping = {
        table "RAZONSOCIAL"
        version true
        id generator : "identity"
        nombre column: "nombre", name: "nombre"
        rfc column: "rfc", name: "rfc"
        estatus column: "estatus", name: "estatus"

    }

    static transients = ['descLabel']
    String getDescLabel(){ nombre }
}
