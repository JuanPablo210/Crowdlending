package mx.saccsa.Crowdlending

import grails.gorm.transactions.ReadOnly
import grails.rest.RestfulController

@ReadOnly
class CiudadesController extends RestfulController<Ciudades>{
    CiudadesController(){
        super(Ciudades)
    }

    def index() {
        respond Ciudades.list().collect{
            [
                    id: it.id,

                    numeroCiudad: it.numeroCiudad,
                    numeroEstado: it.numeroEstado,
                    numeroPais: it.numeroPais,
                    descripcion: it.descripcion,
            ]
        }
    }
}
