const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');
module.exports = class Email {
  constructor(user) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.birthday = user.birthday;
    this.phone = user.phone;
    this.message = user.message;
    this.gender = user.gender;
    this.doctor = user.doctor;
    this.date = user.date;
    this.time = user.time;
    this.department = user.department;
    this.from = `Jio Health <${process.env.EMAIL_FROM}>`;
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
  async send(html, subject) {
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
    await this.send(
      `<div style="margin: 0 auto; width: 100%;">
      <div style="width: max-content;">
        <h2 style="margin: 0; color: #111c63;">Dịch vụ</h2>
        <div style="display: flex;">
          <p style="margin-right: 10px;">Hình thức khám:</p>
          <p>Khám chuyên khoa tại phòng khám</p>
        </div>
      </div>
      <div style="width: max-content;">
        <h2 style="margin: 0; color: #111c63;">Khách hàng</h2>
        <div style="display: flex;">
          <div>
            <p style="margin-right: 10px;">khách hàng:</p>
            <p style="margin-right: 10px;">Ngày sinh:</p>
            <p style="margin-right: 10px;">Giới tính:</p>
            <p style="margin-right: 10px;">Số điện thoại:</p>
            <p style="margin-right: 10px;">Lý do khám:</p>
          </div>
          <div>
            <p>${this.lastName} ${this.firstName}</p>
            <p>${this.birthday}</p>
            <p>${this.gender}</p>
            <p>${this.phone}</p>
            <p>${this.message}</p>
          </div>
        </div>
      </div>
      <div style="width: max-content;">
        <h2 style="margin: 0; color: #111c63;">Bác sĩ</h2>
        <div style="display: flex;">
          <p style="margin-right: 10px;">Bác sĩ:</p>
          <p >${this.doctor || ''}</p>
        </div>
      </div>
      <div style="width: max-content;">
        <h2 style="margin: 0; color: #111c63;">Thông tin chi tiết</h2>
        <div style="display: flex;">
          <div>
            <p style="margin-right: 10px;">Ngày đặt:</p>
            <p style="margin-right: 10px;">Thời gian khám:</p>
            <p style="margin-right: 10px;">Chuyên khoa:</p>
          </div>
          <div>
            <p>${this.date}</p>
            <p>${this.time}</p>
            <p>${this.department}</p>
          </div>
        </div>
      </div>
    </div>`,
      'Cảm ơn bạn đã đặt lịch khám tại Jio Health'
    );
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
