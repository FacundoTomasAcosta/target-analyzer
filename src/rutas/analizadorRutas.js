// Importamos el sistema de rutas de Express.
import { Router } from 'express';
// Importamos el controlador.
import { analizar } from '../controladores/analizadorControlador.js';

// Creamos un conjunto de rutas.
const router = Router();

// Definimos la ruta POST, esto significa que va a ejecutar analizar().
router.post('/', analizar);

// Exportamos el Router.
export default router;
