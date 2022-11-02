const mongoose = require("mongoose");
const slugify = require("slugify");
const departmentSchema = new mongoose.Schema({
  nameDepartment: {
    type: String,
    require: [true, "A name Department can not be empty"],
    trim: true,
  },
  slugs: {
    type: String,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
});

departmentSchema.pre("save", function (next) {
  this.slugs = slugify(this.nameDepartment, { lower: true });
  next();
});
const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;
