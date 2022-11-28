const catchAsync = require('./../utils/catchAysnc');
const Medicine = require('./../models/medicineModel');

exports.getAllMedicine = catchAsync(async (req, res, next) => {
  const query = await Medicine.find();
  res.status(200).json({
    status: 'success',
    data: query,
  });
});

exports.createMedicine = catchAsync(async (req, res, next) => {
  const query = await Medicine.create(req.body);
  res.status(201).json({
    status: 'success',
    data: query,
  });
});

exports.UpdateMedicine = catchAsync(async (req, res, next) => {
  const query = await Medicine.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: query,
  });
});

exports.deleteMedicine = catchAsync(async (req, res, next) => {
  await Medicine.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
