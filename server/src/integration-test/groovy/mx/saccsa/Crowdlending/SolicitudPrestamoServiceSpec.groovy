package mx.saccsa.Crowdlending

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class SolicitudPrestamoServiceSpec extends Specification {

    SolicitudPrestamoService solicitudPrestamoService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new SolicitudPrestamo(...).save(flush: true, failOnError: true)
        //new SolicitudPrestamo(...).save(flush: true, failOnError: true)
        //SolicitudPrestamo solicitudPrestamo = new SolicitudPrestamo(...).save(flush: true, failOnError: true)
        //new SolicitudPrestamo(...).save(flush: true, failOnError: true)
        //new SolicitudPrestamo(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //solicitudPrestamo.id
    }

    void "test get"() {
        setupData()

        expect:
        solicitudPrestamoService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<SolicitudPrestamo> solicitudPrestamoList = solicitudPrestamoService.list(max: 2, offset: 2)

        then:
        solicitudPrestamoList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        solicitudPrestamoService.count() == 5
    }

    void "test delete"() {
        Long solicitudPrestamoId = setupData()

        expect:
        solicitudPrestamoService.count() == 5

        when:
        solicitudPrestamoService.delete(solicitudPrestamoId)
        sessionFactory.currentSession.flush()

        then:
        solicitudPrestamoService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        SolicitudPrestamo solicitudPrestamo = new SolicitudPrestamo()
        solicitudPrestamoService.save(solicitudPrestamo)

        then:
        solicitudPrestamo.id != null
    }
}
