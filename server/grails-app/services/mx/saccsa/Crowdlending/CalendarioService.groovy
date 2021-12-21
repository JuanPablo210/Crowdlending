package mx.saccsa.Crowdlending

import grails.gorm.services.Service

@Service(Calendario)
interface CalendarioService {

    Calendario get(Serializable id)

    List<Calendario> list(Map args)

    Long count()

    void delete(Serializable id)

    Calendario save(Calendario calendario)

}