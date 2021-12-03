package mx.saccsa.Crowdlending

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional
import grails.rest.RestfulController
import mx.saccsa.security.Usuario

@ReadOnly
class PreRegistroController extends RestfulController<PreRegistro>{
    def accountService

    PreRegistroController(){ super(PreRegistro)}

    def index() {
        respond PreRegistro.list().collect{
            [
                    id: it.id,
                    username: it.username,
                    mail: it.mail,
                    password: it.password,
            ]
        }
    }


    @Transactional
    def save() {
        if(Usuario.countByUsername(request.JSON.username) >0 || Usuario.countByMail(request.JSON.mail) >0) {
            transactionStatus.setRollbackOnly()
            response.status = 412
            respond mensaje: "El nombre de usuario "+ request.JSON.username + " o correo ya estan registrados "+ request.JSON.mail
            return
        }
        def passconf= request.JSON.password2
        PreRegistro pre = resource.newInstance()
        bindData pre, request.JSON
        def regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
        def matcher = pre.password=~regexp
        def matcher2 = passconf =~ regexp
        if(!matcher || !matcher2){
            transactionStatus.setRollbackOnly()
            response.status = 412
            respond mensaje: 'La contraseña debe ser de al menos 8 caracteres con al menos 1 letra mayuscula, 1 letra minuscula y 1 numero. No se permiten caracteres especiales.'
            return
        }
        if(pre.password != passconf){
            transactionStatus.setRollbackOnly()
            response.status = 412
            respond mensaje: 'La contraseña y la confirmación no son iguales.'
            return
        }
        pre.validate()
        pre.save(flush: true, failOnError: true)
        respond accountService.reqActivateAccount(getBaseURL(request), pre)
    }
    private String getBaseURL(def request){
        //http://localhost:4200/Inverco#/Autenticacion/reset-password
        return request.scheme + "://"+ request.serverName + ":"+request.serverPort +"/Inverco#/Autenticacion/"
        //return request.scheme + "://"+ request.serverName + ":"+request.serverPort +request.getContextPath()+"/proceso_solicitud_cuenta/procesar"
    }


    def reqRecoverAccount(){
        String userOrMail = request.JSON.username
        def map = accountService.reqRecoverPassword(getBaseURL(request), userOrMail)
        if(map.error > 1)
            response.status = 412
        respond map
    }
    def activateAccount(String id){
        def map =  accountService.recoverOrActiveAccount(id, request.JSON)
        if(map.error> 0)
            response.status = 412
        respond map
    }
}
