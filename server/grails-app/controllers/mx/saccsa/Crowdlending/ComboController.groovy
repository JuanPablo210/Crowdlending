package mx.saccsa.Crowdlending

class ComboController {
    static responseFormats = ['json', 'xml']
    def springSecurityService

    def comboController(String id) {
        String groupId = 'mx.saccsa.Crowdlending'
        Class c = Class.forName(groupId + "." + id.capitalize())
        def data = c.list().collect {
            [
                    id         : it.ident(),
                    descripcion: it.descLabel
            ]
        }
        respond data
    }

    def comboCp(String id) {
        Estados estado = Estados.findById(id as long)
        def lista = Cp.findAllByEstado(estado.descripcion as String).collect({
            [
                    id          : it.codigoPostal,
                    descripcion : it.descLabel,
                    estado      : it.estado,
                    municipio   : it.municipio,
                    ciudad      : it.ciudad,
                    asentamiento: it.asentamiento
            ]
        })
        respond(lista)
    }

    def comboPlanes() {
        respond(PlanesInverco.list().collect({
            [
                    id         : it.id,
                    descripcion: it.descripcion,
                    plazo      : it.plazo,
                    aportacion : it.aportacionMensual,
                    tasa       : it.tasaInteres,
            ]
        }))
    }

    def subconcepto() {
        respond(Subconcepto.findAllBySubconceptoOrSubconcepto('DEF', 'REF').collect({
            [
                    id            : it.id,
                    descripcion   : it.descLabel,
                    tipoMovimiento: it.tipoMovimiento,
                    concepto: it.concepto
            ]
        }))
    }

}
