const catchAsync = require('./../utils/catchAysnc');
const Booking = require('./../models/bookingModel');
exports.statisPatientByMonth = catchAsync(async (req, res, next) => {
  const month = req.query.month;
  const year = req.query.year;

  const stats = await Booking.aggregate([
    {
      $project: {
        year: { $year: '$date' },
        month: { $month: '$date' },
        day: { $dayOfMonth: '$date' },
      },
    },
    {
      $match: {
        year: Number(year),
        month: Number(month),
      },
    },
    {
      $group: {
        _id: '$day',
        booking: { $push: '$$ROOT' },
        total: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        day: '$_id',
        booking: 1,
        total: 1,
      },
    },
  ]);

  res.json(stats);
});
