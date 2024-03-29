const express = require("express");
const router = express.Router();
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();
app.use(cors()); 

const url = 'mongodb://localhost:27017';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function configureReplicaSet() {
  const client = new MongoClient(url, options);

  try {
    await client.connect();
    console.log('Conexión exitosa a la base de datos para configurar el conjunto de réplicas');

    const adminDb = client.db('admin');
    const result = await adminDb.command({ replSetInitiate: { _id: 'RS', members: [{ _id: 0, host: 'localhost:27017' }] } });

    console.log('Configuración del conjunto de réplicas completada:', result);
  } catch (error) {
    console.error('Error al configurar el conjunto de réplicas:', error);
  } finally {
    await client.close();
  }
}

async function watchDatabase() {
  const client = new MongoClient(url, options);

  try {
    await client.connect();
    console.log('Conexión exitosa a la base de datos');

    const db = client.db('smarpot');
    const collection = db.collection('usuarios');

    const changeStream = collection.watch();

    changeStream.on('change', (change) => {
      console.log('Se detectó un cambio en la base de datos:', change);
    });

    changeStream.on('error', (error) => {
      console.error('Error en el ChangeStream:', error);
    });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

configureReplicaSet(); // Paso 4: Configurar el conjunto de réplicas
watchDatabase(); // Iniciar el observador de cambios en la base de datos

router.get('/', (req, res) => {
  res.send('true');
});

module.exports = router;
