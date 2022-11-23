const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  people: {
    type: mongoose.Schema.ObjectId,
    ref: 'People',
  },
  role: {
    type: mongoose.Schema.ObjectId,
    ref: 'Role',
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;
