package mx.saccsa.Crowdlending

class GiroActividad {

    String claveGiroEmp
    String descripcionCorta
    String descripcion

    static mapping = {
        table ("GiroActividad")
        version(false)
        id generator: 'identity'
    }

    static transients = ['descLabel']
    String getDescLabel() { descripcion }
}
