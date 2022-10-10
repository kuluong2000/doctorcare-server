const express = require("express");
var morgan = require("morgan");
const bodyParser = require("body-parser");

// import Routes
const testApi = require("./routes/testAPI");
const userRoutes = require("./routes/userRoutes");

//start express app

const app = express();

// Body parser, reading data from body into req.body
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(morgan("dev"));

// #####################################################################
// ROUTE
//######################################################################
app.use("/", testApi);
app.use("/api/user", userRoutes);

// START SERVER
module.exports = app;
