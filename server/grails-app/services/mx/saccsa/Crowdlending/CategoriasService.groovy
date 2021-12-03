package mx.saccsa.Crowdlending

import grails.gorm.services.Service

@Service(Categorias)
interface CategoriasService {

    Categorias get(Serializable id)

    List<Categorias> list(Map args)

    Long count()

    void delete(Serializable id)

    Categorias save(Categorias categorias)

}