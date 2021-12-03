package mx.saccsa.Crowdlending

class Actividades {
//
    String nombre
    Date fechaInicio
    Date fechaFin
    String estatus
    String descripcion


    static constraints = {
        categoria nullable: false, blank: false
        nombre nullable: false, blank: false
        fechaInicio nullable: false, blank: false
        fechaFin nullable: false, blank: false
        estatus nullable: false, blank: false
        descripcion nullable: true, blank: true
    }
    static mapping = {
        table "ACTIVIDADES"
        version true
        id generator: "identity"
        categoria column: "categoria",name: "categoria"
        nombre column: "nombre", name: "nombre"
        fechaInicio column: "fechaInicio", name: "fechaInicio"
        fechaFin column: "fechaFin", name: "fechaFin"
        estatus column: "estatus", name: "estatus"
        descripcion column: "descripcion", name:"descripcion"
    }

    static transients = ['descLabel']
    String getDescLabel(){
        nombre
    }
}
