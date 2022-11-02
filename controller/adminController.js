const catchAsync = require("./../utils/catchAysnc");
//import modal
const Role = require("./../models/roleModel");

exports.createRole = catchAsync(async (req, res, next) => {
  const data = await Role.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      code: 201,
      data: data,
    },
  });
});
