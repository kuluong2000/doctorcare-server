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
diseasesSchema.index({ nameDiseases: 'text' });
const Diseases = mongoose.model('Diseases', diseasesSchema);

module.exports = Diseases;
