const express = require('express');
const path = require('path');
var cors = require('cors');
var morgan = require('morgan');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// import Routes
const authenRoutes = require('./routes/authenRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const uploadImageRoutes = require('./routes/uploadImageRoutes');
//start express app

const app = express();
app.use(express.static(path.join(__dirname, 'public/assets/image')));
app.use(cors());
// Body parser, reading data from body into req.body
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(morgan('dev'));

// #####################################################################
// ROUTE
//######################################################################

app.use('/api/authen', authenRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadImageRoutes);
app.get('/', (req, res) => {
  res.send('NO thing:3');
});

//server
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    autoIndex: true, //make this also true
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.log('error'));

let port = 3030;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// START SERVER
module.exports = app;
