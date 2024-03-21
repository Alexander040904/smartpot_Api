const express = require("express");
const home = require("./routes/insetUser");

// Middlewares
const cors = require('cors'); // Importar cors aquí

const app = express();

// Middleware cors global
app.use(cors());


// Routes
app.use("/home", home);

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
