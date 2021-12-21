package mx.saccsa.Crowdlending

class Calendario {
    String titulo
    String categoria
    Date fechaInicio
    Date fechaFin
    String detalle

    static constraints = {
        titulo nullable: false, blank: false
        categoria nullable: false, blank: false
        fechaInicio nullable: false, blank: false
        fechaFin nullable: false, blank: false
        detalle nullable: false, blank: false
    }
    static mapping = {
        table "Calendario"
        version true
        id generator: "identity"
        titulo column: "titulo",name: "titulo"
        categoria column: "categoria",name: "categoria"
        fechaInicio column: "fechaInicio",name: "fechaInicio"
        fechaFin column: "fechaFin",name: "fechaFin"
        detalle column: "detalle",name: "detalle"

    }
}
