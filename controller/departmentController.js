const AppError = require('./../utils/appError');
const Department = require('./../models/departmentModel');
const catchAsync = require('./../utils/catchAysnc');
const slugify = require('slugify');
exports.getAllDepartment = catchAsync(async (req, res, next) => {
  const data = await Department.find();
  res.status(200).json({
    status: 'success',
    status: 200,
    data,
  });
});
exports.getOneDepartment = catchAsync(async (req, res, next) => {
  let query = await Department.findOne({ slugs: req.params.id });
  res.status(200).json({
    status: 'success',
    data: {
      data: query,
    },
  });
});

exports.createDepartment = catchAsync(async (req, res, next) => {
  const data = await Department.create(req.body);
  res.status(201).json({
    status: 'success',
    status: 201,
    data: {
      data,
    },
  });
});
exports.updateDepartment = catchAsync(async (req, res, next) => {
  const slugs = slugify(req.body.nameDepartment);

  const data = await Department.findByIdAndUpdate(req.params.id, {
    ...req.body,
    slugs: slugs,
  });
  res.status(200).json({
    status: 'success',
    data: {
      data,
    },
  });
});

exports.deleteDepartment = catchAsync(async (req, res, next) => {
  await Department.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
