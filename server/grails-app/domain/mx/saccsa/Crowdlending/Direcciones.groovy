package mx.saccsa.Crowdlending

class Direcciones implements Serializable{

    static auditable =  true
    transient static def headers=['Consecutivo','Contrato','Aplica a','Calle y Numero','Colonia','Codigo Postal','Delegacion','Ciudad','Estado','Numero Exterior','Numero Interior','Domicilio Fiscal']
    transient static def withProperties=['consecutivo','contrato','aplica','direccion','colonia','codigop','delegacion','ciudad','estado','numexterior','numinterior','domipostal']

    Cliente contrato
    Integer	consecutivo
    String	aplica
    String	direccion
    String	colonia
    String	codigop
    String	delegacion
    String	ciudad
    String	estado
    String	numexterior
    String	numinterior
    Boolean	domipostal

    static constraints = {
        contrato nullable: false,unique: ['contrato','consecutivo']
        consecutivo nullable: false
        aplica nullable: false, size: 0..1
        direccion nullable: false, size: 0..50
        colonia nullable: true, size: 0..60
        codigop nullable: true, size: 0..8
        delegacion nullable: true, size: 0..30
        ciudad nullable: true, size: 0..30
        estado nullable: true, size: 0..25
        numexterior nullable: true, size: 0..20
        numinterior nullable: true, size: 0..20
        domipostal nullable: false
    }
    static mapping = {
        table name: 'DIRECCIONES'
        //id generator: 'identity'
        id generator: 'sequence', params:[sequence:'DIRECCIONES_SEQ']
        contrato name:'contrato', column:'contrato'
        consecutivo name:'consecutivo', column:'consecutivo'
        aplica name:'aplica', column:'aplica'
        direccion name:'direccion', column:'direccion'
        colonia name:'colonia', column:'colonia'
        codigop name:'codigop', column:'codigop'
        delegacion name:'delegacion', column:'delegacion'
        ciudad name:'ciudad', column:'ciudad'
        estado name:'estado', column:'estado'
        numexterior name:'numexterior', column:'numexterior'
        numinterior name:'numinterior', column:'numinterior'
        domipostal name:'domipostal', column:'domipostal'
    }

}
