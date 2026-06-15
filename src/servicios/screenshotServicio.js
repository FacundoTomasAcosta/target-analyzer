// Importamos los módulos fs y path.
// File System nos sirve para interactuar con el sistema de archivos del servidor o de la computadora local, ya que vamos a estar guardando los archivos de los screenshots.
// Path nos sirve para unir y normalizar rutas de archivos o carpetas adaptándose al sistema operativo donde se ejecutre el proyecto.

import fs from 'fs';
import path from 'path';

// Exportamos la función asíncrona la cuál toma el screenshot de la página, primero valida que exista el directorio de screenshots donde se van a guardar, y si no, lo crea.
export async function tomarScreenshot(page, filename) {
  const screenshotsDir = path.join(process.cwd(), 'screenshots');

  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  const filepath = path.join(screenshotsDir, `${filename}.png`);

  await page.screenshot({
    path: filepath,
    fullPage: true, // Sin fullpage puppeteer capturaria solamente la parte visible, con esta opción en True captura toda la página.
  });

  return filepath;
}
