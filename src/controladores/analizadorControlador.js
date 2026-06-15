import { analizarWebsite } from '../servicios/analizadorServicio.js'; // Importamos el servicio principal de la aplicación.
import { CODIGO_ERRORES } from '../utilidades/codigoErrores.js'; // Importamos los código de errores.
// Importamos la función que analiza los errores y transforma los errores técnicos en amigables.
import { analizarError } from '../utilidades/manejoErrores.js';

export async function analizar(req, res) {
  try {
    const { url } = req.body; // Obtenemos la URL a analizar en un formato JSON, { "url": "https://facuesuncapo.com"}

    // Procedemos a validar que la URL exista.
    if (!url) {
      return res.status(CODIGO_ERRORES.URL_REQUIRED.status).json({
        success: false,

        error: {
          code: CODIGO_ERRORES.URL_REQUIRED.code,

          message: CODIGO_ERRORES.URL_REQUIRED.message,
        },
      });
    }

    // Procedemos a validar el formato de la URL.
    try {
      new URL(url);
    } catch {
      return res.status(CODIGO_ERRORES.INVALID_URL.status).json({
        success: false,

        error: {
          code: CODIGO_ERRORES.INVALID_URL.code,

          message: CODIGO_ERRORES.INVALID_URL.message,
        },
      });
    }

    const result = await analizarWebsite(url); // Utilizamos la función principal la cual analiza el sitio web y guardamos en la constante result.

    return res.json({
      success: true,

      data: result,
    });
  } catch (error) {
    const errorInfo = analizarError(error);

    return res.status(errorInfo.status).json({
      success: false,

      error: {
        code: errorInfo.code,

        message: errorInfo.message,
      },
    });
  }
}
