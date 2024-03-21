const express = require("express");
const insertUser = require("./routes/insetUser");
const example = require("./routes/example");

// Middlewares
const cors = require('cors'); // Importar cors aquí

const app = express();

// Middleware cors global
app.use(cors());


// Routes

app.use("/insertUser", insertUser);
app.use("/example", example);


// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to  ${port}`));
