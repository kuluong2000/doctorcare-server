const catchAsync = require('./../utils/catchAysnc');
const Booking = require('./../models/bookingModel');
const Doctor = require('./../models/doctorModel');
const Email = require('./../utils/email');

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
  const bookings = await Booking.find({
    doctor: req.params.id,
    date: req.query.date,
  })
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
    price: req.body.price,
    message: req.body.message,
    department: req.body.department,
  });
  const data = await booking.doctor.populate('account');
  await data.account.populate('people');
  const dataEmail = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    time: req.body.time,
    date: req.body.date,
  };

  await new Email(dataEmail).sendWelcome();
  res.status(201).json({
    data: booking,
  });
});

exports.updateBooking = catchAsync(async (req, res, next) => {
  const data = await Booking.findByIdAndUpdate(
    req.params.id,
    {
      diseases: req.body.diseases,
      note: req.body.note,
      medicine: req.body.medicine,
      status: true,
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
