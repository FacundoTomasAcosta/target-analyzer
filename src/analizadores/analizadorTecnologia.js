// analizadorTecnologia.js

export function detectorTecnologias($, html = '', headers = {}) {
  const tecnologias = new Set();

  // 1. Meta Generator (CMS y generadores de sitios)
  const generator = $('meta[name="generator"]').attr('content');
  if (generator) {
    const g = generator.toLowerCase();
    if (g.includes('wordpress')) tecnologias.add('WordPress');
    else if (g.includes('next.js')) tecnologias.add('Next.js');
    else if (g.includes('nuxt')) tecnologias.add('Nuxt.js');
    else if (g.includes('astro')) tecnologias.add('Astro');
    else if (g.includes('gatsby')) tecnologias.add('Gatsby');
    else tecnologias.add(generator);
  }

  // 2. Detección por estructura del DOM (huellas de frameworks)
  if ($('#__next').length > 0) {
    tecnologias.add('Next.js');
    tecnologias.add('React'); // Next.js está construido sobre React
  }
  if ($('#__nuxt').length > 0) tecnologias.add('Nuxt.js');
  if ($('app-root').length > 0 || $('[ng-version]').length > 0)
    tecnologias.add('Angular');
  if ($('[data-reactroot]').length > 0 || $('[data-reactid]').length > 0)
    tecnologias.add('React');
  if ($('[data-v-app]').length > 0 || $('[data-v-]').length > 0)
    tecnologias.add('Vue.js');
  if ($('#___gatsby').length > 0) {
    tecnologias.add('Gatsby');
    tecnologias.add('React'); // Gatsby está construido sobre React
  }

  // 3. Análisis de scripts (externos e internos)
  $('script').each((_, el) => {
    const src = $(el).attr('src') || '';
    const text = $(el).text() || '';

    // Frameworks JS
    if (src.includes('react') || src.includes('react-dom'))
      tecnologias.add('React');
    if (src.includes('vue')) tecnologias.add('Vue.js');
    if (src.includes('angular')) tecnologias.add('Angular');
    if (src.includes('jquery')) tecnologias.add('jQuery');

    // Analytics
    if (text.includes('gtag(') || text.includes('google-analytics')) {
      tecnologias.add('Google Analytics');
    }
    if (text.includes('fbq(')) tecnologias.add('Facebook Pixel');

    // CMS
    if (src.includes('wp-includes') || src.includes('wp-content')) {
      tecnologias.add('WordPress');
    }
  });

  // 4. Análisis de hojas de estilo
  $('link[rel="stylesheet"]').each((_, el) => {
    const href = $(el).attr('href') || '';
    if (href.includes('bootstrap')) tecnologias.add('Bootstrap');
    if (href.includes('tailwind')) tecnologias.add('Tailwind CSS');
    if (href.includes('font-awesome')) tecnologias.add('Font Awesome');
  });

  // 5. Detección por clases CSS
  const bodyClass = $('body').attr('class') || '';
  if (bodyClass.includes('tailwind') || $('[class*="tw-"]').length > 0) {
    tecnologias.add('Tailwind CSS');
  }

  // 6. Meta tags útiles
  if ($('meta[property^="og:"]').length > 0) tecnologias.add('Open Graph');
  if ($('script[type="application/ld+json"]').length > 0)
    tecnologias.add('JSON-LD');
  if ($('link[rel="manifest"]').length > 0) tecnologias.add('PWA Manifest');

  // 7. Headers HTTP básicos
  const server = (headers['server'] || '').toLowerCase();
  if (server.includes('nginx')) tecnologias.add('Nginx');
  if (server.includes('apache')) tecnologias.add('Apache');
  if (server.includes('cloudflare')) tecnologias.add('Cloudflare');

  return Array.from(tecnologias).sort();
}
