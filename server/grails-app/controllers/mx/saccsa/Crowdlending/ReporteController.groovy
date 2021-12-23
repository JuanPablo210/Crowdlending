package mx.saccsa.Crowdlending

import java.text.SimpleDateFormat

class ReporteController {
    static responseFormats = ['json', 'xml']
    ReporteService reporteService
    def generateReportService
    def sdf = new SimpleDateFormat('yyyy-MM-dd')

    def pruebaRep(){
//        def fechaInicio = (!params?.fechaInicio)?null:(sdf.parse(params?.fechaInicio))
//        def fechaFin = (!params?.fechaFin)?null:(sdf.parse(params?.fechaFin))
        def lista = reporteService.pruebaRep(params.id)
        params._file = 'cartaConfirmacion'
        params._format = 'PDF'
        params._name = 'Carta Confirmación'
        params._reporteTitulo = 'Carta Confirmación'
        generateReportService.createReport(request,response,params, [data: lista])
    }
}
