package mx.saccsa.Crowdlending

class SaldosProvisional {
    InformacionPerfil afiliado
    BigDecimal saldoInicial
    BigDecimal saldoFinal
    Date fecha
    Boolean cierre = false

    static constraints = {
        afiliado nullable: false, blank: false
        saldoInicial nullable: false, blank: false
        saldoFinal nullable: false, blank: false
        fecha nullable: false, blank: false
        cierre nullable: false, blank: false
    }

    static mapping = {
        table('SaldosProvisional')
        version(false)
        id generator: 'identity'
    }
}
