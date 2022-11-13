const mongoose = require('mongoose');

const peopleSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  gender: {
    type: String,
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
  },
  birthday: {
    type: String,
  },
  address: {
    type: String,
  },
  image: {
    type: String,
  },
  status: {
    type: String,
  },
});

const People = mongoose.model('People', peopleSchema);

module.exports = People;
