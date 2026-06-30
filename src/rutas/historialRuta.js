import { Router } from 'express';

import {
  listarHistorial,
  obtenerArchivo,
  borrarArchivo,
  borrarHistorial,
} from '../controladores/historialControlador.js';

const router = Router();

router.get('/', listarHistorial);

router.get('/:nombre', obtenerArchivo);

router.delete('/:nombre', borrarArchivo);

router.delete('/', borrarHistorial);

export default router;
