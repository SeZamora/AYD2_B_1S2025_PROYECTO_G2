const superVisorService = require('../services/superVisorService');



const editInfo = async (req, res) => {
    try {
        const {old_email, new_email, phone_number } = req.body;
        const result = await superVisorService.editInfo({ old_email, new_email, phone_number });
        res.status(200).json(result);
    } catch (error) {
        console.error('Error :', error);
        res.status(500).json({ message: 'Usuario no encontrado' });
    }
};


module.exports = {
    
    editInfo
};

