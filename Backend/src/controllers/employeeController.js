const employeeService = require('../services/employeeService');

const addEmployee = async (req, res) => {
    try {
        const { nombre, apellido, cui, telefono, correo, contrasenia, edad, genero, fecha, supervisores_id_supervisor, verificado } = req.body;
        const fotografia = req.file ? req.file.buffer : null; // Imagen en buffer

        // Validar campos obligatorios
        if (!nombre || !apellido || !cui || !telefono || !correo || !contrasenia || !edad || !genero || !fecha || !supervisores_id_supervisor || !verificado || !fotografia) {
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
            fotografia,
            supervisores_id_supervisor,
            verificado
        });

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
const getEmployeeById = async (req, res) => {
    try {
        const { empleados_id } = req.body; // Se obtiene el ID desde el cuerpo de la solicitud

        if (!empleados_id) {
            return res.status(400).json({ message: 'El ID del empleado es obligatorio' });
        }

        const result = await employeeService.getEmployeeById(empleados_id);

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

module.exports = {
    
    editInfo,
    addEmployee,
    getAllEmployees,
    getEmployeeById
};

