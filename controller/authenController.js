const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAysnc');
const AppError = require('./../utils/appError');

//Import Model
const Role = require('./../models/roleModel');
const People = require('./../models/peopleModel');
const Account = require('./../models/accountModel');
const Patient = require('../models/patientModel');
const Doctor = require('../models/doctorModel');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    //thời gian sống của token
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOLIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  // if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);
  // Remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: user,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  // 1 ) insert vào table People
  try {
    //check username có tồn tại hay chưa
    const checkUsername = await Account.findOne({
      username: req.body.username,
    });
    if (checkUsername)
      return res.status(400).json({
        status: 'username is exist',
      });

    const people = await People.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
    });
    // 2) dùng id của table  insert vào table Account
    const account = await Account.create({
      username: req.body.username,
      password: req.body.password,
      people: people._id,
      role: req.body.role,
    });
    // 3) dùng id của Account insert vào table Patient
    const patient = await Patient.create({
      account: account._id,
    });
    const data = await patient.populate('account');
    await data.account.populate('people');
    res.status(201).json({
      status: 'success',
      data,
    });
  } catch (error) {
    console.log(error);
  }

  // createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  const account = await Account.find({ username: username });
  const role = await account[0].populate('role');
  if (role?.role?.nameRole === 'admin' || role?.role?.nameRole === 'doctor') {
    const doctor = await Doctor.find({ account: account[0]._id }).select('_id');
    // .populate('role');

    await account[0].populate('people');
    // console.log({ ...account, doctor: doctor[0]._id });

    //1) check username and password exist
    if (!username || !password) {
      return next(new AppError('please provide username and password', 400));
    }
    //2) check if username exists && password is correct
    const user = await Account.findOne({ username });

    if (!user) {
      return res.status(401).send({ error: 'incorrect username' });
    }
    if (user.password !== password) {
      return res.status(401).send({ error: 'incorrect password' });
    }
    if (doctor) {
      return createSendToken({ account, doctor: doctor[0]?._id }, 200, res);
    }
    return createSendToken(account, 200, res);
  }
  const patient = await Patient.find({ account: account[0]._id }).populate(
    'account'
  );
  await patient[0].account.populate('people');
  await account[0].populate('people');
  //1) check username and password exist
  if (!username || !password) {
    return next(new AppError('please provide username and password', 400));
  }
  //2) check if username exists && password is correct
  const user = await Account.findOne({ username });

  if (!user) {
    return res.status(401).send({ error: 'incorrect username' });
  }
  if (user.password !== password) {
    return res.status(401).send({ error: 'incorrect password' });
  }
  // if everything ok, send token to client
  createSendToken(patient, 200, res);
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
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
  });
});
