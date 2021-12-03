package mx.saccsa.Crowdlending

import grails.gorm.services.Service

@Service(Actividades)
interface ActividadesService {

    Actividades get(Serializable id)

    List<Actividades> list(Map args)

    Long count()

    void delete(Serializable id)

    Actividades save(Actividades actividades)

}