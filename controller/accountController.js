const catchAsync = require('./../utils/catchAysnc');
const Account = require('./../models/accountModel');

exports.getAllAccount = catchAsync(async (req, res, next) => {
  const accounts = await Account.find().populate('role').populate('people');

  res.status(200).json({
    status: 'success',
    data: accounts,
  });
});
