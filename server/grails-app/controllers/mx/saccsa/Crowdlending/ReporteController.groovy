package mx.saccsa.Crowdlending

class ReporteController {
    static responseFormats = ['json', 'xml']
    ReporteService reporteService
    def generateReportService

    def pruebaRep(){
        def fechaInicio = (!params?.fechaInicio)?session.fecha:(sdf.parse(params?.fechaInicio))
        def fechaFin = (!params?.fechaFin)?session.fecha:(sdf.parse(params?.fechaFin))
        def lista = reporteService.pruebaRep(fechaInicio, fechaFin)
        params._file = ''
        params._format = 'PDF'
        params._name = ''
        params._reporteTitulo = ''
        generateReportService.createReport(request,response,params, [data: [lista]])
    }
}
