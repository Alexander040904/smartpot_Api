const express = require("express");
const router = express.Router();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(cors()); 

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



async function insertPot(userId, potData) {
    const database = client.db("smarpot").collection("pots");
    const resultado = await database.insertOne(potData);
    if (resultado.insertedId) {
        const notification = {
            recipient: userId,
            message: `Se ha agregado una nueva maceta con ID ${resultado.insertedId} para el usuario ${userId}.`
        };
        await insertNoti(notification);
        return "Se insertó correctamente la maceta.";
    } else {
        return "Error al insertar la maceta.";
    }
}

async function insertNoti(notification) {
    const database = client.db("smarpot").collection("notifications");
    await database.insertOne(notification);
}

//notis de c/usuario
router.get("/notifications/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const database = client.db("smarpot").collection("notifications");
        const notifications = await database.find({ recipient: userId }).toArray();
        res.json(notifications);
    } catch (error) {
        console.error("Error al obtener las notificaciones:", error);
        res.status(500).send("Error interno del servidor");
    }
});