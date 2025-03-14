const nodemailer = require("nodemailer");

const sendVerificationEmail = async ({ email }) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for port 465, false for other ports
        auth: {
          user: "alvarezdiego9714@gmail.com",
          pass: "kmwz nsgc bavc jffn ",
        },
      });


      const info = await transporter.sendMail({
        from: '"No reply" <alvarezdiego9714@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "Verifica tu cuenta para usarla en la libreria :)", // Subject line
        text: "Haz click en el enlace para verificar tu cuenta", // plain text body
        html: `<a href="http://localhost:3000/auth/verify/${email}">VERIFICAR MI  CUENTA</a>`, // html body
      });

        console.log("Message sent: %s", info.messageId);
        return { success: true, message: 'Email enviado exitosamente.' };
}


module.exports = {
    sendVerificationEmail
};