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
    this.diseases = user.diseases;
    this.medicine = user.medicine;
    this.note = user.note;
    this.price = user.price;
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
      <div>
        <h3>xin chào ${this.firstName}.</h3>
        <p>Chúng tôi có nhận được một lịch hẹn khám từ ${
          this.firstName
        }. Chúng tôi rất lấy làm vinh dự khi được sự tin tưởng từ bạn. Dưới đây là thông tin chi tiết lịch khám của bạn. Nếu có thắc mắc xin vui lòng liên hệ vào hotline <strong>19001010</strong> để được giải đáp thắc mắc</p>
      </div>
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
            <p>${new Date(this.date).toLocaleDateString()}</p>
            <p>${this.time}</p>
            <p>${this.department}</p>
          </div>
        </div>
      </div>
    </div>`,
      'Cảm ơn bạn đã đặt lịch khám tại Jio Health'
    );
  }
  async sendAttachment() {
    await this.send(
      `<div style="margin: 0 auto;">
      <h2 style="margin: 0 0 5px 0;">
        Cảm ơn bạn đã tin tưởng đặt lịch khám bệnh tại Hệ thống Jio Health
      </h2>
      <p style="margin: 0;">
        Sau khi bạn đã khám tại phòng khám của bác sĩ ${this.doctor}, bạn có thể
        xem lại chi tiết lịch khám bệnh từ email này
      </p>
      <table
        style="
            margin-top: 20px;
            border: 1px solid red;
            border-collapse: collapse;
        "
      >
        <tbody>
          <tr style="height: 30px;">
            <td  style="text-align: center; border: 1px solid black; width: 100px;">Họ và tên</td>
            <td  style="margin-left: 10px; padding: 10px; border: 1px solid black;">
              ${this.lastName} ${this.firstName}
            </td>
          </tr>
           <tr style="height: 30px;">
            <td style="text-align: center; border: 1px solid black;">Bác sĩ Khám</td>
            <td style="margin-left: 10px; padding: 10px; border: 1px solid black;">
              ${this.doctor}
            </td>
          </tr>
          </tr>
           <tr style="height: 30px;">
            <td style="text-align: center; border: 1px solid black;">Khoa khám</td>
            <td style="margin-left: 10px; padding: 10px; border: 1px solid black;">
              ${this.department}
            </td>
          </tr>
          <tr style="height: 30px;">
            <td style="text-align: center; border: 1px solid black;">Chẩn đoán</td>
            <td style="margin-left: 10px; padding: 10px; border: 1px solid black;">${this.diseases}</td>
          </tr>
          <tr style="height: 30px;">
            <td style="text-align: center; border: 1px solid black;">Thuốc</td>
            <td style="margin-left: 10px; padding: 10px; border: 1px solid black;">${this.medicine}</td>
          </tr>
          <tr style="height: 30px;">
            <td style="text-align: center; border: 1px solid black;">Ghi chú</td>
            <td style="margin-left: 10px; padding: 10px; border: 1px solid black;">${this.note}</td>
          </tr>
          <tr style="height: 30px;">
            <td style="text-align: center; border: 1px solid black;">Giá tiền</td>
            <td style="margin-left: 10px; padding: 10px; border: 1px solid black;">${this.price} VNĐ</td>
          </tr>
        </tbody>
      </table>
      <p style="margin: 10px 0 0 0;">
        Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi
      </p>
      <p style="margin: 10px 0 0 0;">
        Nếu bạn có gì thắc mắc, vui lòng liên hệ hotline
        <strong> 19001010</strong> để được giải đáp.
      </p>
    </div>`,
      'Jio Health-Chăm sóc sức khỏe cho mọi người'
    );
  }
};
