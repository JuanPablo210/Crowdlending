
package mx.saccsa.security

import grails.gorm.transactions.Transactional
import mx.saccsa.Crowdlending.PreRegistro
import mx.saccsa.common.Parametros


@Transactional
class AccountService {
    def mailUtilService
    def reqRecoverPassword(def urlBase, String mailOrUsername) {
        String parametros = Parametros.getValorByParametro("CONTACT_RECOVER_MAIL") ?: 'contactosistemas@inverco.com.mx'
        def body ="<strong>Estimado Usuario</strong><br/></br>¡Recibimos la solicitud para cambiar/recuperar la contrase&ntilde;a de su cuenta " + mailOrUsername +"!<br/></br/>Haz click en el siguiente enlace para iniciar el proceso: <strong>"
        def footer = "<br/><br/><br/>Si usted, no ha solicitado el cambio o recuperacion de contraseña, favor de enviar un correo a <a href='mailTo:"+parametros + "'> " + parametros+"</a> para seguridad de cuenta."
        Usuario usuario
        String url
        String token
        MAccount mAccount
        if(MAccount.countByUsername(mailOrUsername) > 0 ){
            return [error:1, message:"Ya existe una solicitud pendiente para: " + mailOrUsername +". Espera 30 minutos para volver a registrar una solicitud"]
        }
        usuario = Usuario.findByUsername(mailOrUsername)
        if(!usuario)
            usuario = Usuario.findByMail(mailOrUsername)
        if(!usuario)
            return [error:1, message:"No se encuentra el mail/usuario registrado: " + mailOrUsername]
        token = createToken(usuario.username+usuario.mail)
        url = urlBase+"reset-password/"+token
        body+= "<a href='"+url+"' target='_blank'>RECUPERAR CONTRASE&Ntilde;A</a></strong>" + footer
        mAccount = new MAccount()
        mAccount.username = usuario.username
        mAccount.tokenType = 'RECOVER'
        mAccount.token = token
        mAccount.save(flush:true, failOnError:true)
        mailUtilService.sendMail(usuario.mail, "Recuperaci\u00f3n de contrase\u00f1a",body)
        return [error:0, message: "Se envio un correo a "+usuario.mail + " con las intrucciones para continuar con el proceso."]
    }

    def reqActivateAccount(def urlBase, PreRegistro preRegistro){
        String parametros = Parametros.getValorByParametro("CONTACT_RECOVER_MAIL") ?: 'contactosistemas@inverco.com.mx'
        def body ="<strong>Estimado Usuario</strong><br/></br>¡Recibimos la solicitud para la activaci\u00f3n de su cuenta " + preRegistro.mail +"!<br/></br/>Haz click en el siguiente enlace para iniciar el proceso: <strong>"
        def footer = "<br/><br/><br/>Si usted, no ha solicitado el cambio o recuperacion de contraseña, favor de enviar un correo a <a href='mailTo:"+parametros + "'> " + parametros+"</a> para seguridad de cuenta."
        String token
        def url
        MAccount mAccount
        token = createToken(preRegistro.username+preRegistro.mail)
        url = urlBase+"activate-account/"+token
        body+= "<a href='"+url+"' target='_blank'>ACTIVAR CUENTA</a></strong>" + footer
        mAccount = new MAccount()
        mAccount.username = preRegistro.username
        mAccount.tokenType = 'ACTIVATE'
        mAccount.token = token
        mAccount.save(flush:true, failOnError:true)
        mailUtilService.sendMail(preRegistro.mail, "Activaci\u00f3n de cuenta",body)
        [error:0, message: "Se envio un correo a tu cuenta "+preRegistro.mail +" para la activaci\u00f3n de la cuenta."]
    }
    def recoverOrActiveAccount(String token, def instanceJson){
        def mapReq = getReqToken(token)
        if(mapReq.error > 0 )return mapReq
        if(mapReq.type == 'ACTIVATE') activateAccount(mapReq.username)
        else recoverAccount(mapReq.username, instanceJson)
    }
    @Transactional
    private recoverAccount(String username, def instanceJson){
        def noHistoria = Parametros.findByParametro("REST_NO_HISTORIA")?.valor ?: '5'
        String message=""
        //"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
        String newPassword = instanceJson.password
        String newPassword2 = instanceJson.password_conf
        def regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
        def matcher = newPassword=~regexp
        if(!matcher){
            transactionStatus.setRollbackOnly()
            message = 'La contraseña debe ser de al menos 8 caracteres con al menos 1 letra mayuscula, 1 letra minuscula y 1 numero.'
            return [error: 2, message: message]
        }

        if (!newPassword || !newPassword2 || newPassword != newPassword2) {
            transactionStatus.setRollbackOnly()
            message = 'Todos los campos son requeridos'
            return [error: 3, message: message]
        }

        Usuario user = Usuario.findByUsername(username)
        user?.lock()
        user?.refresh()

        UsuarioHistorico.findAllByUsuario(user, [sort:"ultimaActualizacion", order:"desc"]).each{ uh ->
            if (springSecurityService.passwordEncoder.isPasswordValid(uh.password, newPassword, null /*salt*/)) {
                transactionStatus.setRollbackOnly()
                message = "El password ya se ha utilizado en las ultimas ${noHistoria?:3} actualizaciones de password."
                return [error: 4, message: message]
            }
        }
        def usuarioHistoria = new UsuarioHistorico()
        usuarioHistoria.password = user.password
        usuarioHistoria.ultimaActualizacion = new Date()
        usuarioHistoria.usuario = user
        user.password = newPassword
        user.nuevo = false
        usuarioHistoria.save(flush: true)
        user.save(flush:true) // if you have password constraints check them here
        List<UsuarioHistorico> listaUH = []
        UsuarioHistorico.findAllByUsuario(user, [sort:"ultimaActualizacion",order:"desc"]).eachWithIndex{ entry, i -> if(i >= Integer.parseInt(noHistoria)) listaUH.add entry }
        if(!listaUH.isEmpty()) listaUH*.delete(flush: true,failOnError:true)

        message="Password actualizado correctamente."
        MAccount.findByUsernameAndTokenType(username, 'RECOVER')?.delete(flush: true, failOnError: true)
        return [error: 0, message: message]
    }
    @Transactional
    private activateAccount(String username){
        PreRegistro preRegistro = PreRegistro.findByUsername(username)

        Usuario instance = new Usuario()
        instance.username = preRegistro.username
        instance.password = preRegistro.password
        instance.mail = preRegistro.mail
        instance.nombre = 'Usuario'
        instance.apellidoPaterno = 'Inverco '
        instance.apellidoMaterno = 'Mexico'
        instance.avatar = "avatar"
        instance.desde = new Date()
        instance.nuevo = false
        instance.enabled = true
        instance.accountExpired = false
        instance.accountLocked = false
        instance.passwordExpired = false

        instance.validate()

        if (instance.hasErrors()) {
            transactionStatus.setRollbackOnly()
            return [error: 1,message:  instance.errors ]// STATUS CODE 422
        }
        instance.save(flush: true)
        /*================SAVE PERFIL=============*/
        def roleId = 1
        def r = Role.findById(roleId as long)
        if(!UsuarioRole.create(instance,r,true)){
            transactionStatus.setRollbackOnly()
            return [error: 3,message:"Error al asignar el perfil del usuario"]
        }
        else {
            MAccount.findByUsernameAndTokenType(username, 'ACTIVATE')?.delete(flush: true, failOnError: true)
            return [error: 0, message: "Usuario y perfil creados correctamente"]
        }
    }
    private getReqToken(String token){
        MAccount mAccount = MAccount.findByToken(token)
        if(!mAccount) return [error:1, message: "No se encuentra la solicitud o la solicitud para iniciar el proceso a caducado. Favor de volver a enviar una nueva solicitud,"]
        if(mAccount.tokenType == "RECOVER")
            return [error:0, type:"RECOVER", username:mAccount.username]
        else
            return [error:0, type:"ACTIVATE", username:mAccount.username]
    }
    private String createToken(String phrase){
        def randomValue = Math.random()*13
        String encodePhrase = (phrase + randomValue.toString()).digest("SHA-256")
        return encodePhrase
    }
}
