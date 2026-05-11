# HT08 - Pagina web del modelo de trabajo

Este repositorio contiene una pagina web interactiva basada en el trabajo **HT08**, enfocado en la configuracion de seguridad web corporativa usando **FortiGate-VM** y funciones de **Next Generation Firewall (NGFW)**.

El proyecto explica, de forma visual y practica, como una organizacion puede controlar el trafico web, bloquear categorias no relacionadas con el trabajo y reforzar la seguridad de una red empresarial mediante politicas de filtrado web.

## Tema del trabajo

El caso parte de una empresa tecnologica que detecta baja productividad y riesgos de seguridad por el uso inadecuado de Internet durante el horario laboral. La solucion propuesta consiste en configurar FortiGate-VM para aplicar controles sobre el trafico HTTP/HTTPS, bloquear categorias como redes sociales, streaming, malware, juegos o sitios riesgosos, y administrar el acceso con politicas mas precisas.

La pagina transforma el contenido del documento HT08 en una experiencia web con secciones animadas, videos, graficos, simulaciones y una vista del PDF original.

## Contenidos principales

- **FortiGate Web Filtering:** explicacion del filtrado web corporativo y su importancia en entornos empresariales.
- **Modos de inspeccion:** comparacion entre inspeccion Flow-Based y Proxy-Based.
- **NGFW Policy-Based:** uso de politicas basadas en usuario, aplicacion, categoria web y accion.
- **Inspeccion SSL:** control del trafico cifrado HTTPS para mejorar la visibilidad y aplicar reglas de seguridad.
- **Perfil web corporativo:** bloqueo de categorias no deseadas y reduccion de riesgos.
- **Buenas practicas:** manejo de excepciones, revision de logs, reduccion de falsos positivos y mejora continua.
- **Reflexion final:** respuestas aplicadas sobre inspeccion, SSL, adaptacion a educacion o gobierno y redes virtualizadas.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Videos MP4 como recursos visuales
- PDF embebido del trabajo HT08
- Git LFS para almacenar archivos de video grandes

## Estructura del proyecto

```text
.
|-- index.html      # Pagina principal del trabajo HT08
|-- styles.css      # Estilos, animaciones y diseno visual
|-- script.js       # Interactividad, graficos y efectos
|-- HT08.pdf        # Documento original del trabajo
|-- *.mp4           # Videos usados como fondos y recursos visuales
|-- .gitattributes  # Configuracion de Git LFS para videos
`-- README.md       # Descripcion del proyecto
```

## Como ver el proyecto

Abre el archivo `index.html` en un navegador web moderno. La pagina carga el contenido principal del trabajo, los recursos multimedia y una vista previa del PDF `HT08.pdf`.

## Objetivo

Presentar el trabajo HT08 de una manera mas dinamica, clara y visual, mostrando como FortiGate-VM puede ayudar a proteger una red corporativa mediante filtrado web, inspeccion de trafico, politicas NGFW y buenas practicas de administracion de seguridad.
