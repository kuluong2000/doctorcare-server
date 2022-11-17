const catchAsync = require('./../utils/catchAysnc');
const Booking = require('./../models/bookingModel');
const Doctor = require('./../models/doctorModel');

// exports.getAllBooking = catchAsync(async (req, res, next) => {});
exports.getAllBookingByPatient = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ patient: req.params.id })
    .populate('patient')
    .populate('department', 'nameDepartment')
    .populate('doctor', 'account');

  await Promise.all(
    bookings.map(async (doc) => {
      const data = await doc.doctor.populate('account');
      await data.account.populate('people');
      return data;
    })
  );
  await Promise.all(
    bookings.map(async (item) => {
      const data = await item.patient.populate('account');
      await data.account.populate('people');
      return data;
    })
  );
  res.status(200).json({
    status: 'success',
    data: bookings,
  });
});
exports.getAllBookingByDoctor = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const bookings = await Booking.find({ doctor: req.params.id })
    .populate('patient')
    .populate('doctor', 'account')
    .populate('department');
  await Promise.all(
    bookings.map(async (doc) => {
      const data = await doc.doctor.populate('account');
      await data.account.populate('people');
      return data;
    })
  );

  await Promise.all(
    bookings.map(async (item) => {
      const data = await item.patient.populate('account');
      await data.account.populate('people');
      return data;
    })
  );
  res.status(200).json({
    status: 'success',
    data: bookings,
  });
});
exports.getAllBooking = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find()
    .populate('patient')
    .populate('department')
    .populate('doctor');
  await Promise.all(
    bookings.map(async (pat) => {
      const data = await pat.patient.populate('account');
      await data.account.populate('people');
      return data;
    })
  );
  await Promise.all(
    bookings.map(async (doc) => {
      const data = await doc.doctor.populate('account');
      await data.account.populate('people');
      return data;
    })
  );
  res.status(200).json({
    status: 'success',
    data: bookings,
  });
});
exports.booking = catchAsync(async (req, res, next) => {
  const listDoctor = await Doctor.find({ department: req.body.department });
  const doctors = listDoctor.filter((el) => el.status === true);
  const idx = Math.floor(Math.random() * doctors.length);
  const booking = await Booking.create({
    patient: req.body.patient,
    doctor: doctors[idx],
    date: req.body.date,
    time: req.body.time,
    department: req.body.department,
  });
  const data = await booking.doctor.populate('account');
  await data.account.populate('people');
  res.status(201).json({
    data: booking,
  });
});
