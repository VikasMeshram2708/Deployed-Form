const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const volleyball = require("volleyball");
const path = require("path");
const cors = require("cors");

// Middlewares
app.use(cors());
app.use(volleyball); // http request logger
app.use(express.json()); // body-parser

app.use("/api/auth", require("./Routes/auth"));

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Routes

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
