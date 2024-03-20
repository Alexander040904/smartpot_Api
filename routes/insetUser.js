const express = require("express");
const router = express.Router();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://halcorporation40:151081halco@smarpot.iddzpk2.mongodb.net/?retryWrites=true&w=majority&appName=smarpot";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run(datos) {
  try {
    await client.connect();
    const database = client.db("smarpot");
    const collection = database.collection("usuarios");

    const documento = {
      gmail: datos.gmail,
      imgUsuario:  datos.imgUsuario,
      type: datos.type,
      contrasena: datos.contrasena
    };

    const resultado = await collection.insertOne(documento);
    console.log(`Se insertó correctamente el documento con el ID: ${resultado.insertedId}`);
  } finally {
    await client.close();
  }
}

router.get("/", async (req, res) => {
  try {
    const datos = req.query;
    await run(datos);
    
    res.send("todo ok");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error interno del servidor");
  }
});

module.exports = router;

