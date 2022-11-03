const mongoose = require('mongoose');

const diseasesSchema = new mongoose.Schema({
  nameDiseases: {
    type: String,
  },
  description: {
    type: String,
  },
  department: {
    type: mongoose.Schema.ObjectId,
    ref: 'Department',
  },
});

const Diseases = mongoose.model('Diseases', diseasesSchema);

module.exports = Diseases;
