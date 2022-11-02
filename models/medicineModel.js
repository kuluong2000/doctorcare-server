const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  nameMedicine: {
    type: String,
  },
  description: {
    type: String,
  },
  department: {
    type: mongoose.Schema.ObjectId,
    ref: "Department",
  },
});

const Medicine = mongoose.model("Medicine", medicineSchema);
module.exports = Medicine;
