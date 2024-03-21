const express = require("express");
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();

app.use(cors()); // Esto permitirá todas las solicitudes CORS

app.use(bodyParser.urlencoded({ extended: false }));

router.post('/', (req, res) => {
    // Aquí puedes acceder a los datos del formulario enviados
    const formData = req.body;
    
    console.log(formData);
    // Realiza acciones en base a los datos recibidos
    // Por ejemplo, enviar un correo electrónico, guardar en una base de datos, etc.
    
    // Envía una respuesta al cliente
    res.send('Formulario enviado exitosamente');
  });

  module.exports = router;