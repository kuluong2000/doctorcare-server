const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const Role = require("./../models/roleModel");
const catchAsync = require("./../utils/catchAysnc");
const AppError = require("./../utils/appError");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    //thời gian sống của token
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOLIE_EXPIRES_IN * 24 * 60 * 60 * 1000),

    httpOnly: true,
  };
  // if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  // Remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const newUser = await User.create(req.body);
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  const test = await User.find({ username: username }).populate({
    path: "_id",
  });
  console.log(test);
  //1) check username and password exist
  if (!username || !password) {
    return next(new AppError("please provide username and password", 400));
  }
  //2) check if username exists && password is correct
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).send({ error: "incorrect username" });
  }
  if (user.password !== password) {
    return res.status(401).send({ error: "incorrect password" });
  }
  //if everything ok, send token to client
  createSendToken(user, 200, res);
});
//check role, cho phép user nào đucợ thao tác

// exports.restrictTo = (...roles) => {
//   return (req, res, next) => {
//     console.log(req.users);
//     // if (!roles.includes(req.user.role)) {
//     //   return next(new AppError("You do not have permission to perform this action", 403));
//     // }
//     next();
//   };
// };

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
});
