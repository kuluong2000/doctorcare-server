const mongoose = require("mongoose");
const { default: slugify } = require("slugify");
const Role = require("./../models/roleModel");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "A username can not be empty"],
      trim: true,
      unique: true,
      lowercase: true,
      maxLength: [40, "a username mút have less qual then 40 characters"],
      minLength: [5, "A username must have more or qual then 5 characters"],
    },
    password: {
      type: String,
      require: [true, "A password can not be empty"],
      minLength: 8,
    },
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
      maxLength: 10,
    },
    image: {
      type: String,
    },
    address: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    status: {
      type: Boolean,
    },
    slugify: {
      type: String,
    },
    role: [
      {
        type: mongoose.Schema.Types.String,
        ref: "Role",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: "_id",
    select: "idRole",
  });
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
