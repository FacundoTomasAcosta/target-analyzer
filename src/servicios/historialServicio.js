import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// carpeta historial (queda fuera de src)
const HISTORIAL_DIR = path.join(__dirname, '../../historial');

async function crearCarpetaSiNoExiste() {
  try {
    await fs.access(HISTORIAL_DIR);
  } catch {
    await fs.mkdir(HISTORIAL_DIR, { recursive: true });
  }
}

function generarNombreArchivo(url) {
  const dominio = new URL(url).hostname.replace(/[^a-zA-Z0-9.-]/g, '');

  const ahora = new Date();

  const fecha =
    ahora.getFullYear() +
    '-' +
    String(ahora.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(ahora.getDate()).padStart(2, '0') +
    '_' +
    String(ahora.getHours()).padStart(2, '0') +
    '-' +
    String(ahora.getMinutes()).padStart(2, '0') +
    '-' +
    String(ahora.getSeconds()).padStart(2, '0');

  return `${fecha}_${dominio}.json`;
}

export async function guardarAnalisis(resultado) {
  await crearCarpetaSiNoExiste();

  const nombreArchivo = generarNombreArchivo(resultado.url);

  const ruta = path.join(HISTORIAL_DIR, nombreArchivo);

  await fs.writeFile(ruta, JSON.stringify(resultado, null, 2), 'utf8');

  return nombreArchivo;
}

export async function obtenerHistorial() {
  await crearCarpetaSiNoExiste();

  const archivos = await fs.readdir(HISTORIAL_DIR);

  const historial = [];

  for (const archivo of archivos) {
    if (!archivo.endsWith('.json')) continue;

    const ruta = path.join(HISTORIAL_DIR, archivo);

    const contenido = await fs.readFile(ruta, 'utf8');

    const analisis = JSON.parse(contenido);

    historial.push({
      id: analisis.id,

      archivo,

      fecha: analisis.fecha,

      url: analisis.url,

      dominio: analisis.dominio,

      title: analisis.title,

      seo: {
        score: analisis.seoScore.score,
        checks: analisis.seoScore.checks,
      },

      cantidadImagenes: analisis.images.length,

      cantidadLinks: analisis.links.length,

      tecnologias: analisis.technologies,
    });
  }

  historial.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  return historial;
}

export async function obtenerAnalisis(nombreArchivo) {
  const ruta = path.join(HISTORIAL_DIR, nombreArchivo);

  const contenido = await fs.readFile(ruta, 'utf8');

  return JSON.parse(contenido);
}

export async function eliminarAnalisis(nombreArchivo) {
  const ruta = path.join(HISTORIAL_DIR, nombreArchivo);

  await fs.unlink(ruta);
}

export async function eliminarHistorial() {
  await crearCarpetaSiNoExiste();

  const archivos = await fs.readdir(HISTORIAL_DIR);

  for (const archivo of archivos) {
    await fs.unlink(path.join(HISTORIAL_DIR, archivo));
  }
}
