package mx.saccsa.Crowdlending

import grails.gorm.services.Service

@Service(SolicitudPrestamo)
interface SolicitudPrestamoService {

    SolicitudPrestamo get(Serializable id)

    List<SolicitudPrestamo> list(Map args)

    Long count()

    void delete(Serializable id)

    SolicitudPrestamo save(SolicitudPrestamo solicitudPrestamo)

}