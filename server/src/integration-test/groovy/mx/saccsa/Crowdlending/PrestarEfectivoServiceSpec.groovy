package mx.saccsa.Crowdlending

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class PrestarEfectivoServiceSpec extends Specification {

    PrestarEfectivoService prestarEfectivoService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new PrestarEfectivo(...).save(flush: true, failOnError: true)
        //new PrestarEfectivo(...).save(flush: true, failOnError: true)
        //PrestarEfectivo prestarEfectivo = new PrestarEfectivo(...).save(flush: true, failOnError: true)
        //new PrestarEfectivo(...).save(flush: true, failOnError: true)
        //new PrestarEfectivo(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //prestarEfectivo.id
    }

    void "test get"() {
        setupData()

        expect:
        prestarEfectivoService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<PrestarEfectivo> prestarEfectivoList = prestarEfectivoService.list(max: 2, offset: 2)

        then:
        prestarEfectivoList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        prestarEfectivoService.count() == 5
    }

    void "test delete"() {
        Long prestarEfectivoId = setupData()

        expect:
        prestarEfectivoService.count() == 5

        when:
        prestarEfectivoService.delete(prestarEfectivoId)
        sessionFactory.currentSession.flush()

        then:
        prestarEfectivoService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        PrestarEfectivo prestarEfectivo = new PrestarEfectivo()
        prestarEfectivoService.save(prestarEfectivo)

        then:
        prestarEfectivo.id != null
    }
}
