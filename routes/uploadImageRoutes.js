const express = require("express");
const router = express.Router();

const uploadImageController = require("./../controller/uploadImageController");

router.post("/", uploadImageController.uploadImage, uploadImageController.resizeImage);

module.exports = router;
