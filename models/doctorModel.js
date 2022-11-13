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
  status: {
    type: String,
    default: 'Hoạt Động',
  },
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
