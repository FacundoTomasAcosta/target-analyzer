// Importamos dotenv "variables de entorno", para poder utilizar el archivo .env en caso de necesitarlo.
// Importamos la aplicación configurada en app.js

import dotenv from 'dotenv';
import app from './app.js';

// Utilizamos la configuración del archivo .env
dotenv.config();

// Le asignamos a la variable PORT el puerto donde va a escuchar el servidor
// si no esta definido en el archivo .env, por defecto utilizar 3000.
const PORT = process.env.PORT || 3000;

// Inicializamos el servidor, a partir de este momento Express empieza a escuchar peticiones.
app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
