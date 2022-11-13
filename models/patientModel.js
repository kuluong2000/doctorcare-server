const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.ObjectId,
    ref: 'Account',
  },
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
