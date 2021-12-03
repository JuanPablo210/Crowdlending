package mx.saccsa.Crowdlending

import grails.gorm.transactions.Transactional

import java.text.SimpleDateFormat

@Transactional
class ReporteService {
    def springSecurityService
    def sdf = new SimpleDateFormat('yyyy-MM-dd')

}
