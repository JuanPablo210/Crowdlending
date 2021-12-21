package mx.saccsa.Crowdlending

class SolicitudPrestamo {

        String cantidadDinero
        String mesesAPagar
        String motivoPrestamo
        String detalleSolicitud

    static constraints = {
        cantidadDinero nullable: false, blank: false
        mesesAPagar nullable: false, blank: false
        motivoPrestamo nullable: false, blank: false
        detalleSolicitud nullable: false, blank: false
    }
    static mapping = {
        table "SolicitudPrestamo"
        id generator: 'identity'
        version(false)
        cantidadDinero name: "cantidadDinero", column: "cantidadDinero"
        mesesAPagar  name: "mesesAPagar", column: "mesesAPagar"
        motivoPrestamo name: "motivoPrestamo", column: "motivoPrestamo"
        detalleSolicitud name: "detalleSolicitud", column: "detalleSolicitud"
    }
}
