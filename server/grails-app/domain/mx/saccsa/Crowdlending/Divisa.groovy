package mx.saccsa.Crowdlending

class Divisa {
    static auditable =  true
    transient static def headers=['Clave','Descripcion','Iconta','Frecuencia']
    transient static def withProperties=['clave','descripcion','iconta','frecuencia']
    String clave
    Date dateCreated
    String iconta
    String descripcion
    String frecuencia
    String escenario = " "

    static constraints = {
        clave nullable: false,blank:false,size:0..4
        iconta nullable:true,blank:true,size:0..8
        descripcion nullable: false,blank:false,size:0..25

        frecuencia nullable: true, size: 0..1
        escenario nullable: true, size: 0..8

    }
    static mapping = {
        table "DIVISA"
        id name:'clave', column:'clave', generator:'assigned'
        dateCreated name:"dateCreated", column: "fechaAlta"
        iconta name:'iconta', column:'iconta'
        descripcion name:'descripcion', column:'descripcion'

        frecuencia name: 'frecuencia', column: 'frecuencia'
        escenario name: 'escenario', column: 'escenario'

    }

    String getId(){
        clave
    }

    String getDescLabel(){
        descripcion
    }
}
