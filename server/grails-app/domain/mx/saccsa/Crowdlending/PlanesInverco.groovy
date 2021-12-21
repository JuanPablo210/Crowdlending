package mx.saccsa.Crowdlending

class PlanesInverco {
    String descripcion
    String plazo
    String aportacionMensual
    String tasaInteres

    static constraints = {
        descripcion nullable: false, blank: false
        plazo nullable: false, blank: false
        aportacionMensual nullable: false, blank: false
        tasaInteres nullable: false, blank: false
    }

    static mapping = {
        table "PlanesInverco"
        id generator: 'identity'
        version(false)
    }
    static transients = ['descLabel']

    String getDescLabel() { descripcion }
}
