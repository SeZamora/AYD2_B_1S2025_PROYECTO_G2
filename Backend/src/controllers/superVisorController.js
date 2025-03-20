const superVisorService = require('../services/superVisorService.js');
const EmailServiceFactory = require("../services/emailServiceFactory");

const emailService = EmailServiceFactory.createEmailService("smtp.gmail.com", 465, true, "alvarezdiego9714@gmail.com", "kmwz nsgc bavc jffn ");






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
        const resultado_email = await emailService.sendEmail({ 
            email, 
            subject: 'Verificación de correo electrónico supervisor', 
            html: `
                <p>Bienvenido ${nombre}!</p>
                <p>Tus credenciales de inicio de sesión son:</p>
                <p>Correo: ${email} <br> 
                Password: ${contrasenia} </p>
                <p>
                    <a href="http://localhost:3000/auth/verify/${email}/supervisores">
                        VERIFICA TU CUENTA DE SUPERVISOR
                    </a>
                </p>
            ` 
        });
        
        if (!result.success || !resultado_email.success) {
            return res.status(400).json({ status: 'error', message: result.message || 'Error al registrar el supervisor.' });
        }

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

const deleteSupervisor = async (req, res) => {
    try {
        const { id_supervisor, reason_fired } = req.body;

        if (!id_supervisor || !reason_fired) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const result = await superVisorService.deleteSupervisor({ id_supervisor, reason_fired });
        res.status(200).json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al eliminar el supervisor' });
    }
};



module.exports = {
    editInfo,
    createSupervisor,
    getAllSupervisors,
    getSupervisorById,
    deleteSupervisor
};
