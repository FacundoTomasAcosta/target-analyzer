export function calcularSEOScore($) {
  let score = 0;

  const checks = {
    title: false,
    description: false,
    h1: false,
    language: false,
    viewport: false,
    favicon: false,
    canonical: false,
    robots: false,
    imageAlt: false,
  };

  // TITLE
  if ($('title').text().trim()) {
    score += 15;
    checks.title = true;
  }

  // DESCRIPTION
  if ($('meta[name="description"]').attr('content')) {
    score += 15;
    checks.description = true;
  }

  // H1
  if ($('h1').length > 0) {
    score += 15;
    checks.h1 = true;
  }

  // LANG
  if ($('html').attr('lang')) {
    score += 10;
    checks.language = true;
  }

  // VIEWPORT
  if ($('meta[name="viewport"]').attr('content')) {
    score += 10;
    checks.viewport = true;
  }

  // FAVICON
  if (
    $('link[rel="icon"]').attr('href') ||
    $('link[rel="shortcut icon"]').attr('href')
  ) {
    score += 5;
    checks.favicon = true;
  }

  // CANONICAL
  if ($('link[rel="canonical"]').attr('href')) {
    score += 10;
    checks.canonical = true;
  }

  // ROBOTS
  if ($('meta[name="robots"]').attr('content')) {
    score += 10;
    checks.robots = true;
  }

  // ALT EN IMÁGENES
  const images = $('img');

  if (
    images.length > 0 &&
    images.toArray().every((img) => $(img).attr('alt'))
  ) {
    score += 10;
    checks.imageAlt = true;
  }

  return {
    score,
    checks,
  };
}
