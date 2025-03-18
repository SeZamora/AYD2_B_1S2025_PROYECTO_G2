const { db } = require('../services/DBService');

const addEmployee = async ({ nombre, apellido, cui, telefono, correo, contrasenia, edad, genero, fecha, imagen, supervisores_id_supervisor, verificado }) => {
    try {
        const result = await db.query(
            `INSERT INTO empleados (nombre, apellido, cui, telefono, correo, contrasenia, edad, genero, fecha, fotografia, supervisores_id_supervisor, verificado, eliminado) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`,
            [nombre, apellido, cui, telefono, correo, contrasenia, edad, genero, fecha, imagen, supervisores_id_supervisor, verificado]
        );

        return result.affectedRows > 0
            ? { success: true, message: 'Empleado agregado exitosamente.', id_empleado: result.insertId }
            : { success: false, message: 'No se pudo agregar el empleado.' };
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error interno del servidor.' };
    }
};

const editInfo = async ({ old_email, new_email, phone_number }) => {
    try {
        const rows = await db.query(`SELECT * FROM empleados WHERE correo = ? AND eliminado = 0`, [old_email]);
        if (!rows.length) return { success: false, message: 'Usuario no encontrado.' };

        const result = await db.query(
            `UPDATE empleados SET correo = ?, telefono = ? WHERE correo = ?`,
            [new_email, phone_number, old_email]
        );

        return result.affectedRows > 0
            ? { success: true, message: 'Información actualizada exitosamente.' }
            : { success: false, message: 'No se realizaron cambios.' };
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error interno del servidor.' };
    }
};

const getAllEmployees = async () => {
    try {
        const result = await db.query(`SELECT * FROM empleados WHERE eliminado = 0`);
        result.forEach(employee => delete employee.contrasenia);
        return result.length > 0
            ? { success: true, employees: result }
            : { success: false, message: 'No hay empleados disponibles' };
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error interno del servidor' };
    }
};

const getAllEmployeeData = async () => {
    try {
        const result = await db.query(
            `SELECT e.*, f.id_facturas, f.nombre_vendedor, f.fecha_hora, f.total_venta, f.nombre_comprador, f.cuenta_id_cuenta 
             FROM empleados e 
             JOIN facturas f ON e.empleados_id = f.empleados_id `
        );

        const employeesMap = new Map();

        result.forEach(row => {
            if (!employeesMap.has(row.empleados_id)) {
                const { id_facturas, nombre_vendedor, fecha_hora, total_venta, nombre_comprador, cuenta_id_cuenta, ...employeeData } = row;
                employeeData.facturas = [];
                employeesMap.set(row.empleados_id, employeeData);
            }

            employeesMap.get(row.empleados_id).facturas.push({
                id_facturas: row.id_facturas,
                nombre_vendedor: row.nombre_vendedor,
                fecha_hora: row.fecha_hora,
                total_venta: row.total_venta,
                nombre_comprador: row.nombre_comprador,
                cuenta_id_cuenta: row.cuenta_id_cuenta
            });
        });

        const employeesArray = Array.from(employeesMap.values());

        return employeesArray.length > 0
            ? { success: true, employeeInvoices: employeesArray }
            : { success: false, message: 'No se encontraron facturas para los empleados' };
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error interno del servidor.' };
    }
};


const getEmployeeById = async (nombre) => {
    try {
        const result = await db.query(`SELECT * FROM empleados WHERE nombre = ? AND eliminado = 0`, [nombre]);

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

const deleteEmployee = async ({ empleados_id, reason_fired }) => {
    try {
        const rows = await db.query(`SELECT * FROM empleados WHERE empleados_id = ? AND eliminado = 0`, [empleados_id]);
        if (!rows.length) return { success: false, message: 'Empleado no encontrado.' };

        const fechaBaja = new Date().toISOString().split('T')[0];
        await db.query(
            `INSERT INTO auditoria_empleados 
            (empleados_id, nombre, apellido, cui, telefono, correo, edad, genero, fecha_alta, fecha_baja, fotografia, razon_desvinculacion) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                rows[0].empleados_id,
                rows[0].nombre,
                rows[0].apellido,
                rows[0].cui,
                rows[0].telefono,
                rows[0].correo,
                rows[0].edad,
                rows[0].genero,
                rows[0].fecha,
                fechaBaja,
                rows[0].fotografia,
                reason_fired || 'Razón no especificada',
            ]
        );

        const result = await db.query(
            `UPDATE empleados SET eliminado = 1 WHERE empleados_id = ?`,
            [empleados_id]
        );

        return result.affectedRows > 0
            ? { success: true, message: 'Empleado marcado como eliminado y registrado en auditoría.' }
            : { success: false, message: 'No se pudo eliminar el empleado.' };
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error interno del servidor.' };
    }
};

module.exports = {
    editInfo,
    addEmployee,
    getAllEmployees,
    getEmployeeById,
    deleteEmployee,
    getAllEmployeeData
};