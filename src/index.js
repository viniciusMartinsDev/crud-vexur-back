require("dotenv").config();
const express = require("express");

const app = express();
const personRoute = require("./routes/PersonRoutes");

app.use(express.json());
app.use(personRoute);

app.listen(3000, () => {
  console.log("Server started");
});
