const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  idType: {
    type: Number,
  },
  nameType: {
    type: String,
  },
});

const Role = mongoose.model("Role", roleSchema);
module.exports = Role;
