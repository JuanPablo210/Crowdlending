package mx.saccsa.Crowdlending.utils

import grails.gorm.transactions.Transactional
import mx.saccsa.Crowdlending.MailContact

@Transactional
class MailUtilService {

    def mailService
    def attachMail(def id, String domain, String process, byte[] file, def fileName, def mimeType,def _subject, def body, withCc=false) {
        MailContact mailContact = MailContact.find("from MailContact where _process=:process and domain=:domain and contactId=:contactId",[process:process, domain:domain, contactId:id.toString()])
        if(!mailContact)
            return [error:1,mensaje:"Error en envio de email. El conctacto no fue encontrado para [ "+process+" : "+domain+" : "+id+" ]"]
        Closure config
        if(withCc && mailContact._cc )
            config = {
                multipart true
                to mailContact._to
                subject _subject
                cc mailContact._cc
                attach fileName, mimeType, file
                text body
            }
        else
            config = {
                multipart true
                to mailContact._to
                subject _subject
                attach fileName, mimeType, file
                text body
            }
        try {
            mailService.sendMail config
            return [error:0,mensaje:"Email enviado a "+mailContact?._to]
        } catch (Exception ex) {
            ex.printStackTrace()
            return [error:2,mensaje:"Error en envio de email a "+mailContact?._to]
        }
    }
}
