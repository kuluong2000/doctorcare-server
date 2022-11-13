const catchAsync = require('./../utils/catchAysnc');
const People = require('./../models/peopleModel');

exports.updateMe = catchAsync(async (req, res, next) => {
  const data = await People.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!data) return next(new AppError('Fail', 404));

  res.status(200).json({
    status: 'success',
    data: data,
  });
});
