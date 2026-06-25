// Exportamos la función extraerMeta

export function extraerMeta($) {
  return {
    title: $('title').text().trim(),

    description: $('meta[name="description"]').attr('content') || '',

    keywords: $('meta[name="keywords"]').attr('content') || '',

    language: $('html').attr('lang') || '',

    favicon:
      $('link[rel="icon"]').attr('href') ||
      $('link[rel="shortcut icon"]').attr('href') ||
      '',
  };
}
