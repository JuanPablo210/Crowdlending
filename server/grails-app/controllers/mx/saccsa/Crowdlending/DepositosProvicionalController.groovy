package mx.saccsa.Crowdlending

import grails.gorm.transactions.ReadOnly
import grails.rest.RestfulController
import mx.saccsa.security.Usuario
import mx.saccsa.security.UsuarioRole

import java.text.SimpleDateFormat

@ReadOnly
class DepositosProvicionalController extends RestfulController<DepositosProvicional> {
    DepositosProvicionalController() {
        super(DepositosProvicional)
    }

    def springSecurityService
    def sdf = new SimpleDateFormat('yyyy-MM-dd');

    def index() {
        Usuario user = springSecurityService.getCurrentUser() as Usuario
        UsuarioRole usuarioRole = UsuarioRole.findByUsuario(user)
        def depositos, lista
        if (usuarioRole.id == 1){
            lista = DepositosProvicional.list()
        } else {
            InformacionPerfil informacionPerfil = InformacionPerfil.findByUsuario(user)
            lista = DepositosProvicional.findAllByAfiliado(informacionPerfil)
        }
                depositos = lista.collect({
                    [
                            id      : it.id,
                            afiliado: it.afiliado.id,
                            usuario : it.usuario.descLabel,
                            monto   : it.monto,
                            fecha   : it.fecha,
                            divisa  : it.divisa.descLabel,
                    ]
                })
        depositos = depositos.sort{it.fecha}.reverse()
        respond(depositos)
    }

    def save() {
        Usuario user = springSecurityService.getCurrentUser() as Usuario
        InformacionPerfil informacionPerfil = InformacionPerfil.findByUsuario(user)
        DepositosProvicional instance = resource.newInstance()
        bindData instance, request.JSON
        instance.usuario = user
        instance.validate()
         instance.save(flush: true, failOnError: true)


        Calendar calendar = Calendar.getInstance();
        calendar.setTime(instance.fecha);
        def inicio = sdf.parse(sdf.format(calendar.getTime()));
        calendar.set(Calendar.DAY_OF_MONTH, calendar.get(Calendar.DAY_OF_MONTH) + 1);
        def fin = sdf.parse(sdf.format(calendar.getTime()));

        SaldosProvisional saldosProvisional = SaldosProvisional.findByAfiliadoAndFechaBetween(informacionPerfil, inicio, fin)
        if (saldosProvisional) {
            saldosProvisional.saldoFinal = saldosProvisional.saldoFinal + instance.monto
            saldosProvisional.save(flush: true, failOnError: true)
        } else {
            respond(message: 'no encontrado')
        }

        respond(instance)
    }
}
