package mx.saccsa.Crowdlending

import grails.gorm.transactions.ReadOnly
import grails.rest.RestfulController
import groovy.time.TimeCategory
import mx.saccsa.security.Usuario

import java.text.SimpleDateFormat

@ReadOnly
class SaldosProvisionalController extends RestfulController<SaldosProvisional> {
    SaldosProvisionalController() {
        super(SaldosProvisional)
    }

    def saldosProvisionalService
    def springSecurityService
    def sdf = new SimpleDateFormat('yyyy-MM-dd');
    def formato = new SimpleDateFormat('dd-MM-yyyy');

    def balanceActual() {
        def tasa = 10
        BigDecimal balance = 0
        Calendar calendar = Calendar.getInstance();
        def fecha = sdf.parse(sdf.format(calendar.getTime()));
        def depositos = DepositosProvicional.findAllByUsuarioAndFechaNotGreaterThan(getUser(), fecha).collect({
            [
                    id      : it.id,
                    afiliado: it.afiliado.id,
                    usuario : it.usuario.descLabel,
                    monto   : it.monto,
                    fecha   : it.fecha,
                    divisa  : it.divisa.descLabel,
            ]
        })
        if (depositos.size() > 0) {
            for (deposito in depositos) {
                def dias = TimeCategory.minus(fecha, deposito.fecha).days;
                balance = balance + saldosProvisionalService.calculoBalance(deposito.monto, tasa, dias)
            }
        }
        return balance
    }

    def depositos() {
        def saldoDepositos = 0
        Calendar calendar = Calendar.getInstance();
        def inicio = sdf.parse(sdf.format(calendar.getTime()));
        calendar.set(Calendar.DAY_OF_MONTH, calendar.get(Calendar.DAY_OF_MONTH) + 1);
        def fin = sdf.parse(sdf.format(calendar.getTime()));

        InformacionPerfil afiliado = InformacionPerfil.findByUsuario(getUser())
        if (afiliado) {
            SaldosProvisional saldo = SaldosProvisional.findByAfiliadoAndFechaBetween(afiliado, inicio, fin)
            saldoDepositos = saldo.saldoFinal
        }
        return saldoDepositos
    }

    def getUser() {
        return springSecurityService.getCurrentUser() as Usuario
    }

    def dashboard() {
        saldosProvisionalService.cierre()
        def dash = [
//                balanceActual: balanceActual(),
//                depositos    : depositos(),
//                invercoins   : balanceActual(),
        ]
        respond(dash)
    }

    def depositosChart() {
        def lista = []
        def saldos
        InformacionPerfil afiliado = InformacionPerfil.findByUsuario(getUser())
        if (afiliado) {
            saldos = SaldosProvisional.findAllByAfiliado(afiliado).collect({
                [
                        saldo: it.saldoFinal,
                        fecha: formato.format(it.fecha)
                ]
            })

            lista = [
                    data : saldos.saldo,
                    label: saldos.fecha
            ]
        } else {
            lista = [
                    data : ['N/A'],
                    label: [0]
            ]
        }
        respond(lista)
    }

    def balanceChart() {

        def tasa = 10
        def lista = [ label: [], data: []]
        Calendar calendar = Calendar.getInstance();
        def fecha = sdf.parse(sdf.format(calendar.getTime()));
        def movimientos = DepositosProvicional.findAllByUsuarioAndFechaNotGreaterThan(getUser(), fecha)
        def fechas = movimientos.collect({
            [
                    fecha: it.fecha
            ]
        }).unique()
        def depositos = movimientos.collect({
            [
                    id      : it.id,
                    afiliado: it.afiliado.id,
                    usuario : it.usuario.descLabel,
                    monto   : it.monto,
                    fecha   : it.fecha,
                    divisa  : it.divisa.descLabel,
            ]
        })
        def saldos = []
        for(f in fechas){
            def monto = 0
            for (deposito in depositos){
                if(deposito.fecha == f.fecha) {
                    monto = monto + deposito.monto
                }
            }
            saldos.push( label: f.fecha, data: monto )
        }
        if (saldos.size() > 0) {


            for (s in saldos) {
                BigDecimal balance = 0
                def dias = TimeCategory.minus(fecha, s.label).days;
                balance = balance + saldosProvisionalService.calculoBalance(s.data, tasa, dias)
                String label = formato.format(s.label)
                lista.label.push(label)
                lista.data.push(balance)
            }

        }
        respond(lista)
    }
}
