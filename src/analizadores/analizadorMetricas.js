// Exportamos la función obtenerMetricas

export function obtenerMetricas($) {
  return {
    totalImages: $('img').length,

    totalLinks: $('a').length,

    totalScripts: $('script').length,

    totalStylesheets: $('link[rel="stylesheet"]').length,

    forms: $('form').length,

    tables: $('table').length,

    paragraphs: $('p').length,
  };
}
