import { crearNavegador } from './navegadorServicio.js';

import { extraerImagenes } from '../analizadores/analizadorImagen.js';

import { extraerLinks } from '../analizadores/analizadorLink.js';

import { extraerMeta } from '../analizadores/analizadorMeta.js';

import { detectorTecnologias } from '../analizadores/analizadorTecnologia.js';

import { obtenerMetricas } from '../analizadores/analizadorMetricas.js';

import { tomarScreenshot } from './screenshotServicio.js';

export async function analizarWebsite(url) {
  const browser = await crearNavegador(); // Abrimos Chromium.

  const page = await browser.newPage(); // Abrimos una pestaña.

  // Navegamos a la URL, networkidle2 espera a que la página termine de cargar.
  await page.goto(url, {
    waitUntil: 'networkidle2',
    timeout: 30000,
  });

  const meta = await extraerMeta(page); // Obtenemos título, descripción, idioma.

  const images = await extraerImagenes(page); // Obtenemos todas las imágenes.

  const links = await extraerLinks(page); // Obtenermos todos los enlaces.

  const technologies = await detectorTecnologias(page); // Intentamos detectar frameworks, tecnologías.

  const metrics = await obtenerMetricas(page); // Obtenemos las métricas del DOM.

  const screenshot = await tomarScreenshot(page, Date.now()); // Generamos los screenshots.

  await browser.close(); // Cerramos el Chromium, es importante para poder liberar memoria.

  // Construímos el JSON final.
  return {
    url,

    ...meta,

    images,

    links,

    technologies,

    metrics,

    screenshot,
  };
}
