package mx.saccsa.Crowdlending

import grails.gorm.services.Service

@Service(RazonSocial)
interface RazonSocialService {

    RazonSocial get(Serializable id)

    List<RazonSocial> list(Map args)

    Long count()

    void delete(Serializable id)

    RazonSocial save(RazonSocial razonSocial)

}