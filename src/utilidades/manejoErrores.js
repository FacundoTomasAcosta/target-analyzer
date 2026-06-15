import { CODIGO_ERRORES } from './codigoErrores.js';

export function analizarError(error) {
  const message = error.message || '';

  if (message.includes('ERR_NAME_NOT_RESOLVED')) {
    return CODIGO_ERRORES.DOMAIN_NOT_FOUND;
  }

  if (message.includes('Navigation timeout')) {
    return CODIGO_ERRORES.PAGE_TIMEOUT;
  }

  if (message.includes('ERR_ABORTED')) {
    return CODIGO_ERRORES.ACCESS_DENIED;
  }

  if (message.includes('Failed to launch')) {
    return CODIGO_ERRORES.BROWSER_ERROR;
  }

  return CODIGO_ERRORES.INTERNAL_ERROR;
}
