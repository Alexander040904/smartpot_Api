const express = require("express");
const router = express.Router();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(cors()); // Esto permitirá todas las solicitudes CORS

//const uri = "mongodb+srv://halcorporation40:151081halco@smarpot.iddzpk2.mongodb.net/?retryWrites=true&w=majority&appName=smarpot";
const uri = "mongodb://localhost:27017/";
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

async function validateForType(data) {
    try {
        const database = client.db("smarpot").collection("usuarios");
        const cursor = await database.find({ gmail: data.gmail }).toArray();
        
        if (cursor.length > 0 && cursor.length < 2) {
            for (const doc of cursor) {
                if (doc.type === "user") {
                    return doc.password === data.password ? true : "contraseña incorrecta";
                } else if (doc.type === "google") {
                    return true;
                }
            }
            // Si el bucle termina y no se ha retornado ningún valor, retornar "No se encontró coincidencia de tipo"
            return "No se encontró coincidencia de tipo";
        } else {
            return "No se encontró gmail";
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

router.post("/", async (req, res) => {
    try {
        const data = req.body;
      
      const control = await validateForType(data);
      console.log(control);
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

  