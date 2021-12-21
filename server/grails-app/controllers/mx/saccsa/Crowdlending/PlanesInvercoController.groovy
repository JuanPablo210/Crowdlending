package mx.saccsa.Crowdlending

import grails.gorm.transactions.ReadOnly
import grails.rest.RestfulController
import mx.saccsa.Crowdlending.PlanesInverco

@ReadOnly
class PlanesInvercoController extends RestfulController<PlanesInverco>{
    PlanesInvercoController(){
        super(PlanesInverco)
    }
    def index() {
        respond PlanesInverco.list().collect{
            [
                    id: it.id,

                    descripcion: it.descripcion,
                    plazo: it.plazo,
                    aportacionMensual: it.aportacionMensual,
                    tasaInteres: it.tasaInteres,
            ]
        }
    }
}
