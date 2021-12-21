package mx.saccsa.Crowdlending

import grails.rest.RestfulController
import grails.validation.ValidationException
import mx.saccsa.security.Usuario

import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK
import static org.springframework.http.HttpStatus.UNPROCESSABLE_ENTITY

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional

@ReadOnly
class ClienteController extends RestfulController<Cliente> {
    ClienteController() {
        super(Cliente)
    }
  def springSecurityService
    def verificar(){
        def cliente = Cliente.findAllByUsuario(usuario())
        def verificacionIndentidad = VerificacionIdentidad.findAllByUsuario(usuario())

//        if (cliente.size())
        def clienteValidator = cliente.size()>0?true:false
        def verificacionIdentidadValidator = verificacionIndentidad.size()>0?true:false

        def respuesta = [
                clienteValidator: clienteValidator,
                verificacionIdentidadValidator: verificacionIdentidadValidator

        ]

        respond(respuesta)

    }
    @Transactional
    def save(){
        def instanciaRegistro = resource.newInstance()
        bindData instanciaRegistro,request.JSON
        instanciaRegistro.usuario = usuario()
        instanciaRegistro.save(flush:true,failOnError:true)
    }

    def usuario(){
        return springSecurityService.getCurrentUser() as Usuario

    }

}
