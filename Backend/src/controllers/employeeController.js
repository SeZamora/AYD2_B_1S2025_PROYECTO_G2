const employeeService = require('../services/employeeService');
const multer = require('multer');
const emailService = require('../services/emailService');



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const addEmployee = async (req, res) => {
    try {
        const { nombre, apellido, cui, telefono, correo, contrasenia, edad, genero, fecha, supervisores_id_supervisor, verificado } = req.body;
        const imagen = req.file ? req.file.buffer : null; 
        // Validar campos obligatorios
        
        if (!nombre || !apellido || !cui || !telefono || !correo || !contrasenia || !edad || !genero || !fecha || !supervisores_id_supervisor || !verificado || !imagen) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }
        // Llamar al servicio para agregar al empleado
        const result = await employeeService.addEmployee({
            nombre,
            apellido,
            cui,
            telefono,
            correo,
            contrasenia,
            edad,
            genero,
            fecha,
            imagen,
            supervisores_id_supervisor,
            verificado
        });

        // Enviar correo de verificación
        const resultado_email = await emailService.sendVerificationEmail({
            email: correo,
            subject: 'Verificación de correo electrónico empleado',
            html: `
                <p>Bienvenido ${nombre}!</p>
                <p>Tus credenciales de inicio de sesión son:</p>
                <p>Correo: ${correo} <br>
                Password: ${contrasenia} </p>
                <p>
                    <a href="http://localhost:3000/auth/verify/${correo}/empleados">
                        VERIFICA TU CUENTA DE EMPLEADO
                    </a>
                </p>
            `
        });

        if (!result.success || !resultado_email.success) {
            return res.status(400).json({ status: 'error', message: result.message || 'Error al registrar el empleado.' });
        }



        res.status(200).json(result);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al agregar el empleado' });
    }
};


const editInfo = async (req, res) => {
    try {
        const {old_email, new_email, phone_number } = req.body;
        const result = await employeeService.editInfo({ old_email, new_email, phone_number });
        res.status(200).json(result);
    } catch (error) {
        console.error('Error :', error);
        res.status(500).json({ message: 'Usuario no encontrado' });
    }
};
const getAllEmployees = async (req, res) => {
    try {
        const result = await employeeService.getAllEmployees();
        
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'No hay empleados disponibles' });
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al obtener los empleados' });
    }
};
const getAllEmployeeData = async (req, res) => {
    try {
        const result = await employeeService.getAllEmployeeData();
        
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'No hay empleados disponibles' });
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al obtener los empleados' });
    }
};


const getEmployeeById = async (req, res) => {
    try {
        const { empleado_nombre } = req.body; // Se obtiene el empleado_nombre desde el cuerpo de la solicitud

        if (!empleado_nombre) {
            return res.status(400).json({ message: 'El empleado_nombre del empleado es obligatorio' });
        }

        const result = await employeeService.getEmployeeById(empleado_nombre);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al obtener el empleado' });
    }
};
const getEmployee = async (req, res) => {
    try {
        const { empleados_id } = req.body; // Se obtiene el ID desde el cuerpo de la solicitud

        if (!empleados_id) {
            return res.status(400).json({ message: 'El ID del empleado es obligatorio' });
        }

        const result = await employeeService.getEmployee(empleados_id);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al obtener el empleado' });
    }
};

const deleteEmployee = async(req, res) => {
    try {
        const { empleados_id, reason_fired } = req.body;
        if (!empleados_id || !reason_fired) {
            return res.status(400).json({ message: 'El ID del empleado y la razón del despido son obligatorios' });
        }
        const result = await employeeService.deleteEmployee({ empleados_id, reason_fired });
        res.status(200).json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al eliminar el empleado' });
    }

}


module.exports = {
    
    editInfo,
    addEmployee,
    getAllEmployees,
    getEmployeeById, 
    upload,
    getEmployee,
    deleteEmployee,
    getAllEmployeeData
};

