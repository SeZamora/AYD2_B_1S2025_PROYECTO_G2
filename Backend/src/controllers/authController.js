const authService = require('../services/authService');



const login = async (req, res) => {
    try {
        const { username, password, userType } = req.body;

        if (!username || !password || password.length === 0) {
            return res.status(400).json({ message: 'Se requiere el CUI del paciente y al menos un medicamento' });
        }

        const resultado = await authService.login({  username,  password, userType });

        if (!resultado.success) {
            return res.status(400).json({ status: 'error' , message });
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

      
        if (!resultado.success) {
            return res.status(400).json({ status: 'error', message: resultado.message || 'Error al registrar el usuario.' });
        }

     
        res.status(201).json(resultado);

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error en el servidor al intentar registrar al usuario.' });
    }
};


module.exports = {
    
    login,
    register
};
