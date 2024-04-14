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

async function validatePots(data) {
    const database = client.db("smarpot").collection("pots");
    const cursor = database.find({ _id: data._id });
    const documentos = await cursor.toArray();
    return documentos.length > 0;
}

async function insertPots(data) {
    const equalUsers = await validatePots(data);
    if (!equalUsers) {
      const database = client.db("smarpot").collection("pots");
      const resultado = await database.insertOne(data);
      //console.log(`Se insertó correctamente el documento con el ID: ${resultado.insertedId}`);
      return resultado.insertedId != null ? "Se insertó correctamente" : "Cagaste, no funciona";
    } else {
      await updatePots(data);
      return "El gmail existe";
    }
}
//{"_id":"smart001","brightness":-2,"soilMoisture":0,"waterContainer":1195.848022,"climateHumidity":35,"climateTemperature":36.29999924}
async function updatePots(data){
  const database = client.db("smarpot").collection("pots");
  const resultado = await database.updateOne({_id: data._id}, {$set:{brightness:data.brightness, soilMoisture:data.soilMoisture, waterContainer:data.waterContainer, climateHumidity:data.climateHumidity, climateTemperature:data.climateTemperature}});
}
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const control = await insertPots(data);
    res.json(data);
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
