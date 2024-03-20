const express = require("express");
const home = require("./routes/insetUser");

// Middlewares
const app = express();


// Routes

app.use("/home", home);



// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
