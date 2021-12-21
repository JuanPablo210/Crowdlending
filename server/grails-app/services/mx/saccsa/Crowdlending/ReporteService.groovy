package mx.saccsa.Crowdlending

import grails.gorm.transactions.Transactional

import java.text.SimpleDateFormat

@Transactional
class ReporteService {
    def springSecurityService
    def sdf = new SimpleDateFormat('yyyy-MM-dd')


    def pruebaRep(Date fechaInicio, Date fechaFin){
        PruebaReporte pruebaReporte = PruebaReporte.findAllByFecha()

        def datos = [
                valorDeCuenta: pruebaReporte.valorDeCuenta,
                interesResividos: pruebaReporte.interesResividos,
                intereseMoratorios: pruebaReporte.intereseMoratorios,
                iVADelInteresMoratorio: pruebaReporte.iVADelInteresMoratorio,
                comicionPorGestionCuenta: pruebaReporte.comicionPorGestionCuenta,
                comision: pruebaReporte.comision,
                ivaComision: pruebaReporte.ivaComision,
                fondosAgregados: pruebaReporte.fondosAgregados,
                retiros: pruebaReporte.retiros,
                valorDeCuentaAlFinalDelMes: pruebaReporte.valorDeCuentaAlFinalDelMes,
                dIsponibleAlFinalPeriodo: pruebaReporte.dIsponibleAlFinalPeriodo,
                ganadoALFinalDelPerido: pruebaReporte.ganadoALFinalDelPerido,
                recursosFondeados: pruebaReporte.recursosFondeados,
                pagosResividos: pruebaReporte.pagosResividos,
                prestamosRealizados: pruebaReporte.prestamosRealizados,
                comisionesPagadas: pruebaReporte.comisionesPagadas,
                recursosRetirados: pruebaReporte.recursosRetirados,
                alCorriente: pruebaReporte.alCorriente,
                entransito: pruebaReporte.entransito,
                atrasado: pruebaReporte.atrasado,
                vencido: pruebaReporte.vencido,
                pagado: pruebaReporte.pagado,
                fecha: pruebaReporte.fecha,
        ]
        return datos
    }
}
