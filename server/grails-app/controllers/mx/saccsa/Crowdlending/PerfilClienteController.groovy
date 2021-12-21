package mx.saccsa.Crowdlending

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional
import grails.rest.RestfulController
import mx.saccsa.Crowdlending.InformacionPerfil
import mx.saccsa.security.Usuario

@ReadOnly
class PerfilClienteController extends RestfulController<crowdlending.PerfilCliente>{
    PerfilClienteController(){
        super(crowdlending.PerfilCliente)
    }
    def springSecurityService

    def index() {
        Usuario user = springSecurityService.getCurrentUser() as Usuario
        respond crowdlending.PerfilCliente.findByUsuario(user).collect{
            [
                    id: it.id,
                    legalidadRecursos: it.legalidadRecursos,
                    propietarioRecursos: it.propietarioRecursos,
                    propietarioRecursosReal: it.propietarioRecursosReal,
                    puestoPolitico: it.puestoPolitico,
                    nombrePersonaPolitica: it.nombrePersonaPolitica,
            ]
        }
    }

    @Transactional
    def save(){
        Usuario user = springSecurityService.getCurrentUser() as Usuario
        crowdlending.PerfilCliente instance = resource.newInstance()
        bindData instance, request.JSON
        instance.usuario = user
        instance.validate()
        instance.save(flush: true, failOnError: true)
        respond(instance)
    }

    def show(Long id){
        InformacionPerfil informacionPerfil = InformacionPerfil.findById(id)
        respond crowdlending.PerfilCliente.findByUsuario(informacionPerfil.usuario).collect{
            [
                    id: it.id,
                    legalidadRecursos: it.legalidadRecursos,
                    propietarioRecursos: it.propietarioRecursos,
                    propietarioRecursosReal: it.propietarioRecursosReal,
                    puestoPolitico: it.puestoPolitico,
                    nombrePersonaPolitica: it.nombrePersonaPolitica,
            ]
        }
    }
}
