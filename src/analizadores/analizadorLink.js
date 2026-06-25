// Crear la función para extraer las links de la página, utilizando Cheerio para analizar el HTML, recorrer
// todas las etiquetas <a> y obtener sus atributos href, text y target, devolviendo un array de objetos con esta información.

export function extraerLinks($) {
  return $('a')
    .map((_, link) => ({
      text: $(link).text().trim(),
      href: $(link).attr('href') || '',
      target: $(link).attr('target') || '',
    }))
    .get();
}
