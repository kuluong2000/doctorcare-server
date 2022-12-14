const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  position: {
    type: mongoose.Schema.ObjectId,
    ref: 'Position',
  },
  department: {
    type: mongoose.Schema.ObjectId,
    ref: 'Department',
  },
  account: {
    type: mongoose.Schema.ObjectId,
    ref: 'Account',
  },
  description: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  timeStamp: {
    type: Number,
    default: null,
  },
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
