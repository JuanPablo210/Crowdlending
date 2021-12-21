package mx.saccsa.Crowdlending

import grails.gorm.transactions.ReadOnly
import grails.rest.RestfulController
import mx.saccsa.Crowdlending.GiroActividad

@ReadOnly
class GiroActividadController extends RestfulController<GiroActividad> {
    GiroActividadController() {
        super(GiroActividad)
    }

    def index() {
        respond GiroActividad.list().collect {
            [
                    id: it.id,
                    claveGiroEmp: it.claveGiroEmp,
                    descripcionCorta: it.descripcionCorta,
                    descripcion: it.descripcion,
            ]
        }
    }
}
