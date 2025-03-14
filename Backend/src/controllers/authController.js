const authService = require('../services/authService');
const emailService = require('../services/emailService');


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

        const resultado_email = await emailService.sendVerificationEmail({ email });

      
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
    const { email } = req.params;
    try {
        const resultado = await authService.verifyEmail(email);
        res.send(`<h1> ${resultado.message} </h1>`);


    } catch (error) {

        res.send(`<h1> ERROR INTERNO EN SERVIDOR </h1>`);


    }
};


module.exports = {
    
    login,
    register,
    verifyEmail
};
