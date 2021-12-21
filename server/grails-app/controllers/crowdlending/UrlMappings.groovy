package crowdlending

class UrlMappings {

    static mappings = {
        delete "/$controller/$id(.$format)?"(action: "delete")
        get "/$controller(.$format)?"(action: "index")
        get "/$controller/$id(.$format)?"(action: "show")
        post "/$controller(.$format)?"(action: "save")
        put "/$controller/$id(.$format)?"(action: "update")
        patch "/$controller/$id(.$format)?"(action: "patch")

        "/preusuario/$action?/$id?"(controller: 'preRegistro')
        "/proceso_solicitud_cuenta/recuperar?/$id?"(controller: 'preRegistro', action: "reqRecoverAccount")
        "/proceso_solicitud_cuenta/procesar/$id"(controller: 'preRegistro', action: "activateAccount")
        "/$controller/$action?/$id?" { constraints {} }

        "/"(controller: 'application', action:'index')
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
