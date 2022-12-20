const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const volleyball = require("volleyball");

// Middlewares
app.use(volleyball); // http request logger
app.use(express.json()); // body-parser

// Routes
app.use("/api/auth", require("./Routes/auth"));

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
