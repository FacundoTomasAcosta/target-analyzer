// Importamos express que es el framwork que vamos a utilizar para construir la API.
// Importamos cors para evitar el error de que el frontend no pueda consultar a la API.

import express from 'express';
import cors from 'cors';

// Importamos las rutas relacionadas con el análisis.
import analizadorRutas from './rutas/analizadorRutas.js';

const app = express(); // Inicializamos la aplicación Express.

app.use(cors()); // Habilitamos CORS.
app.use(express.json()); // Esto significa que cuando llegue un JSON, lo convertimos en un objeto JavaScript.

app.use('/api/analizar', analizadorRutas); // Cuando alguien visite esta ruta, el programa va a buscar la lógica dentro del archivo analizadorRutas.

export default app; // Exportamos la aplicación para que pueda usarla el servidor.
