const express = require('express');
const router = express.Router();
const userController = require('./../controller/userController');
const bookingController = require('./../controller/bookingController');

router.patch('/me/:id', userController.updateMe);

//Booking
router.get('/booking/:id', bookingController.getAllBookingByPatient);
router.post('/booking', bookingController.booking);

module.exports = router;
