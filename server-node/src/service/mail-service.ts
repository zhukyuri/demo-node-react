import nodemailer from 'nodemailer';

class MailService {
  transporter: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, link) {
    const sendData = {
      from: process.env.SMTP_USER,
      to,
      subject: `Activation account to ${process.env.API_URL}`,
      text: 'text',
      html: `
        <div>
          <a href='${link}'>${link}</a>
        </div>
      `,
    };
    await this.transporter.sendMail(sendData);
  }
}

export default new MailService;
