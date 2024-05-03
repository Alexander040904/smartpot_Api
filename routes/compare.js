const express = require("express");
const router = express.Router();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(cors()); // Esto permitirá todas las solicitudes CORS

const uri = "mongodb+srv://halcorporation40:151081halco@smarpot.iddzpk2.mongodb.net/?retryWrites=true&w=majority&appName=smarpot";
//const uri = "mongodb://localhost:27017/";
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

async function showMaceta(idPots) {
    const database = client.db("smarpot").collection("pots");
    const maceta = await database.findOne({ _id: idPots });
    return await showPlantas(maceta)
}
async function showPlantas(idMaceta) {
  const database = client.db("smarpot").collection("plantas");
  const maceta = await database.findOne({ _id: idMaceta._idPlanta });
  return maceta;
}

router.post("/", async (req, res) => {
    try {
      const data = req.body;
      console.log(data._id);

      const control = await showMaceta(data._id);
      res.json(control);
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
