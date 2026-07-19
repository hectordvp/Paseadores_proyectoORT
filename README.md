# Rutas Felices 🐾

Rutas Felices es una aplicación web desarrollada con HTML, CSS y JavaScript puro que permite gestionar la contratación de paseadores de perros. El sistema cuenta con dos tipos de usuarios (clientes y paseadores) y aplica distintas reglas de negocio para administrar las solicitudes, los cupos disponibles y las características de las mascotas.

Este proyecto fue desarrollado como parte del primer semestre de Programación y me permitió aplicar conceptos fundamentales de programación orientada a objetos, manipulación del DOM y lógica de negocio utilizando únicamente JavaScript vanilla.

---

## ¿Qué es este proyecto?

Rutas Felices es un sistema de gestión de paseadores de perros que permite:

* Registro de nuevos clientes.
* Inicio de sesión para clientes y paseadores.
* Contratación de paseadores disponibles.
* Gestión de solicitudes pendientes.
* Aprobación o rechazo de contrataciones.
* Cancelación de solicitudes por parte del cliente.
* Control de cupos disponibles para cada paseador.
* Restricciones según el tamaño de los perros.
* Visualización del resumen de perros asignados a cada paseador.

El proyecto fue desarrollado como una Single Page Application (SPA) sencilla, utilizando manipulación del DOM para mostrar y ocultar las diferentes pantallas del sistema sin necesidad de recargar la página.

---

## Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript ES6 (Vanilla JavaScript)
* Programación Orientada a Objetos (POO)
* Manipulación del DOM
* Formularios y validaciones
* Git y GitHub

---

## Funcionalidades implementadas

### Clientes

* Registro de nuevos usuarios.
* Validación de campos obligatorios.
* Validación de contraseñas seguras.
* Inicio de sesión.
* Contratación de paseadores.
* Visualización del estado de las contrataciones.
* Cancelación de solicitudes pendientes.

### Paseadores

* Inicio de sesión.
* Visualización de solicitudes pendientes.
* Aprobación o rechazo de contratos.
* Consulta del resumen de perros asignados.
* Visualización de los cupos ocupados y disponibles.

---

## Reglas de negocio implementadas

El sistema incluye distintas reglas de negocio que fueron implementadas utilizando lógica de programación:

* Los perros pueden ser:

  * Chico (1 cupo)
  * Mediano (2 cupos)
  * Grande (4 cupos)

* Cada paseador posee una cantidad máxima de cupos disponibles.

* Un cliente no puede tener más de una solicitud pendiente al mismo tiempo.

* Los paseadores solo aparecen como disponibles si cuentan con los cupos necesarios para el perro del cliente.

* Los perros grandes y pequeños no pueden ser asignados al mismo paseador si la combinación no es compatible según las reglas establecidas.

* Las contrataciones pueden encontrarse en diferentes estados:

  * Pendiente
  * Aprobado
  * Cancelado

---

## Conceptos de programación aplicados

Durante el desarrollo del proyecto se trabajó con:

* Clases y objetos.
* Constructores.
* Arrays de objetos.
* Métodos personalizados.
* Condicionales.
* Bucles `for...of`.
* Validaciones de formularios.
* Manipulación dinámica del HTML.
* Eventos del DOM.
* Organización del código en funciones.
* Lógica de negocio aplicada.
* Uso de múltiples pantallas dentro de una misma aplicación web.

---

## Estructura del proyecto

```text
Rutas-Felices/

│
├── index.html
├── paseadores.js
│
├── assets/
│   ├── css/
│   │   └── estilo.css
│   │
│   └── img/
│       └── imagenes del proyecto
│
└── README.md
```

---

## ¿Cómo ejecutar el proyecto?

1. Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
```

2. Abrir la carpeta del proyecto.

3. Ejecutar el archivo:

```text
index.html
```

No es necesario instalar dependencias ni utilizar ningún framework.

---

## Capturas de pantalla


```markdown
![Login](/assets/img/login.png)

![Registro-Cliente](/assets/img/registro.png)

![Menu-Cliente](/assets/img/menuCliente.png)

![Contrataciones-Cliente](/assets/img/contratacionPaseador.png)

![Mis-Contratos-Cliente](/assets/img/misContratos.png)

![Contrato-Pendiente-Paseador](/assets/img/contratoPendiente.png)

![Resumen-Paseador](/assets/img/resumen.png)








```

---

## Lo que aprendí con este proyecto

Este proyecto me permitió reforzar conceptos fundamentales de programación, tales como:

* Programación orientada a objetos en JavaScript.
* Manipulación del DOM.
* Validaciones de formularios.
* Diseño de interfaces web con HTML y CSS.
* Gestión de estados dentro de una aplicación.
* Aplicación de reglas de negocio utilizando lógica de programación.
* Organización y estructuración de un proyecto web.

Además, fue mi primer proyecto completo en el que pude integrar diferentes conceptos vistos durante el primer semestre de la carrera.

---

## Autor

**Héctor Pereyra**

Estudiante de Analista en Tecnologias de la Informacion, apasionado por seguir aprendiendo y construyendo nuevos proyectos.
