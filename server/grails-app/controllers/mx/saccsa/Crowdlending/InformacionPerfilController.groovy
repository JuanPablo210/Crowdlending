package mx.saccsa.Crowdlending

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional
import grails.rest.RestfulController

import mx.saccsa.security.Usuario

import java.text.SimpleDateFormat

@ReadOnly
class InformacionPerfilController extends RestfulController<InformacionPerfil> {
    InformacionPerfilController() {
        super(InformacionPerfil)
    }
    def springSecurityService
    def sdf = new SimpleDateFormat('dd-MM-yyyy')

    def index() {
        Usuario user = springSecurityService.getCurrentUser() as Usuario
        InformacionPerfil infoPerfil = InformacionPerfil.findByUsuario(user)
        def lista = infoPerfil.collect({
            [
                    id             : it.id,
                    upLine         : it.upLine,
                    nombre         : it.nombre,
                    apellidoPaterno: it.apellidoPaterno,
                    apellidoMaterno: it.apellidoMaterno,
                    fechaNacimiento: it.fechaNacimiento,
                    curp           : it.curp.toUpperCase(),
                    rfc            : it.rfc.toUpperCase(),
                    sexo           : it.sexo,
                    calle          : it.calle,
                    numeroExterno  : it.numeroExterno,
                    numeroInterno  : it.numeroInterno,
                    codigoPostal   : it.codigoPostal,
                    colonia        : it.localidad,
                    ciudad         : it.ciudad,
                    municipio      : it.municipio,
                    estado         : it.estado,
                    telefono       : it.telefono,
                    fuenteIngresos : it.fuenteIngresos,
                    tipoPlan       : it.tipoPlan.descLabel,
            ]
        })
        respond(lista)
    }

    @Transactional
    def save() {
        Usuario user = springSecurityService.getCurrentUser() as Usuario
        InformacionPerfil instance = resource.newInstance()
        bindData instance, request.JSON
        instance.usuario = user
        instance.validate()
        instance.save(flush: true, failOnError: true)

        SaldosProvisional saldosProvisional = new SaldosProvisional();
        saldosProvisional.afiliado = instance
        saldosProvisional.saldoInicial = 0
        saldosProvisional.saldoFinal = 0
        saldosProvisional.fecha = new Date()
        saldosProvisional.cierre = false
        saldosProvisional.save(flush: true, failOnError: true)

        respond(instance)
    }

    def verificar() {
        Usuario user = springSecurityService.getCurrentUser() as Usuario
        def informacionPerfil = InformacionPerfil.findAllByUsuario(user)
        def verificacionIdentidad = VerificacionIdentidad.findAllByUsuario(user)



        def informacionPerfilValidator = false
        def verificacionIdentidadValidator = false


        if (informacionPerfil.size() > 0) {
            informacionPerfilValidator = true
        }
        if (verificacionIdentidad.size() > 0) {
            verificacionIdentidadValidator = true
        }



        def verificacion = [
                informacionPerfilValidator        : informacionPerfilValidator,
                verificacionIdentidadValidator    : verificacionIdentidadValidator,

        ]
        respond(verificacion)
    }

    def afiliados() {
        respond(InformacionPerfil.list().collect({
            [
                    id               : it.id,
                    nombre           : it.nombre,
                    apellidoPaterno  : it.apellidoPaterno,
                    apellidoMaterno  : it.apellidoMaterno,
                    fechaNacimiento  : sdf.format(it.fechaNacimiento),
                    fechaAlta        : sdf.format(it.fechaAlta),
                    fechaVerificacion: it.fechaVerificacion?sdf.format(it.fechaVerificacion):'N/A',
            ]
        }))
    }

    def show(Long id){
        InformacionPerfil infoPerfil = InformacionPerfil.findById(id)
        def lista = infoPerfil.collect({
            [
                    id             : it.id,
                    upLine         : it.upLine,
                    nombre         : it.nombre,
                    apellidoPaterno: it.apellidoPaterno,
                    apellidoMaterno: it.apellidoMaterno,
                    fechaNacimiento: it.fechaNacimiento,
                    curp           : it.curp.toUpperCase(),
                    rfc            : it.rfc.toUpperCase(),
                    sexo           : it.sexo,
                    calle          : it.calle,
                    codigoPostal   : it.codigoPostal,
                    colonia        : it.localidad,
                    ciudad         : it.ciudad,
                    municipio      : it.municipio,
                    estado         : it.estado,
                    telefono       : it.telefono,
                    fuenteIngresos : it.fuenteIngresos,
                    tipoPlan       : it.tipoPlan.descLabel,
            ]
        })
        respond(lista)
    }
}
