let usuarioConectado = null

class Sistema {
    listaPaseadores = []
    listaClientes = []
    listaContratos = []

    verificarTipoUsuario(nombreUsuario) {
        let usuarioLower = nombreUsuario.toLowerCase();
        for (let unCliente of this.listaClientes) {
            if (unCliente.usuario.toLowerCase() === usuarioLower) return "cliente";
        }
        for (let unPaseador of this.listaPaseadores) {
            if (unPaseador.usuario.toLowerCase() === usuarioLower) return "paseador";
        }
        return "desconocido";
    }

    devolverPassCliente(unUsuario) {
        let usuarioLower = unUsuario.toLowerCase();
        for (let unCliente of this.listaClientes) {
            if (unCliente.usuario.toLowerCase() === usuarioLower) return unCliente.pass;
        }
        return null;
    }

    devolverPassPaseador(unUsuario) {
        let usuarioLower = unUsuario.toLowerCase();
        for (let unPaseador of this.listaPaseadores) {
            if (unPaseador.usuario.toLowerCase() === usuarioLower) return unPaseador.pass;
        }
        return null;
    }

    devolverIdCliente(nombreUsuario) {
        for (let unC of this.listaClientes) {
            if (unC.usuario == nombreUsuario) return unC.id
        }
    }

    devolverIdPaseador(nombreUsuario) {
        for (let unP of this.listaPaseadores) {
            if (unP.usuario == nombreUsuario) return unP.id
        }
    }

    existeContrato(idCliente) {
        for (let unC of this.listaContratos) {
            if (unC.idCliente == idCliente && (unC.estado == "pendiente")) {
                return true
            }
        }
        return false
    }

    devolverCupos(idCliente) {
        for (let unC of this.listaClientes) {
            if (unC.id == idCliente) {
                if (unC.tipo == "chico") return 1;
                else if (unC.tipo == "mediano") return 2;
                else if (unC.tipo == "grande") return 4;
            }
        }
    }

    obtenerPaseadoresDisponibles(idCliente) {
        let paseadoresDisponibles = [];
        let cliente = this.devolverCliente(idCliente);
        if (!cliente) return paseadoresDisponibles;

        let tipoPerroCliente = cliente.tipo;
        let cupoNecesario = this.devolverCupos(idCliente);

        for (let paseador of this.listaPaseadores) {
            let cupoDisponible = paseador.cuposDisponible;
            if (cupoDisponible < cupoNecesario) continue;

            let tienePerrosChicos = false;
            let tienePerrosGrandes = false;

            for (let contrato of this.listaContratos) {
                if (contrato.idPaseador === paseador.id && contrato.estado === "aprobado") {
                    let clienteAsignado = this.devolverCliente(contrato.idCliente);
                    if (clienteAsignado.tipo === "chico") tienePerrosChicos = true;
                    if (clienteAsignado.tipo === "grande") tienePerrosGrandes = true;
                }
            }

            if (
                (tipoPerroCliente === "chico" && tienePerrosGrandes) ||
                (tipoPerroCliente === "grande" && tienePerrosChicos)
            ) continue;

            paseadoresDisponibles.push(paseador);
        }
        return paseadoresDisponibles;
    }

    devolverCliente(id) {
        for (let unC of this.listaClientes) {
            if (unC.id == id) return unC
        }
    }

    devolverPaseador(id) {
        for (let unP of this.listaPaseadores) {
            if (unP.id == id) return unP
        }
    }

    existeUsuarioCliente(nombreUsuario) {
        let usuarioLower = nombreUsuario.toLowerCase();
        for (let unCliente of this.listaClientes) {
            if (unCliente.usuario.toLowerCase() === usuarioLower) return true;
        }
        return false;
    }

    esPasswordValida(pass) {
        return (
            pass.length >= 5 &&
            /[a-z]/.test(pass) &&
            /[A-Z]/.test(pass) &&
            /[0-9]/.test(pass)
        );
    }

    devolverNombreCliente(nombreUsuario) {
        for (let unC of this.listaClientes) {
            if (unC.usuario == nombreUsuario) return unC.nombreCliente
        }
    }

    devolverNombrePaseador(nombreUsuario) {
        for (let unP of this.listaPaseadores) {
            if (unP.usuario == nombreUsuario) return unP.nombre
        }
    }
}

let miSistema = new Sistema()
let contadorClientes = 1

class Cliente {
    constructor(nombreCliente, usuario, pass, nombreperro, tipo) {
        this.id = contadorClientes++;
        this.nombreCliente = nombreCliente
        this.usuario = usuario
        this.pass = pass
        this.nombreperro = nombreperro
        this.tipo = tipo
    }
}

let contadorPaseadores = 1

class Paseador {
    constructor(usuario, pass, nombre, cuposDisponible) {
        this.id = contadorPaseadores++
        this.usuario = usuario
        this.pass = pass
        this.nombre = nombre
        this.cuposMaximos = cuposDisponible  // ✅ guardamos el total original
        this.cuposDisponible = cuposDisponible
    }
}

// PRECARGA — contraseñas actualizadas para cumplir la validación
let c1 = new Cliente("Martina", "Martu", "Martu25", "Juanita", "chico")
let c2 = new Cliente("Jose", "Jose1", "Jose25", "Moli", "mediano")
let c3 = new Cliente("Hector", "Hector", "Hector17", "Rufian", "grande")
miSistema.listaClientes.push(c1, c2, c3)

let p1 = new Paseador("Jorge", "Jorge25", "Jorge", 10)
let p2 = new Paseador("Cuqui", "Cuqui123", "Carla", 12)
let p3 = new Paseador("Quito", "Tantan2008", "Rodolfo", 11)
let p4 = new Paseador("Tuli", "Miperrito1", "Sofia", 10)
let p5 = new Paseador("Gerardo", "Ger17ardo", "Gerardo", 15)
miSistema.listaPaseadores.push(p1, p2, p3, p4, p5)

let contadorContrato = 1
class Contrato {
    constructor(idCliente, idPaseador) {
        this.idContrato = contadorContrato++
        this.idCliente = idCliente
        this.idPaseador = idPaseador
        this.estado = "pendiente"
    }
}

// ======================= INICIO =======================
inicio()
function inicio() {
    ocultarTodo()
    document.querySelector("#login").style.display = "block"
    document.querySelector("#btningresar").addEventListener("click", hacerLogin)
    document.querySelector("#cerrarSesionCliente").addEventListener("click", cerrarSesion)
    document.querySelector("#cerrarSesionPaseador").addEventListener("click", cerrarSesion)
    document.querySelector("#btnRegistroCliente").addEventListener("click", mostrarPantallaRegistroCliente)
    document.querySelector("#btnRegistro").addEventListener("click", registrarCliente)
    document.querySelector("#btnContratarPaseador").addEventListener("click", previahacercontratacion)
    document.querySelector("#cerrarsesionregistro").addEventListener("click", cerrarSesion)
    document.querySelector("#btnvercontratos").addEventListener("click", previaVerContratos)
    document.querySelector("#btnVerMisContrataciones").addEventListener("click", verMisContrataciones)
    document.querySelector("#btnResumenAsignados").addEventListener("click", mostrarResumenAsignados)

    document.querySelector("#volverMisContrataciones").addEventListener("click", function () {
        document.querySelector("#pantallaMisContrataciones").style.display = "none"
        document.querySelector("#perfilCliente").style.display = "block"
    })
    document.querySelector("#volverContratosPendientes").addEventListener("click", function () {
        document.querySelector("#pantallaAprobarContratos").style.display = "none"
        document.querySelector("#perfilPaseador").style.display = "block"
    })
    document.querySelector("#volverDesdeResumen").addEventListener("click", function () {
        document.querySelector("#pantallaResumenAsignados").style.display = "none"
        document.querySelector("#perfilPaseador").style.display = "block"
    })
    document.querySelector("#volverpantallacliente").addEventListener("click", function () {
        document.querySelector("#pantallaContratarPaseador").style.display = "none"
        document.querySelector("#perfilCliente").style.display = "block"
    })
}

function ocultarTodo() {
    document.querySelector("#login").style.display = "none"
    document.querySelector("#perfilCliente").style.display = "none"
    document.querySelector("#perfilPaseador").style.display = "none"
    document.querySelector("#registrarse").style.display = "none"
    document.querySelector("#pantallaContratarPaseador").style.display = "none"
    document.querySelector("#pantallaAprobarContratos").style.display = "none"
    document.querySelector("#pantallaMisContrataciones").style.display = "none"
    document.querySelector("#pantallaResumenAsignados").style.display = "none"
}

// ======================= LOGIN =======================
function hacerLogin() {
    let usuario = document.querySelector("#txtUsuario").value
    let pass = document.querySelector("#txtPass").value
    let tipoUsuario = miSistema.verificarTipoUsuario(usuario)

    if (tipoUsuario === "cliente") {
        if (miSistema.devolverPassCliente(usuario) === pass) {
            ocultarTodo()
            usuarioConectado = usuario
            let nombre = miSistema.devolverNombreCliente(usuario)
            document.querySelector("#bienvenidaCliente").innerHTML = `¡Bienvenido, ${nombre}! 🐾`
            document.querySelector("#perfilCliente").style.display = "block"
        } else {
            mostrarMensaje("msgLogin", "Usuario o contraseña incorrectos.", "error")
        }
    } else if (tipoUsuario === "paseador") {
        if (miSistema.devolverPassPaseador(usuario) === pass) {
            ocultarTodo()
            usuarioConectado = usuario
            let nombre = miSistema.devolverNombrePaseador(usuario)
            document.querySelector("#bienvenidaPaseador").innerHTML = `¡Bienvenido, ${nombre}! 🐾`
            document.querySelector("#perfilPaseador").style.display = "block"
        } else {
            mostrarMensaje("msgLogin", "Usuario o contraseña incorrectos.", "error")
        }
    } else {
        mostrarMensaje("msgLogin", "Usuario o contraseña incorrectos.", "error")
    }
}

// ======================= CERRAR SESION =======================
function cerrarSesion() {
    ocultarTodo()
    document.querySelector("#txtUsuario").value = ""
    document.querySelector("#txtPass").value = ""
    document.querySelector("#txtregistronombre").value = ""
    document.querySelector("#txtregistrousuario").value = ""
    document.querySelector("#txtRegistroPass").value = ""
    document.querySelector("#txtregistrperro").value = ""
    document.querySelector("#slctamaño").value = "zzz"
    document.querySelector("#msgLogin").innerHTML = ""
    document.querySelector("#login").style.display = "block"
    usuarioConectado = null
}

// ======================= REGISTRO =======================
function mostrarPantallaRegistroCliente() {
    ocultarTodo()
    document.querySelector("#registrarse").style.display = "block"
}

function registrarCliente() {
    let nombreCliente = document.querySelector("#txtregistronombre").value
    let usuario = document.querySelector("#txtregistrousuario").value
    let pass = document.querySelector("#txtRegistroPass").value
    let nombreperro = document.querySelector("#txtregistrperro").value
    let tamaño = document.querySelector("#slctamaño").value

    if (nombreCliente !== "" && usuario !== "" && pass !== "" && nombreperro !== "" && tamaño !== "zzz") {
        if (miSistema.existeUsuarioCliente(usuario)) {
            alert("Ese nombre de usuario ya existe. Probá con otro.")
            return
        }
        if (!miSistema.esPasswordValida(pass)) {
            alert("La contraseña debe tener al menos 5 caracteres, una mayúscula, una minúscula y un número.")
            return
        }
        let nuevoCliente = new Cliente(nombreCliente, usuario, pass, nombreperro, tamaño)
        miSistema.listaClientes.push(nuevoCliente)
        mostrarMensaje("msgRegistro", "¡Registro exitoso! Ahora podés iniciar sesión.", "exito")
        setTimeout(function () {
            ocultarTodo()
            document.querySelector("#login").style.display = "block"
        }, 2000)
    } else {
        alert("Todos los campos deben estar completos.")
    }
}

// ======================= CONTRATAR PASEADOR =======================
function previahacercontratacion() {
    ocultarTodo()
    let idCliente = miSistema.devolverIdCliente(usuarioConectado)
    if (!miSistema.existeContrato(idCliente)) {
        mostrarTabla()
    } else {
        mostrarMensaje("msgCliente", "Ya tenés una solicitud pendiente.", "error")
        document.querySelector("#perfilCliente").style.display = "block"
    }
}

function mostrarTabla() {
    document.querySelector("#pantallaContratarPaseador").style.display = "block"
    let idCliente = miSistema.devolverIdCliente(usuarioConectado)
    let paseadoresFiltrados = miSistema.obtenerPaseadoresDisponibles(idCliente)

    let miTabla = `<table border=1>
        <tr>
            <td>ID</td>
            <td>Nombre</td>
            <td>Cupos disponibles</td>
            <td></td>
        </tr>`

    for (let unP of paseadoresFiltrados) {
        miTabla += `<tr>
            <td>${unP.id}</td>
            <td>${unP.nombre}</td>
            <td>${unP.cuposDisponible}</td>
            <td><input type="button" value="Contratar" onclick="contratarPaseador(${unP.id})"></td>
        </tr>`
    }

    miTabla += `</table>`
    document.querySelector("#mostrarTabla").innerHTML = miTabla
}

function contratarPaseador(idPaseador) {
    let idCliente = miSistema.devolverIdCliente(usuarioConectado)
    let contratito = new Contrato(idCliente, idPaseador)
    miSistema.listaContratos.push(contratito)
    ocultarTodo()
    document.querySelector("#perfilCliente").style.display = "block"
    mostrarMensaje("msgCliente", "¡Solicitud enviada!🐶", "exito")
}

// ======================= VER MIS CONTRATACIONES =======================
function verMisContrataciones() {
    ocultarTodo()
    document.querySelector("#pantallaMisContrataciones").style.display = "block"
    let idCliente = miSistema.devolverIdCliente(usuarioConectado)

    let miTabla = `<table border=1>
        <tr>
            <td>ID Contrato</td>
            <td>Paseador</td>
            <td>Estado</td>
            <td>Acción</td>
        </tr>`

    for (let unC of miSistema.listaContratos) {
        if (unC.idCliente == idCliente) {
            let paseador = miSistema.devolverPaseador(unC.idPaseador)
            let botonCancelar = ""
            if (unC.estado === "pendiente") {
                botonCancelar = `<input type="button" value="Cancelar" onclick="cancelarContrato(${unC.idContrato})">`
            }
            miTabla += `<tr>
                <td>${unC.idContrato}</td>
                <td>${paseador.nombre}</td>
                <td>${unC.estado}</td>
                <td>${botonCancelar}</td>
            </tr>`
        }
    }

    miTabla += `</table>`
    document.querySelector("#tablaMisContrataciones").innerHTML = miTabla
}

function cancelarContrato(idContrato) {
    for (let unC of miSistema.listaContratos) {
        if (unC.idContrato == idContrato) {
            unC.estado = "cancelado"
            break
        }
    }
    verMisContrataciones()
}

// ======================= CONTRATOS PASEADOR =======================
function previaVerContratos() {
    ocultarTodo()
    document.querySelector("#pantallaAprobarContratos").style.display = "block"
    cargarTablaPendientesPaseador()
}

function cargarTablaPendientesPaseador() {
    let idPaseador = miSistema.devolverIdPaseador(usuarioConectado)

    let miTabla = `<table border=1>
        <tr>
            <td>ID Contrato</td>
            <td>Nombre Cliente</td>
            <td>Nombre Perro</td>
            <td>Tamaño</td>
            <td>Acción</td>
        </tr>`

    for (let unC of miSistema.listaContratos) {
        if (unC.idPaseador == idPaseador && unC.estado === "pendiente") {
            let cliente = miSistema.devolverCliente(unC.idCliente)
            miTabla += `<tr>
                <td>${unC.idContrato}</td>
                <td>${cliente.nombreCliente}</td>
                <td>${cliente.nombreperro}</td>
                <td>${cliente.tipo}</td>
                <td>
                    <input type="button" value="Aprobar" onclick="aprobarContrato(${unC.idContrato})">
                    <input type="button" value="Rechazar" onclick="rechazarContrato(${unC.idContrato})">
                </td>
            </tr>`
        }
    }

    miTabla += `</table>`
    document.querySelector("#tablaContratosPendientes").innerHTML = miTabla
}

function aprobarContrato(idContrato) {
    let contratoAprobado = null

    for (let unC of miSistema.listaContratos) {
        if (unC.idContrato == idContrato) {
            contratoAprobado = unC
            break
        }
    }

    if (contratoAprobado !== null) {
        let cliente = miSistema.devolverCliente(contratoAprobado.idCliente)
        let paseador = miSistema.devolverPaseador(contratoAprobado.idPaseador)
        let cuposNecesarios = miSistema.devolverCupos(cliente.id)

        if (paseador.cuposDisponible >= cuposNecesarios) {
            paseador.cuposDisponible -= cuposNecesarios
            contratoAprobado.estado = "aprobado"
            mostrarMensaje("msgContratos", "✅ Contrato aprobado correctamente.", "exito")
        } else {
            contratoAprobado.estado = "cancelado"
            mostrarMensaje("msgContratos", "❌ Sin cupos suficientes. Contrato cancelado.", "error")
        }
    }

    cargarTablaPendientesPaseador()
}

function rechazarContrato(idContrato) {
    for (let unC of miSistema.listaContratos) {
        if (unC.idContrato == idContrato) {
            unC.estado = "cancelado"
            break
        }
    }
    mostrarMensaje("msgContratos", "Contrato rechazado.", "error")
    cargarTablaPendientesPaseador()
}

// ======================= RESUMEN PASEADOR =======================
function mostrarResumenAsignados() {
    ocultarTodo()
    document.querySelector("#pantallaResumenAsignados").style.display = "block"

    let idPaseador = miSistema.devolverIdPaseador(usuarioConectado)
    let paseador = miSistema.devolverPaseador(idPaseador)
    let cupoMaximo = paseador.cuposMaximos
    let cuposOcupados = 0

    let miTabla = `<table border=1>
        <tr>
            <th>ID Contrato</th>
            <th>Cliente</th>
            <th>Nombre del Perro</th>
            <th>Tamaño</th>
            <th>Cupo Ocupado</th>
        </tr>`

    for (let contrato of miSistema.listaContratos) {
        if (contrato.idPaseador === idPaseador && contrato.estado === "aprobado") {
            let cliente = miSistema.devolverCliente(contrato.idCliente)
            let cupo = miSistema.devolverCupos(cliente.id)
            cuposOcupados += cupo

            miTabla += `<tr>
                <td>${contrato.idContrato}</td>
                <td>${cliente.nombreCliente}</td>
                <td>${cliente.nombreperro}</td>
                <td>${cliente.tipo}</td>
                <td>${cupo}</td>
            </tr>`
        }
    }

    miTabla += `</table>`

    let cuposDisponibles = cupoMaximo - cuposOcupados
    if (cuposDisponibles < 0) cuposDisponibles = 0

    document.querySelector("#tablaPerrosAsignados").innerHTML = miTabla
    document.querySelector("#saldoPaseador").innerHTML = `
        Cupos ocupados: ${cuposOcupados} / ${cupoMaximo}<br>
        Cupos disponibles: ${cuposDisponibles}`
}

// ======================= UTILIDAD: MENSAJES VISUALES =======================
function mostrarMensaje(idElemento, texto, tipo) {
    let elemento = document.querySelector("#" + idElemento)
    elemento.innerHTML = texto
    elemento.className = tipo === "exito" ? "mensaje exito" : "mensaje error"
    setTimeout(function () {
        elemento.innerHTML = ""
        elemento.className = "mensaje"
    }, 3000)
}