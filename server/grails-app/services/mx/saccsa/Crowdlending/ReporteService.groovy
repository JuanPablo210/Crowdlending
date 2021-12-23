package mx.saccsa.Crowdlending

import grails.gorm.transactions.Transactional

import java.text.SimpleDateFormat

@Transactional
class ReporteService {
    def springSecurityService
    def sdf = new SimpleDateFormat('yyyy-MM-dd')


//    def pruebaRep(Date fechaInicio, Date fechaFin){
    def pruebaRep(Long id){
//        def pruebaReporte = PruebaReporte.findByFechaBetween(fechaInicio, fechaFin).collect({
        def pruebaReporte = PruebaReporte.findById(id).collect({
            [
                    valorDeCuenta: it.valorDeCuenta,
                    interesResividos: it.interesResividos,
                    intereseMoratorios: it.intereseMoratorios,
                    iVADelInteresMoratorio: it.iVADelInteresMoratorio,
                    comicionPorGestionCuenta: it.comicionPorGestionCuenta,
                    comision: it.comision,
                    ivaComision: it.ivaComision,
                    fondosAgregados: it.fondosAgregados,
                    retiros: it.retiros,
                    valorDeCuentaAlFinalDelMes: it.valorDeCuentaAlFinalDelMes,
                    dIsponibleAlFinalPeriodo: it.dIsponibleAlFinalPeriodo,
                    ganadoALFinalDelPerido: it.ganadoALFinalDelPerido,
                    recursosFondeados: it.recursosFondeados,
                    pagosResividos: it.pagosResividos,
                    prestamosRealizados: it.prestamosRealizados,
                    comisionesPagadas: it.comisionesPagadas,
                    recursosRetirados: it.recursosRetirados,
                    alCorriente: it.alCorriente,
                    entransito: it.entransito,
                    atrasado: it.atrasado,
                    vencido: it.vencido,
                    pagado: it.pagado,
                    fecha: it.fecha,
            ]
        })

//        def datos = [
//                valorDeCuenta: pruebaReporte.valorDeCuenta,
//                interesResividos: pruebaReporte.interesResividos,
//                intereseMoratorios: pruebaReporte.intereseMoratorios,
//                iVADelInteresMoratorio: pruebaReporte.iVADelInteresMoratorio,
//                comicionPorGestionCuenta: pruebaReporte.comicionPorGestionCuenta,
//                comision: pruebaReporte.comision,
//                ivaComision: pruebaReporte.ivaComision,
//                fondosAgregados: pruebaReporte.fondosAgregados,
//                retiros: pruebaReporte.retiros,
//                valorDeCuentaAlFinalDelMes: pruebaReporte.valorDeCuentaAlFinalDelMes,
//                dIsponibleAlFinalPeriodo: pruebaReporte.dIsponibleAlFinalPeriodo,
//                ganadoALFinalDelPerido: pruebaReporte.ganadoALFinalDelPerido,
//                recursosFondeados: pruebaReporte.recursosFondeados,
//                pagosResividos: pruebaReporte.pagosResividos,
//                prestamosRealizados: pruebaReporte.prestamosRealizados,
//                comisionesPagadas: pruebaReporte.comisionesPagadas,
//                recursosRetirados: pruebaReporte.recursosRetirados,
//                alCorriente: pruebaReporte.alCorriente,
//                entransito: pruebaReporte.entransito,
//                atrasado: pruebaReporte.atrasado,
//                vencido: pruebaReporte.vencido,
//                pagado: pruebaReporte.pagado,
//                fecha: pruebaReporte.fecha,
//        ]
        return pruebaReporte
    }
}
