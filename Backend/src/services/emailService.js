const nodemailer = require("nodemailer");

const sendVerificationEmail = async ({ email, subject, html }) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "alvarezdiego9714@gmail.com",
          pass: "kmwz nsgc bavc jffn ",
        },
      });

      const info = await transporter.sendMail({
        from: '"No reply" <alvarezdiego9714@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: `${subject}`, // Subject line
        html: `${html}`, // html body
      });

        console.log("Message sent: %s", info.messageId);
        return { success: true, message: 'Email enviado exitosamente.' };
}


module.exports = {
    sendVerificationEmail
};