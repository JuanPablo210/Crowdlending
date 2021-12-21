package mx.saccsa.Crowdlending

class Ciudades {
    Integer numeroCiudad
    Integer numeroEstado
    Integer numeroPais
    String descripcion

    static mapping = {
        table ("Ciudades")
        version(false)
        id generator: 'identity'
    }

    static transients = ['descLabel']
    String getDescLabel() { descripcion }
}
