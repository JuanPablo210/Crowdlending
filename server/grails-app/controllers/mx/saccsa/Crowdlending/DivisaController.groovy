package mx.saccsa.Crowdlending

import grails.gorm.transactions.ReadOnly
import grails.rest.RestfulController

@ReadOnly
class DivisaController extends RestfulController<Divisa> {
    DivisaController() { super(Divisa) }

    def index() {
        respond Divisa.list().collect {
            [
                    id: it.id,
                    clave: it.clave,
                    dateCreated: it.dateCreated,
                    iconta: it.iconta,
                    descripcion: it.descripcion,
                    frecuencia: it.frecuencia,
                    escenario: it.escenario,
            ]
        }
    }
}
