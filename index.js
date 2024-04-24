const express = require("express");
const insertUser = require("./routes/insetUser");
const example = require("./routes/example");
const showUser = require("./routes/showUser");
const login = require("./routes/login");
const updateUser = require("./routes/updateUser");
const check = require("./routes/check");
const validateGmail = require("./routes/validateGmail");
const insertSmartPot = require("./routes/insertSmartPot");
const showPots = require("./routes/showPots");
const showPlantas = require("./routes/showPlantas");
const addPots = require("./routes/addPots");


const bodyParser = require('body-parser');
const cors = require('cors'); // Importar cors aquí

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Middleware de análisis de cuerpo para application/json
app.use(bodyParser.json());

// Middleware cors global
app.use(cors());



// Routes check

app.use("/insertUser", insertUser);
app.use("/example", example);
app.use("/showUser", showUser);
app.use("/login", login);
app.use("/updateUser", updateUser);
app.use("/check", check);
app.use("/validateGmail", validateGmail);
app.use("/insertSmartPot", insertSmartPot);
app.use("/showPots", showPots);
app.use("/showPlantas", showPlantas);
app.use("/addPots", addPots);






// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to  ${port}`));
