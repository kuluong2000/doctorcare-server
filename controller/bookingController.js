// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token in Account Info and set the environment variables.
// See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
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
  const start = new Date(req.query.date);
  const end = new Date(req.query.date);
  start.setUTCHours(0, 0, 0, 0);
  end.setUTCHours(23, 59, 59, 999);

  const bookings = await Booking.find({
    doctor: req.params.id,
    date: {
      $gte: start.toISOString(),
      $lte: end.toISOString(),
    },
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
  const doctor = req.body.doctor || doctors[idx]._id;
  const hour = req.body.time;
  const day = new Date(req.body.date).getDate();
  const month = new Date(req.body.date).getMonth() + 1;
  const count = await Booking.aggregate([
    {
      $project: {
        doctor: '$doctor',
        hour: '$time',
        day: { $dayOfMonth: '$date' },
        month: { $month: '$date' },
        year: { $year: '$date' },
      },
    },
    {
      $match: {
        day: Number(day),
        month: Number(month),
      },
    },
    {
      $group: {
        _id: {
          day: '$day',
          month: '$month',
          year: '$year',
          hour: '$hour',
          doctor: { $toString: '$doctor' },
        },
        total: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const counter = count.filter(
    (item) =>
      item._id.day === day &&
      item._id.month === month &&
      item._id.hour === hour &&
      item._id.doctor === doctor
  );
  console.log(counter);
  if (counter[0]?.total > 5)
    return res.status(400).send({
      error:
        'số lượng bệnh nhân tại khung giờ này đã hết, xin vui lòng chọn khung giờ khác',
    });
  else {
    const booking = await Booking.create({
      patient: req.body.patient,
      doctor: req.body.doctor || doctors[idx]._id,
      date: req.body.date,
      time: req.body.time,
      price: req.body.price,
      message: req.body.message,
      department: req.body.department,
    });

    await (
      await booking.populate('department', 'nameDepartment')
    ).populate('doctor');
    const data = await booking.doctor.populate('account');
    await data.account.populate('people');
    const dataEmail = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthday: req.body.birthday,
      phone: req.body.phone,
      message: req.body.message,
      gender: req.body.gender,
      doctor: `${booking.doctor.account.people.lastName} ${booking.doctor.account.people.firstName}`,
      date: req.body.date,
      time: req.body.time,
      department: booking.department.nameDepartment,
      price: req.body.price,
    };

    client.messages
      .create({
        body: 'Test booking',
        from: '+19036485267',
        to: `+84${req.body.phone}`,
      })
      .then((message) => console.log(message.sid));
    new Email(dataEmail).sendWelcome();
    res.status(201).json({
      data: booking,
    });
  }
});

exports.updateBooking = catchAsync(async (req, res, next) => {
  console.log('debug', req.body);
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
  const dataEmail = {
    email: req.body.patient.account.people.email,
    firstName: req.body.patient.account.people.firstName,
    lastName: req.body.patient.account.people.lastName,
    department: req.body.department.nameDepartment,
    doctor: `${req.body.doctor.account.people.lastName} ${req.body.doctor.account.people.firstName}`,
    diseases: req.body.diseases,
    note: req.body.note,
    medicine: req.body.medicine,
    message: req.body.message,
    price: req.body.price,
  };
  new Email(dataEmail).sendAttachment();
  res.status(200).json({
    status: 'success',
    data,
  });
});
