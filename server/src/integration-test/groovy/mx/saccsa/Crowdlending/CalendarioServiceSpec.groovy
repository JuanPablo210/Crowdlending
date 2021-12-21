package mx.saccsa.Crowdlending

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class CalendarioServiceSpec extends Specification {

    CalendarioService calendarioService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Calendario(...).save(flush: true, failOnError: true)
        //new Calendario(...).save(flush: true, failOnError: true)
        //Calendario calendario = new Calendario(...).save(flush: true, failOnError: true)
        //new Calendario(...).save(flush: true, failOnError: true)
        //new Calendario(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //calendario.id
    }

    void "test get"() {
        setupData()

        expect:
        calendarioService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Calendario> calendarioList = calendarioService.list(max: 2, offset: 2)

        then:
        calendarioList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        calendarioService.count() == 5
    }

    void "test delete"() {
        Long calendarioId = setupData()

        expect:
        calendarioService.count() == 5

        when:
        calendarioService.delete(calendarioId)
        sessionFactory.currentSession.flush()

        then:
        calendarioService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Calendario calendario = new Calendario()
        calendarioService.save(calendario)

        then:
        calendario.id != null
    }
}
