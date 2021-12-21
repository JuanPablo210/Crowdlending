package mx.saccsa.Crowdlending

import mx.saccsa.security.Usuario

class DepositosProvicional {
    Cliente afiliado
    Usuario usuario
    BigDecimal monto
    Date fecha
    Divisa divisa

    static mapping = {
        table('DepositosProvicional')
        version(false)
        id generator: 'identity'
    }
}
