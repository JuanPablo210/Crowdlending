package mx.saccsa.Crowdlending

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional
import grails.rest.RestfulController
import mx.saccsa.common.Parametros
import mx.saccsa.security.Usuario
import org.apache.commons.io.FileUtils
import org.springframework.dao.DuplicateKeyException

import java.sql.SQLException

@ReadOnly
class VerificacionIdentidadController extends RestfulController<VerificacionIdentidad> {
    VerificacionIdentidadController() { super(VerificacionIdentidad) }
    def springSecurityService

    def index() {
        Usuario user = springSecurityService.getCurrentUser() as Usuario
        def ruta = Parametros.getValorByParametro('RUTA_BASE')
        def lista = VerificacionIdentidad.findAllByUsuario(user)
        def respuesta = []
        for (archivo in lista) {
            byte[] fileContent = FileUtils.readFileToByteArray(new File(ruta + archivo.ruta));
            String encodedString = Base64.getEncoder().encodeToString(fileContent);
            respuesta.push(
                    id: archivo.id,
                    usuario: archivo.usuario.descLabel,
                    categoria: archivo.categoria,
                    descripcion: archivo.descripcion,
                    fechaAlta: archivo.fechaAlta,
                    nombre: archivo.nombre,
                    autorizado: archivo.autorizado,
                    contentType: archivo.contentType,
                    imagen: encodedString
            )
        }
        respond(respuesta)
    }

    def save() {
        params
        request.JSON
        Usuario user = springSecurityService.getCurrentUser() as Usuario
        def ruta = Parametros.getValorByParametro('RUTA_BASE')
        String usuario = 'Afiliado-' + user.id + File.separator
        def rutaComprobante = ruta + usuario + params.tipoComprobante + File.separator
        def rutaIdentificacion = ruta + usuario + params.tipoIdentificacion + File.separator
        def rutaInfoBancaria = ruta + usuario + params.tipoInfoBancaria + File.separator
        def rutaInfoFiscal = ruta + usuario + params.tipoInfoFiscal + File.separator
        def rutaFoto = ruta + usuario + 'Fotografía' + File.separator
        def instance1 = resource.newInstance()
        request.multipartFiles

        ///////////////////////////
        def file1 = request.multipartFiles.file1[0]


        if (!file1) {
            response.status = 400
            respond mensaje: "El archivo es incorrecto o nulo."
            return
        }

        String tipo1 = file1?.contentType
        def bytesOfFile1 = file1.getBytes()
        def nombre1 = file1.filename


        def directorioComprobante = new File(rutaComprobante);
        if (!directorioComprobante.exists()) {
            directorioComprobante.mkdirs()
        }

        def directorioIdentificacion = new File(rutaIdentificacion);
        if (!directorioIdentificacion.exists()) {
            directorioIdentificacion.mkdirs()
        }

        def directorioInfoBancaria = new File(rutaInfoBancaria);
        if (!directorioInfoBancaria.exists()) {
            directorioInfoBancaria.mkdirs()
        }

        def directorioInfoFiscal = new File(rutaInfoFiscal);
        if (!directorioInfoFiscal.exists()) {
            directorioInfoFiscal.mkdirs()
        }

        def directorioFoto = new File(rutaFoto);
        if (!directorioFoto.exists()) {
            directorioFoto.mkdirs()
        }

        def rutaArchivo1 = rutaComprobante + nombre1;
        def archivo1 = new File(rutaArchivo1)
        archivo1.bytes = bytesOfFile1

        if (instance1.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond instance1.errors, view: 'create' // STATUS CODE 422
            return
        }

        try {
            instance1.categoria = 'Comprobante de domicilio'
            instance1.descripcion = params.tipoComprobante
            instance1.contentType = file1.contentType
            instance1.ruta = usuario + params.tipoComprobante + File.separator + nombre1
            instance1.nombre = nombre1
            instance1.usuario = user

            instance1.save insert: true, flush: true, failOnError: true
        } catch (DuplicateKeyException duplicateExeption) {
            transactionStatus.setRollbackOnly()
            response.status = 422
            respond errors: [[message: "Registro duplicado"]]
            return
        } catch (SQLException sql) {
            transactionStatus.setRollbackOnly()
            response.status = 422
            respond errors: [[message: "Error en base de datos: " + sql.message]]
            return
        }
        ////
        ///////////////////////////
        def file2 = request.multipartFiles.file2[0]
        if (!file2) {
            response.status = 400
            respond mensaje: "El archivo es incorrecto o nulo."
            return
        }

        String tipo2 = file2?.contentType
        def bytesOfFile2 = file2.getBytes()
        def nombre2 = file2.filename

        def rutaArchivo2 = rutaIdentificacion + nombre2;
        def archivo2 = new File(rutaArchivo2)
        archivo2.bytes = bytesOfFile2

        def instance2 = resource.newInstance()
        if (instance2.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond instance2.errors, view: 'create' // STATUS CODE 422
            return
        }

        try {

            instance2.categoria = 'Identificación Oficial'
            instance2.descripcion = params.tipoIdentificacion
            instance2.contentType = file2.contentType
            instance2.ruta = usuario + params.tipoIdentificacion + File.separator + nombre2
            instance2.nombre = nombre2
            instance2.usuario = user
            instance2.save insert: true, flush: true, failOnError: true
        } catch (DuplicateKeyException duplicateExeption) {
            transactionStatus.setRollbackOnly()
            response.status = 422
            respond errors: [[message: "Registro duplicado"]]
            return
        } catch (SQLException sql) {
            transactionStatus.setRollbackOnly()
            response.status = 422
            respond errors: [[message: "Error en base de datos: " + sql.message]]
            return
        }
        ////
        ///////////////////////////
        def file3 = request.multipartFiles.file3[0]


        if (!file3) {
            response.status = 400
            respond mensaje: "El archivo es incorrecto o nulo."
            return
        }

        String tipo3 = file3?.contentType
        def bytesOfFile3 = file3.getBytes()
        def nombre3 = file3.filename

        def rutaArchivo3 = rutaInfoBancaria + nombre3;
        def archivo3 = new File(rutaArchivo3)
        archivo3.bytes = bytesOfFile3

        def instance3 = resource.newInstance()
        if (instance3.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond instance3.errors, view: 'create' // STATUS CODE 422
            return
        }

        try {

            instance3.categoria = 'Información Bancaria'
            instance3.descripcion = params.tipoInfoBancaria
            instance3.contentType = file3.contentType

            instance3.ruta = usuario + params.tipoInfoBancaria + File.separator + nombre3
            instance3.nombre = nombre3
            instance3.usuario = user
            instance3.save insert: true, flush: true, failOnError: true
        } catch (DuplicateKeyException duplicateExeption) {
            transactionStatus.setRollbackOnly()
            response.status = 422
            respond errors: [[message: "Registro duplicado"]]
            return
        } catch (SQLException sql) {
            transactionStatus.setRollbackOnly()
            response.status = 422
            respond errors: [[message: "Error en base de datos: " + sql.message]]
            return
        }
        ///////////////////////////
        def file5 = request.multipartFiles.file5[0]
        if (!file5) {
            response.status = 400
            respond mensaje: "El archivo es incorrecto o nulo."
            return
        }

        String tipo5 = file5?.contentType
        def bytesOfFile5 = file5.getBytes()
        def nombre5 = file5.filename

        def rutaArchivo5 = rutaInfoFiscal + nombre5;
        def archivo5 = new File(rutaArchivo5)
        archivo5.bytes = bytesOfFile5

        def instance4 = resource.newInstance()
        if (instance4.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond instance4.errors, view: 'create' // STATUS CODE 422
            return
        }

        try {

            instance4.categoria = 'Información Fiscal'
            instance4.descripcion = params.tipoInfoFiscal
            instance4.contentType = file5.contentType

            instance4.ruta = usuario + params.tipoInfoFiscal + File.separator + nombre5
            instance4.nombre = nombre5
            instance4.usuario = user
            instance4.save insert: true, flush: true, failOnError: true
        } catch (DuplicateKeyException duplicateExeption) {
            transactionStatus.setRollbackOnly()
            response.status = 422
            respond errors: [[message: "Registro duplicado"]]
            return
        } catch (SQLException sql) {
            transactionStatus.setRollbackOnly()
            response.status = 422
            respond errors: [[message: "Error en base de datos: " + sql.message]]
            return
        }

        def imagen = params.imagen
        imagen.replaceAll("\r", "")
        imagen.replaceAll("\n", "")
        byte[] decoded = imagen.decodeBase64()
//        print(decoded)

        def rutaArchivo6 = ruta + usuario + 'Fotografía' + File.separator + 'imagen.png';
        def archivo6 = new File(rutaArchivo6)
        archivo6.bytes = decoded

        def instance5 = resource.newInstance()
        if (instance5.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond instance5.errors, view: 'create' // STATUS CODE 422
            return
        }

        try {

            instance5.categoria = 'Información Personal'
            instance5.descripcion = 'Foto'
            instance5.contentType = 'image/png'

            instance5.usuario = user
            instance5.ruta = usuario + 'Fotografía' + File.separator + 'imagen.png';
            instance5.nombre = 'imagen.png';
            instance5.save insert: true, flush: true, failOnError: true
        } catch (DuplicateKeyException duplicateExeption) {
            transactionStatus.setRollbackOnly()
            response.status = 422
            respond errors: [[message: "Registro duplicado"]]
            return
        } catch (SQLException sql) {
            transactionStatus.setRollbackOnly()
            response.status = 422
            respond errors: [[message: "Error en base de datos: " + sql.message]]
            return
        }
        ////


        respond instance1
    }


    def descargarArchivo(String id) {
        VerificacionIdentidad archivo = VerificacionIdentidad.findById(id as long)
        def ruta = Parametros.getValorByParametro('RUTA_BASE')
        def file = new File(ruta + archivo.ruta)
        byte[] fileContent = FileUtils.readFileToByteArray(file);
        response.setHeader("Content-disposition", "attachment; filename=" + archivo.nombre);
        response.contentType = archivo.contentType
        response.characterEncoding = "UTF-8"
        response.outputStream << fileContent
    }


    @Transactional
    def edit(Long id) {
        InformacionPerfil informacionPerfil = InformacionPerfil.findById(id)
        def instance = VerificacionIdentidad.findAllByUsuario(informacionPerfil.usuario)
        def ruta = Parametros.getValorByParametro('RUTA_BASE')
        def respuesta = []
        for (archivo in instance) {
            byte[] fileContent = FileUtils.readFileToByteArray(new File(ruta + archivo.ruta));
            String encodedString = Base64.getEncoder().encodeToString(fileContent);
            respuesta.push(
                    id: archivo.id,
                    usuario: archivo.usuario.descLabel,
                    categoria: archivo.categoria,
                    descripcion: archivo.descripcion,
                    fechaAlta: archivo.fechaAlta,
                    nombre: archivo.nombre,
                    autorizado: archivo.autorizado,
                    contentType: archivo.contentType,
                    ruta: archivo.ruta,
                    imagen: encodedString
            )
        }
        respond(respuesta)
    }
}
