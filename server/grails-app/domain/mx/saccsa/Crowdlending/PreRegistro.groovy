package mx.saccsa.Crowdlending

class PreRegistro {
    //String nombre
    //String apellidoPaterno
    //String apellidoMaterno
    String username
    String mail
    String password

    static constraints = {
        //nombre nullable: false, blank: false
        //apellidoPaterno nullable: false, blank: false
        //apellidoMaterno nullable: true, blank: true
        username nullable: false, blank: false
        mail nullable: false, blank: false
        password nullable: false, blank: false
    }

    static mapping = {
        table "PreRegistro"
        id generator: 'identity'
        version(false)

        //nombre name: "nombre", column: "nombre"
        //apellidoPaterno name: "apellidoPaterno", column: "apellidoPaterno"
        //apellidoMaterno name: "apellidoMaterno", column: "apellidoMaterno"
        username name: "username", column: "username"
        mail name: "mail", column: "mail"
        password name: "password", column: "password"
    }
    static transients = ['descLabel']

    String getDescLabel() { username }
}

