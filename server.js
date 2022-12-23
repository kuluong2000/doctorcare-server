// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// dotenv.config({ path: './config.env' });
// const app = require('./index');

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     autoIndex: true, //make this also true
//   })
//   .then(() => console.log('DB connection successful!'))
//   .catch((err) => console.log('error'));

// let port = process.env.PORT || 3030;
// app.listen(5000, () => {
//   console.log(`App running on port ${port}...`);
// });
