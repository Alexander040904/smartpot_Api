const express = require("express");
const router = express.Router();

const app = express();

router.post('/', (req, res) => {
    // Aquí puedes acceder a los datos del formulario enviados
    const formData = req.body;
    
    console.log(formData);
    // Realiza acciones en base a los datos recibidos
    // Por ejemplo, enviar un correo electrónico, guardar en una base de datos, etc.
    
    // Envía una respuesta al cliente
    res.send("te comunicastes desde verce" + formData.name);
  });

  router.get('/', (req, res) => {
    res.send('Esta es la ruta para enviar formularios. Debes enviar una solicitud POST con datos de formulario.');
});


  module.exports = router;