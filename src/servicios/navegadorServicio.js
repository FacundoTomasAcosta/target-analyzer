// Importamos la dependencia puppeteer para facilitarnos el análisis de las páginas web.
import puppeteer from 'puppeteer';

// Exportamos la función asíncrona (porque debemos esperar a que cargue toda la página)
// la cual va a abrir una instancia de Chromium
// controlada por Node, el headless hace que se ejecute sin mostrar una ventana gráfica.
export async function crearNavegador() {
  const browser = await puppeteer.launch({
    headless: true,
  });

  return browser;
}
