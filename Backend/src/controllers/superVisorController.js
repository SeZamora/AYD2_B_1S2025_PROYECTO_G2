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

const createSupervisor = async (req, res) => {
    try {
        const { gerente_id_gerente, nombre, email, contrasenia, telefono, fecha_ingreso } = req.body;
        const verificado = 0; // Se establece en 0 por defecto

        if (!gerente_id_gerente || !nombre || !email || !contrasenia || !telefono || !fecha_ingreso) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const result = await superVisorService.createSupervisor({ gerente_id_gerente, nombre, email, contrasenia, telefono, fecha_ingreso, verificado });
        res.status(200).json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al crear el supervisor' });
    }
};
const getAllSupervisors = async (req, res) => {
    try {
        const result = await superVisorService.getAllSupervisors();
        res.status(200).json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al obtener los supervisores' });
    }
};
const getSupervisorById = async (req, res) => {
    try {
        const { id_supervisor } = req.body;

        if (!id_supervisor) {
            return res.status(400).json({ message: 'El ID del supervisor es obligatorio' });
        }

        const result = await superVisorService.getSupervisorById(id_supervisor);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al obtener el supervisor' });
    }
};

module.exports = {
    
    editInfo,
    createSupervisor,
    getAllSupervisors,
    getSupervisorById
};

