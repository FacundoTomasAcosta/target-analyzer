import {
  obtenerHistorial,
  obtenerAnalisis,
  eliminarAnalisis,
  eliminarHistorial,
} from '../servicios/historialServicio.js';

export async function listarHistorial(req, res, next) {
  try {
    const historial = await obtenerHistorial();

    res.json(historial);
  } catch (error) {
    next(error);
  }
}

export async function obtenerArchivo(req, res, next) {
  try {
    const analisis = await obtenerAnalisis(req.params.nombre);

    res.json(analisis);
  } catch (error) {
    next(error);
  }
}

export async function borrarArchivo(req, res, next) {
  try {
    await eliminarAnalisis(req.params.nombre);

    res.json({
      mensaje: 'Análisis eliminado.',
    });
  } catch (error) {
    next(error);
  }
}

export async function borrarHistorial(req, res, next) {
  try {
    await eliminarHistorial();

    res.json({
      mensaje: 'Historial eliminado.',
    });
  } catch (error) {
    next(error);
  }
}
