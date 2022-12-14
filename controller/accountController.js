const catchAsync = require('./../utils/catchAysnc');
const Account = require('./../models/accountModel');

exports.getAllAccount = catchAsync(async (req, res, next) => {
  // const accounts = await Account.find().populate('role').populate('people');
  const accounts = await Account.find().populate('role');
  const data = accounts.filter((item) => !item.role);
  await Promise.all(data.map(async (acc) => await acc.populate('people')));
  // await data.populate('people');
  res.status(200).json({
    status: 'success',
    data,
  });
});
exports.updateAccount = catchAsync(async (req, res, next) => {
  const data = await Account.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json({
    status: 'success',
    data,
  });
});
exports.lockOrUnlockAccount = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const data = await Account.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: 'success',
    data,
  });
});
