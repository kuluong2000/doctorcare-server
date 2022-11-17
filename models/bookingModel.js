const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'Patient',
  },
  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Doctor',
  },
  department: {
    type: mongoose.Schema.ObjectId,
    ref: 'Department',
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  diseases: {
    type: String,
  },
  medicine: {
    type: String,
  },
  price: {
    type: Number,
  },
  status: {
    type: String,
    default: 'Chưa khám',
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
