export const CODIGO_ERRORES = {
  URL_REQUIRED: {
    status: 400,
    code: 'URL_REQUIRED',
    message: 'Debe proporcionar una URL.',
  },

  INVALID_URL: {
    status: 400,
    code: 'INVALID_URL',
    message: 'La URL ingresada no es válida.',
  },

  DOMAIN_NOT_FOUND: {
    status: 404,
    code: 'DOMAIN_NOT_FOUND',
    message: 'No se pudo encontrar el dominio solicitado.',
  },

  PAGE_TIMEOUT: {
    status: 408,
    code: 'PAGE_TIMEOUT',
    message: 'La página tardó demasiado en responder.',
  },

  ACCESS_DENIED: {
    status: 403,
    code: 'ACCESS_DENIED',
    message: 'El sitio no permite ser analizado, acceso denegado.',
  },

  BROWSER_ERROR: {
    status: 500,
    code: 'BROWSER_ERROR',
    message: 'Error al iniciar el navegador.',
  },

  SCREENSHOT_ERROR: {
    status: 500,
    code: 'SCREENSHOT_ERROR',
    message: 'No se pudo generar la captura de pantalla.',
  },

  INTERNAL_ERROR: {
    status: 500,
    code: 'INTERNAL_ERROR',
    message: 'Ocurrió un error inesperado.',
  },
};
