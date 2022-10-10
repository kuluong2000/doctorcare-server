const express = require("express");

const authController = require("./../controller/authenController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello  world");
});

module.exports = router;
