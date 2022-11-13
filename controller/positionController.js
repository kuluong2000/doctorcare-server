const AppError = require('./../utils/appError');
const Position = require('./../models/positionModel');
const catchAsync = require('./../utils/catchAysnc');
exports.getAllPosition = catchAsync(async (req, res, next) => {
  const data = await Position.find();
  res.status(200).json({
    status: 'success',
    status: 200,
    data,
  });
});

exports.createPosition = catchAsync(async (req, res, next) => {
  const data = await Position.create(req.body);
  res.status(201).json({
    status: 'success',
    status: 201,
    data: {
      data,
    },
  });
});
exports.updatePosition = catchAsync(async (req, res, next) => {
  const data = await Position.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      data,
    },
  });
});

exports.deletePosition = catchAsync(async (req, res, next) => {
  await Position.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
