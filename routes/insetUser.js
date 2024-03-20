/*const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "The app is working properly!",
  });
});

module.exports = router;*/

const express = require("express");
const router = express.Router();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(cors()); // Esto permitirá todas las solicitudes CORS


const uri = "mongodb+srv://halcorporation40:151081halco@smarpot.iddzpk2.mongodb.net/?retryWrites=true&w=majority&appName=smarpot";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run(datos) {
  try {
    
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Obtener la referencia a la base de datos y colección que deseas usar
    const database = client.db("smarpot");
    const collection = database.collection("usuarios");

    // El documento que deseas insertar
    const documento = {
      gmail: datos.gmail,
      imgUsuario:  datos.imgUsuario,
      type: datos.type,
      contrasena: datos.contrasena
      // ... otros campos y valores
    };

    // Insertar el documento en la colección
    const resultado = await collection.insertOne(documento);
    console.log(`Se insertó correctamente el documento con el ID: ${resultado.insertedId}`);
    

    /*
    const cursor = collection.find({campo2: "huaci"});
    const documentos = await cursor.toArray();
    documentos.forEach(doc => {
      console.log(doc.campo2);
    });*/
  } finally {
    // Asegurarse de cerrar la conexión cuando hayas terminado o si hay algún error
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
