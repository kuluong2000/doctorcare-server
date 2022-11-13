const catchAsync = require('./../utils/catchAysnc');
const AppError = require('./../utils/appError');
const Diseases = require('./../models/diseasesModel');
const Department = require('./../models/departmentModel');
exports.getAllDiseases = catchAsync(async (req, res, next) => {
  const data = await Diseases.find().populate({
    path: 'department',
    select: 'nameDepartment',
  });
  if (!data) return new AppError('data not found', 404);
  res.status(200).json({
    status: 'success',
    data: data,
  });
});

exports.getALLDiseasesOfDepartment = catchAsync(async (req, res, next) => {
  let id = await Department.findOne({ slugs: req.params.id });

  let query = await Diseases.find({ department: id._id });
  res.status(200).json({
    status: 'success',
    data: query,
  });
});

exports.createDiseases = catchAsync(async (req, res, next) => {
  const data = await Diseases.create(req.body);
  if (!data) return new AppError('fail', 404);
  res.status(201).json({
    status: 'success',
    data: {
      data,
    },
  });
});

exports.updateDiseases = catchAsync(async (req, res, next) => {
  const data = await Diseases.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!data) return new AppError('Fail', 404);
  res.status(200).json({
    status: 'success',
    data: data,
  });
});
exports.deleteDiseases = catchAsync(async (req, res, next) => {
  await Diseases.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
