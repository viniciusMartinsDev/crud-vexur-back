require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const personRoute = require("./routes/PeopleRoutes");
const companyRoute = require("./routes/CompaniesRoutes");

app.use(cors());
app.use(express.json());
app.use(personRoute);
app.use(companyRoute);

app.listen(3000, () => {
  console.log("Server started");
});
