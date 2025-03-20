const nodemailer = require("nodemailer");
require("dotenv").config();

class MailTransportFactory {

  static createTransport(host, port, secure, user, pass) {
    return nodemailer.createTransport({
      host: host ,
      port: port,
      secure: secure,
      auth: {
        user: user,
        pass: pass,
      },
    });

  }
}

class EmailService {
  constructor(transporter) {
    this.transporter = transporter;
  }

  async sendEmail({ email, subject, html }) {
    try {
      const info = await this.transporter.sendMail({
        from: `"No reply" <${process.env.SMTP_USER}>`,
        to: email,
        subject,
        html,
      });

      console.log("Message sent: %s", info.messageId);
      return { success: true, message: "Email enviado exitosamente." };
    } catch (error) {
      console.error("Error al enviar el email:", error);
      return { success: false, message: "Error al enviar el email." };
    }
  }
}

class EmailServiceFactory {
  static createEmailService(host, port, secure, user, pass) {
    const transporter = MailTransportFactory.createTransport(host , port, secure, user, pass);
    return new EmailService(transporter);
  }
}

module.exports = EmailServiceFactory;
