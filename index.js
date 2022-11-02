const express = require("express");
const path = require("path");
var cors = require("cors");
var morgan = require("morgan");
const bodyParser = require("body-parser");

// import Routes
const testApi = require("./routes/testAPI");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const uploadImageRoutes = require("./routes/uploadImageRoutes");
//start express app

const app = express();
app.use(express.static(path.join(__dirname, "public/assets/image")));
app.use(cors());
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
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadImageRoutes);

// START SERVER
module.exports = app;
