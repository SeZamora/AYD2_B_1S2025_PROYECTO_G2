const authService = require('../services/authService');



const login = async (req, res) => {
    try {
        const { username, password, userType } = req.body;

        if (!username || !password || password.length === 0) {
            return res.status(400).json({ message: 'Se requiere el CUI del paciente y al menos un medicamento' });
        }

        const resultado = await authService.login({  username,  password, userType });

        if (!resultado.success) {
            return res.status(400).json({ status: 'error' ,message });
        }

        res.status(201).json(resultado);

    } catch (error) {
        console.error('Error :', error);
        res.status(500).json({ message: 'Usuario no encontrado' });
    }
};



module.exports = {
    
    login
};
