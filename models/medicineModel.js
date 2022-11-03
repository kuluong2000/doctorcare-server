const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  nameMedicine: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Medicine = mongoose.model("Medicine", medicineSchema);
module.exports = Medicine;
