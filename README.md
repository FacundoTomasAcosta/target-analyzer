# Target Analyzer API

API REST desarrollada con Node.js, Express, Puppeteer y Cheerio para analizar sitios web de forma automatizada.

La aplicación recibe una URL, accede al sitio web, obtiene su contenido renderizado y genera un informe estructurado con información relevante sobre la página.

---

# Objetivos del Proyecto

El objetivo principal es desarrollar una herramienta capaz de:

- Analizar sitios web automáticamente.
- Obtener información estructurada de una página.
- Detectar tecnologías utilizadas.
- Realizar auditorías SEO básicas.
- Generar capturas visuales del sitio.
- Proporcionar una API consumible por aplicaciones frontend.
- Guardar en un historial la información de las URL visitadas.

---

# Tecnologías Utilizadas

## Node.js

Entorno de ejecución utilizado para ejecutar JavaScript del lado del servidor.

## Express.js

Framework utilizado para la creación del servidor y la API REST.

Permite:

- Definir rutas HTTP.
- Procesar solicitudes.
- Enviar respuestas JSON.
- Centralizar el manejo de errores.

## Puppeteer

Biblioteca utilizada para controlar una instancia de Chromium.

Se utiliza para:

- Navegar sitios web.
- Esperar la carga completa de páginas.
- Obtener HTML renderizado.
- Generar screenshots.
- Analizar aplicaciones SPA (React, Angular, Vue, etc.).

## Cheerio

Biblioteca utilizada para analizar HTML mediante selectores CSS.

Se utiliza para:

- Extraer imágenes.
- Extraer enlaces.
- Obtener metadatos.
- Detectar tecnologías.
- Calcular métricas.
- Analizar elementos SEO.

---

# ¿Qué es el Scraper?

Un scraper es una herramienta capaz de acceder automáticamente a un sitio web y extraer información de él.

En este proyecto el scraper:

1. Recibe una URL.
2. Navega hacia la página.
3. Obtiene el HTML renderizado.
4. Analiza su contenido.
5. Genera métricas e información estructurada.
6. Guarda la información en un historial.
7. Devuelve los resultados en formato JSON.

---

# Flujo General del Sistema

```text
Cliente
   │
   ▼
Express
   │
   ▼
Ruta
   │
   ▼
Controlador
   │
   ▼
Servicio Principal
   │
   ▼
Puppeteer
   │
   ▼
HTML Renderizado
   │
   ▼
Cheerio
   │
   ▼
Analizadores
   │
   ▼
Respuesta JSON


```

## Flujo Detallado

1. El usuario envía una URL.
2. Express recibe la petición.
3. La ruta correspondiente redirige la solicitud al controlador.
4. El controlador valida la información recibida.
5. El servicio principal inicia Chromium mediante Puppeteer.
6. Se navega hacia la URL solicitada.
7. Se obtiene el HTML renderizado.
8. Cheerio procesa el documento HTML.
9. Los analizadores extraen información específica.
10. Se genera un screenshot.
11. Se construye la respuesta final.
12. Se guarda en el historial.
13. El controlador devuelve el resultado al cliente.

---

# Estructura del Proyecto

```text
src/
│
├── analizadores/
│   ├── analizadorImagen.js
│   ├── analizadorLink.js
│   ├── analizadorMeta.js
│   ├── analizadorMetricas.js
│   ├── analizadorSEO.js
│   └── analizadorTecnologia.js
│
├── controladores/
│   └── analizadorControlador.js
│   └── historialControlador.js
│
├── rutas/
│   └── analizadorRutas.js
│   └── historialRuta.js
│
├── servicios/
│   ├── analizadorServicio.js
│   ├── historialServicio.js
│   ├── navegadorServicio.js
│   └── screenshotServicio.js
│
├── utilidades/
│   ├── codigoErrores.js
│   └── manejoErrores.js
│
├── app.js
└── server.js
screenshots/
historial/
```

---

# Organización por Carpetas

La aplicación sigue una arquitectura modular basada en la separación de responsabilidades.

## Analizadores

Contienen la lógica encargada de extraer información específica del sitio web.

### analizadorMeta.js

Obtiene:

- Título
- Descripción
- Idioma

### analizadorImagen.js

Obtiene:

- URL de imágenes
- Texto alternativo (alt)

### analizadorLink.js

Obtiene:

- Enlaces internos
- Enlaces externos
- Targets

### analizadorTecnologia.js

Detecta tecnologías utilizadas por la página.

Ejemplos:

- React
- Angular
- Vue
- Bootstrap
- Tailwind
- jQuery

### analizadorMetricas.js

Calcula métricas generales:

- Cantidad de imágenes
- Cantidad de enlaces
- Cantidad de scripts
- Cantidad de formularios

### analizadorSEO.js

Calcula la puntuación SEO del sitio.

El sistema genera una puntuación entre 0 y 100 puntos.

## Criterios Evaluados

| Criterio         | Puntaje |
| ---------------- | ------: |
| Title            |      15 |
| Meta Description |      15 |
| H1               |      15 |
| Language (lang)  |      10 |
| Viewport         |      10 |
| Favicon          |       5 |
| Canonical        |      10 |
| Robots           |      10 |
| Imágenes con alt |      10 |
| Total            |     100 |

---

## Ejemplo

```json
{
  "seo": {
    "score": 80,
    "checks": {
      "title": true,
      "description": true,
      "h1": true,
      "language": true,
      "viewport": true,
      "favicon": true,
      "canonical": false,
      "robots": false,
      "imageAlt": true
    }
  }
}
```

---

## Interpretación

| Puntaje  | Evaluación |
| -------- | ---------- |
| 90 - 100 | Excelente  |
| 70 - 89  | Bueno      |
| 50 - 69  | Mejorable  |
| 0 - 49   | Deficiente |

---

## Controladores

Actúan como intermediarios entre las rutas y los servicios.

Responsabilidades:

- Recibir solicitudes HTTP.
- Validar información.
- Invocar servicios.
- Enviar respuestas.

---

## Servicios

Contienen la lógica principal.

### navegadorServicio.js

Inicializa Chromium mediante Puppeteer.

### screenshotServicio.js

Genera capturas de pantalla del sitio analizado.

### analizadorServicio.js

Coordina todo el proceso de análisis.

### historialServicio.js

Se encarga de guardar la información de las URL visitadas.

---

## Rutas

Definen los endpoints de la API.

Ejemplo:

```http
POST /analizar
```

---

## Utilidades

Contienen funciones auxiliares reutilizables.

### codigoErrores.js

Centraliza códigos HTTP utilizados por la aplicación.

### manejoErrores.js

Gestiona excepciones y respuestas de error.

---

# ¿Por qué utilizamos ES Modules?

El proyecto utiliza ES Modules mediante:

```json
{
  "type": "module"
}
```

Esto permite utilizar:

```javascript
import express from 'express';
```

en lugar de:

```javascript
const express = require('express');
```

## Ventajas

- Es el estándar oficial de JavaScript.
- Es utilizado por la mayoría de frameworks modernos.
- Mejora la legibilidad del código.
- Facilita la modularización.
- Favorece la escalabilidad.
- Permite una mejor integración con herramientas modernas.
- Permite importar únicamente los elementos necesarios.

---

# ¿Por qué no utilizamos CommonJS?

CommonJS fue el sistema tradicional de módulos en Node.js.

Aunque sigue siendo compatible, ES Modules es actualmente el estándar recomendado.

La utilización de ES Modules permite mantener el proyecto alineado con las prácticas modernas del ecosistema JavaScript.

---

# Servicio de Screenshots

## Objetivo

Además del análisis textual, la API genera una captura visual del sitio web.

Esto permite:

- Verificar visualmente el contenido.
- Obtener evidencia gráfica del análisis.
- Complementar los resultados obtenidos.

---

## Funcionamiento

Una vez cargada la página:

1. Se verifica la existencia de la carpeta `screenshots`.
2. Si no existe, se crea automáticamente.
3. Se genera un nombre único mediante timestamp.
4. Puppeteer captura la página completa.
5. La imagen se almacena en la carpeta correspondiente.
6. La ruta se devuelve en la respuesta.

---

## Flujo

```text
Página cargada
       │
       ▼
Verificar carpeta screenshots
       │
       ▼
¿Existe?
   │
   ├── Sí
   │
   └── No → Crear carpeta
       │
       ▼
Generar nombre único
       │
       ▼
Capturar página
       │
       ▼
Guardar imagen
       │
       ▼
Devolver ruta
```

---

# Escalabilidad

La aplicación fue diseñada siguiendo el principio de responsabilidad única (SRP).

Cada módulo tiene una función específica:

- Las rutas reciben solicitudes.
- Los controladores gestionan peticiones.
- Los servicios contienen lógica de negocio.
- Los analizadores realizan tareas especializadas.

## Beneficios

- Fácil mantenimiento.
- Mayor reutilización.
- Menor acoplamiento.
- Trabajo colaborativo más sencillo.
- Incorporación rápida de nuevas funcionalidades.

Por ejemplo, para agregar un nuevo análisis:

```text
analizadorAccesibilidad.js
```

solo sería necesario integrarlo dentro de `analizadorServicio.js` sin modificar el resto de la aplicación.

---

# Conclusión

Target Analyzer implementa una arquitectura modular basada en Node.js, Express, Puppeteer y Cheerio para realizar análisis automatizados de sitios web.

La separación de responsabilidades, el uso de ES Modules y la combinación de Puppeteer con Cheerio permiten construir una aplicación escalable, mantenible y preparada para futuras ampliaciones.
