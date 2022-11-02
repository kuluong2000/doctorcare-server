const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  idRole: {
    type: Number,
    unique: true,
  },
  nameRole: {
    type: String,
  },
});

const Role = mongoose.model("Role", roleSchema);
module.exports = Role;
