const express = require("express");
const insertUser = require("./routes/insetUser");

// Middlewares
const app = express();


// Routes

app.use("/insertUser", insertUser);



// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
