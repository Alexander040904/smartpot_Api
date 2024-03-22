const express = require("express");
const router = express.Router();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(cors()); // Esto permitirá todas las solicitudes CORS

const uri = "mongodb+srv://halcorporation40:151081halco@smarpot.iddzpk2.mongodb.net/?retryWrites=true&w=majority&appName=smarpot";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Conexión exitosa a la base de datos");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1);
  }
}

async function validateUser(data) {
    const database = client.db("smarpot").collection("usuarios");
    const cursor = database.find({ gmail: data.gmail });
    const documentos = await cursor.toArray();
    return documentos.length > 0;
}

async function insertUser(data) {
    const equalUsers = await validateUser(data);
    if (!equalUsers) {
      const database = client.db("smarpot").collection("usuarios");
      const resultado = await database.insertOne(data);
      console.log(`Se insertó correctamente el documento con el ID: ${resultado.insertedId}`);
      return resultado.insertedId != null ? "Se insertó correctamente" : "Cagaste, no funciona";
    } else {
      console.log("Gmail existe");
      return "El gmail existe";
    }
}

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const control = await insertUser(data);
    res.send(control);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error interno del servidor");
  }
});

connectToDatabase().catch(console.error);

process.on('SIGINT', async () => {
  await client.close();
  process.exit();
});

module.exports = router;
