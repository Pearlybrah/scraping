require("dotenv").config();
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var db = require("./models");
var PORT = process.env.PORT || 3000;
var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
const routes = require("./routes");
app.use(routes);

var MONGODB_URI = process.env.mongoURI || "mongodb://localhost/scraper";
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
