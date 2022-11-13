const catchAsync = require('./../utils/catchAysnc');
const Doctor = require('./../models/doctorModel');
const Account = require('./../models/accountModel');
const People = require('./../models/peopleModel');

exports.getAllDoctor = catchAsync(async (req, res, next) => {
  const doctors = await Doctor.find()
    .populate({
      path: 'department',
      select: 'nameDepartment ',
    })
    .populate({
      path: 'position',
      select: 'namePosition ',
    })
    .populate('account');

  await Promise.all(
    doctors.map(async (doc) => {
      const data = await doc.account.populate('people');
      await data.populate('role');
      return data;
    })
  );
  res.status(200).json({
    status: 'success',
    data: doctors,
  });
});

exports.createDoctor = catchAsync(async (req, res, next) => {
  //check username có tồn tại hay chưa
  const checkUsername = await Account.findOne({
    username: req.body.username,
  });
  if (checkUsername)
    return res.status(400).json({
      status: 'username is exist',
    });
  //insert thông tin vào bảng people
  const people = await People.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    birthday: req.body.birthday,
    image: req.body.image,
  });

  //dùng id bảng people insert vào bảng account
  const account = await Account.create({
    username: req.body.username,
    password: req.body.password,
    role: '634909c10df546fe79d688ef',
    people: people._id,
  });

  //dùng id bảng account insert vào bảng Doctor
  const doctor = await Doctor.create({
    account: account._id,
    position: req.body.position,
    department: req.body.department,
  });
  // dùng populate để tham chiếu dữ liệu của các bảng
  const data = await doctor.populate('account');
  await data.account.populate('people');
  res.status(201).json({
    status: 'success',
    data,
  });
});

exports.updateDoctor = catchAsync(async (req, res, next) => {
  // find doctor dựa vào id
  const query = await Doctor.findById(req.params.id);
  //thực hiện update
  console.log('account', query.account);
  await Doctor.findByIdAndUpdate(query._id, {
    position: req.body.position,
    department: req.body.department,
  });
  const account = await Account.findByIdAndUpdate(query.account, {
    username: req.body.username,
    password: req.body.password,
  });

  await People.findByIdAndUpdate(account.people, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    birthday: req.body.birthday,
    gender: req.body.gender,
    image: req.body.image,
  });

  const doctors = await Doctor.findById(req.params.id)
    .populate({
      path: 'department',
      select: 'nameDepartment ',
    })
    .populate({
      path: 'position',
      select: 'namePosition ',
    })
    .populate({
      path: 'account',
      select: '-__v',
    });

  const data = await doctors.account.populate({
    path: 'people',
    select: '-__v',
  });
  await data.populate({
    path: 'role',
    select: '-__v',
  });

  res.status(200).json({
    status: 'success',
    data: doctors,
  });
});

exports.lockAccountDoctor = catchAsync(async (req, res, next) => {
  console.log('debug', req.params.id);
  await Doctor.findByIdAndUpdate(
    req.params.id,
    {
      status: 'Khóa',
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: 'success',
  });
});
