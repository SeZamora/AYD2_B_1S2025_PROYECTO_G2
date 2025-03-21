const authService = require('../services/authService');
const EmailServiceFactory = require("../services/emailServiceFactory");

const emailService = EmailServiceFactory.createEmailService("smtp.gmail.com", 465, true, "alvarezdiego9714@gmail.com", "kmwz nsgc bavc jffn ");


const login = async (req, res) => {
    try {
        const { username, password, userType } = req.body;

        if (!username || !password || password.length === 0) {
            return res.status(400).json({ message: 'Se requiere el CUI del paciente y al menos un medicamento' });
        }

        const resultado = await authService.login({  username,  password, userType });

        if (!resultado.success) {
            return res.status(400).json({ status: 'error' , message: resultado.message  });
        }

        res.status(201).json(resultado);

    } catch (error) {
        console.error('Error :', error);
        res.status(500).json({ message: 'Usuario no encontrado' });
    }
};

const register = async (req, res) => {
    try {
      
        const { email, password, fullName, age } = req.body;

       
        if (!email || !password || password.length === 0 || !fullName || !age) {
            return res.status(400).json({ message: 'Se requiere correo electrónico, contraseña, nombre completo y edad.' });
        }

       
        const resultado = await authService.register({ email, password, fullName, age });

        const resultado_email = await emailService.sendEmail({ email, subject: 'Verificación de correo electrónico',  html: `<a href="http://localhost:3000/auth/verify/${email}/cuenta">VERIFICAR MI  CUENTA</a>` });

      
        if (!resultado.success || !resultado_email.success) {
            return res.status(400).json({ status: 'error', message: resultado.message || 'Error al registrar el usuario.' });
        }

     
        res.status(201).json(resultado);

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error en el servidor al intentar registrar al usuario.' });
    }
};


const verifyEmail = async (req, res) => {
    const { email, usertype } = req.params;
    try {
        const resultado = await authService.verifyEmail(email, usertype);
        res.send(`<h1> ${resultado.message} </h1>`);


    } catch (error) {

        res.send(`<h1> ERROR INTERNO EN SERVIDOR </h1>`);


    }
};


const recoverPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const resultado = await authService.recoverPassword(email);
        if (resultado.success) {
            const result = await emailService.sendEmail({
                email,
                subject: 'Recuperación de contraseña',
                html: `
                    <p> Hola! </p>
                    <p> Tu contraseña es: ${resultado.password} </p>
                    <p> Te recomendamos cambiar tu contraseña una vez que hayas iniciado sesión. </p>
                `
            });
            if (!result.success) {
                return res.status(400).json({ status: 'error', message: result.message || 'Error al enviar el correo electrónico.' });
            }
        }

        res.status(200).json(resultado);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al recuperar la contraseña' });
    }
};



module.exports = {
    
    login,
    register,
    verifyEmail,
    recoverPassword
};
