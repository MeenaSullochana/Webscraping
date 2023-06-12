require("./models/db");
const express = require("express");
const path = require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const webscrapeRoute = require("./routes/webscrapeRoute");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", "views");

app.listen(3000, () => {
  console.log("server started at port:3000");
});
app.use("/website", webscrapeRoute);
