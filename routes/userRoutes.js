const express = require('express');
const router = express.Router();
const userController = require('./../controller/userController');

router.patch('/me/:id', userController.updateMe);
module.exports = router;
