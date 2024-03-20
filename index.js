const express = require("express");
const homeRouter = require("./routes/insetUser");

// Middlewares
const app = express();

// CORS
app.use(cors());

// Routes
app.use("/home", homeRouter);

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
