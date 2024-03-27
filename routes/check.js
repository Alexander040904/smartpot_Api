const express = require("express");
const router = express.Router();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
app.use(cors()); // Esto permitirá todas las solicitudes CORS
const url = 'mongodb://localhost:27017';

// Opciones de conexión
const options = {
  useUnifiedTopology: true,
};

// Función para conectarse a la base de datos y configurar el observador de cambios
async function watchDatabase() {
  const client = new MongoClient(url, options);

  try {
    // Conexión a la base de datos
    await client.connect();

    // Base de datos y colección que deseas observar
    const db = client.db('smarpot');
    const collection = db.collection('usuarios');

    // Configurar el observador de cambios
    const changeStream = collection.watch();
    

    // Escuchar los eventos de cambio
 

  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

// Iniciar el observador de cambios
watchDatabase();

// Ruta de ejemplo que devuelve "true" al recibir una solicitud GET
router.get('/', (req, res) => {
  res.send('true');
});

module.exports = router;

