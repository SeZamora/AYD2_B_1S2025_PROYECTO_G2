const {db} = require('../services/DBService');

const addEmployee = async ({ nombre, apellido, cui, telefono, correo, contrasenia, edad, genero, fecha, imagen, supervisores_id_supervisor, verificado }) => {
    try {
        //console.log(fotografia)
        const result = await db.query(
            `INSERT INTO empleados (nombre, apellido, cui, telefono, correo, contrasenia, edad, genero, fecha, fotografia, supervisores_id_supervisor, verificado) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [nombre, apellido, cui, telefono, correo, contrasenia, edad, genero, fecha, imagen, supervisores_id_supervisor, verificado]
        );

        if (result.affectedRows > 0) {
            return { success: true, message: 'Empleado agregado exitosamente.', id_empleado: result.insertId };
        } else {
            return { success: false, message: 'No se pudo agregar el empleado.' };
        }
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error interno del servidor.' };
    }
};


const editInfo = async ({ old_email, new_email, phone_number }) => {
    try {

        const rows = await db.query(`SELECT * FROM empleados WHERE correo = ?`, [old_email]);
        

        const row = Array.isArray(rows) ? rows[0] : rows;

        if (!row) {
            return { success: false, message: 'Usuario no encontrado.' };
        }


        const result = await db.query(
            `UPDATE empleados SET correo = ?, telefono = ? WHERE correo = ?`,
            [new_email, phone_number, old_email]
        );


        if (result.affectedRows > 0) {
            return { success: true, message: 'Información actualizada exitosamente.' };
        } else {
            return { success: false, message: 'No se realizaron cambios (posiblemente los valores sean iguales).' };
        }

    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error interno del servidor.' };
    }
};


const getAllEmployees = async () => {
    try {
        const result = await db.query(`SELECT * FROM empleados`);

        if (result.length > 0) {
            // Eliminar la propiedad "contrasenia" de cada empleado
            result.forEach(employee => {
                delete employee.contrasenia;
            });

            return { success: true, employees: result };
        } else {
            return { success: false, message: 'No hay empleados disponibles' };
        }
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error interno del servidor' };
    }
};

const getEmployeeById = async (nombre) => {
    try {
        const result = await db.query(`SELECT * FROM empleados WHERE nombre = ?`, [nombre]);

        if (result.length > 0) {
            // Eliminar la propiedad "contrasenia" del empleado
            delete result[0].contrasenia;

            return { success: true, employee: result[0] };
        } else {
            return { success: false, message: 'No se encontró un empleado con ese nombre' };
        }
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error interno del servidor' };
    }
};


module.exports = {
   
    editInfo,
    addEmployee,
    getAllEmployees,
    getEmployeeById
};
