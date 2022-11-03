const mongoose = require('mongoose');

const postionSchema = new mongoose.Schema({
  namePosition: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Position = mongoose.model('Position', postionSchema);

module.exports = Position;
