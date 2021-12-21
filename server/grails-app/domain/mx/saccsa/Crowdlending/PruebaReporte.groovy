package mx.saccsa.Crowdlending

class PruebaReporte {
    BigDecimal valorDeCuenta
    BigDecimal interesResividos
    BigDecimal intereseMoratorios
    BigDecimal iVADelInteresMoratorio
    BigDecimal comicionPorGestionCuenta
    BigDecimal comision
    BigDecimal ivaComision
    BigDecimal fondosAgregados
    BigDecimal retiros
    BigDecimal valorDeCuentaAlFinalDelMes
    BigDecimal dIsponibleAlFinalPeriodo
    BigDecimal ganadoALFinalDelPerido
    BigDecimal recursosFondeados
    BigDecimal pagosResividos
    BigDecimal prestamosRealizados
    BigDecimal comisionesPagadas
    BigDecimal recursosRetirados
    BigDecimal alCorriente
    BigDecimal entransito
    BigDecimal atrasado
    BigDecimal vencido
    BigDecimal pagado
    Date fecha


    static constraints = {
        valorDeCuenta nullable: true, blank:true
        interesResividos nullable: true, blank:true
        intereseMoratorios nullable: true, blank:true
        iVADelInteresMoratorio nullable: true, blank:true
        comicionPorGestionCuenta nullable: true, blank:true
        comision nullable: true, blank:true
        ivaComision nullable: true, blank:true
        fondosAgregados nullable: true, blank:true
        retiros nullable: true, blank:true
        valorDeCuentaAlFinalDelMes nullable: true, blank:true
        dIsponibleAlFinalPeriodo nullable: true, blank:true
        ganadoALFinalDelPerido nullable: true, blank:true
        recursosFondeados nullable: true, blank:true
        pagosResividos nullable: true, blank:true
        prestamosRealizados nullable: true, blank:true
        comisionesPagadas nullable: true, blank:true
        recursosRetirados nullable: true, blank:true
        alCorriente nullable: true, blank:true
        entransito nullable: true, blank:true
        atrasado nullable: true, blank:true
        vencido nullable: true, blank:true
        pagado nullable: true, blank:true
        fecha nullable: true, blank:true
    }

    static mapping = {
        table "PruebaReporte"
        version true
        id generator : "identity"
    }
}