import * as cheerio from 'cheerio';

import { crearNavegador } from './navegadorServicio.js';

import { extraerImagenes } from '../analizadores/analizadorImagen.js';

import { extraerLinks } from '../analizadores/analizadorLink.js';

import { extraerMeta } from '../analizadores/analizadorMeta.js';

import { detectorTecnologias } from '../analizadores/analizadorTecnologia.js';

import { obtenerMetricas } from '../analizadores/analizadorMetricas.js';

import { tomarScreenshot } from './screenshotServicio.js';

import { calcularSEOScore } from '../analizadores/analizadorSEO.js';

import { guardarAnalisis } from './historialServicio.js';

import crypto from 'crypto';

export async function analizarWebsite(url) {
  const inicio = Date.now();

  const browser = await crearNavegador(); // Abrimos Chromium.

  const page = await browser.newPage(); // Abrimos una pestaña.

  // Navegamos a la URL, networkidle2 espera a que la página termine de cargar.
  await page.goto(url, {
    waitUntil: 'networkidle2',
    timeout: 30000,
  });

  // Obtenemos el HTML renderizado por puppeteer, esto es importante para poder analizar el DOM completo.
  const html = await page.content();

  // Creamos una única instancia de Cheerio.
  const $ = cheerio.load(html);

  // Analizadores que utilizan Cheerio.

  const meta = extraerMeta($); // Obtenemos título, descripción, idioma.

  const images = extraerImagenes($); // Obtenemos todas las imágenes.

  const links = extraerLinks($); // Obtenermos todos los enlaces.

  const technologies = detectorTecnologias($); // Intentamos detectar frameworks, tecnologías.

  const metrics = obtenerMetricas($); // Obtenemos las métricas del DOM.

  const seoScore = calcularSEOScore($); // Calculamos el SEO Score.

  const screenshot = await tomarScreenshot(page, Date.now()); // Generamos los screenshots.

  const tiempoAnalisis = Date.now() - inicio;

  // Construímos el JSON final.
  const resultado = {
    id: crypto.randomUUID(),

    fecha: new Date().toISOString(),

    tiempoAnalisis,

    url,

    dominio: new URL(url).hostname,

    ...meta,

    images,

    links,

    technologies,

    metrics,

    seoScore,

    screenshot,
  };

  await browser.close(); // Cerramos el Chromium, es importante para poder liberar memoria.

  await guardarAnalisis(resultado);

  return resultado;
}
