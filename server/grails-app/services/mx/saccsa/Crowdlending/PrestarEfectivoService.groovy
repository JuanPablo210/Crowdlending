package mx.saccsa.Crowdlending

import grails.gorm.services.Service

@Service(PrestarEfectivo)
interface PrestarEfectivoService {

    PrestarEfectivo get(Serializable id)

    List<PrestarEfectivo> list(Map args)

    Long count()

    void delete(Serializable id)

    PrestarEfectivo save(PrestarEfectivo prestarEfectivo)

}