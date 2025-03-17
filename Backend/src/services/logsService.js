const { db } = require('../services/DBService');

const getAllEmployeeLogs = async () => {
    try {
        const result = await db.query(`SELECT * FROM auditoria_empleados`);

        if (result.length > 0) {
            return { success: true, logs_employees: result };
        } else {
            return { success: false, message: 'No hay logs de empleado disponibles.' };
        }
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error interno del servidor.' };
    }
};


const getAllSupervisorLogs = async () => {

    try {
        const result = await db.query(`SELECT * FROM auditoria_supervisores`);

        if (result.length > 0) {
            return { success: true, logs_supervisors: result };
        } else {
            return { success: false, message: 'No hay logs de supervisor disponibles.' };
        }
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error interno del servidor.' };
    }

  }


module.exports = {
    getAllEmployeeLogs,
    getAllSupervisorLogs
};