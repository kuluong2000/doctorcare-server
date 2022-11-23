const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');
module.exports = class Email {
  constructor(user) {
    this.to = user.email;
    this.from = `Hữu Lương<${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    // Sendgrid
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_APP,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(temp, subject) {
    const html = `<p>hello world</p>`;
    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('test');
  }
};
// const nodemailer = require('nodemailer');
// const htmlToText = require('html-to-text');

// module.exports = class Email {
//   constructor(user) {
//     this.to = 'luong@mailsac.com';
//     this.firstName = user.firstName;
//     this.from = `luong tran<${process.env.EMAIL_FROM}>`;
//   }
//   newTransport() {
//     return nodemailer.createTransport({
//       // service: 'SendGrid',
//       host: 'smtp.sendgrid.net',
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.SENDGRID_USERNAME,
//         pass: process.env.SENDGRID_PASSWORD,
//       },
//     });
//   }
//   async send(subject) {
//     // 2) Define email options
//     const mailOptions = {
//       from: this.from,
//       to: this.to,
//       subject,
//       text: 'demo',
//     };
//     // 3) Create a transport and send email
//     await this.newTransport().sendMail(mailOptions);
//   }
//   async sendWelcome() {
//     await this.send('welcome to jio health');
//   }
// };
