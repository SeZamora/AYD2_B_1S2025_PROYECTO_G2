const {db} = require('../services/DBService');
const encrypter = require('../services/encryptService');



const editInfo = async ({ old_email, new_email, phone_number }) => {
    try {

        const rows = await db.query(`SELECT * FROM supervisores WHERE correo = ?`, [old_email]);
        

        const row = Array.isArray(rows) ? rows[0] : rows;

        if (!row) {
            return { success: false, message: 'Usuario no encontrado.' };
        }


        const result = await db.query(
            `UPDATE supervisores SET correo = ?, telefono = ? WHERE correo = ?`,
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

const createSupervisor = async ({ gerente_id_gerente, nombre, email, contrasenia, telefono, fecha_ingreso, verificado }) => {
    try {
        const hashedPassword = await encrypter.sha256(contrasenia);
        

        const result = await db.query(
            `INSERT INTO supervisores (gerente_id_gerente, nombre_completo, correo, contrasenia, telefono, fecha, verificado) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [gerente_id_gerente, nombre, email, hashedPassword, telefono, fecha_ingreso, verificado]
        );

        if (result.affectedRows > 0) {
            return { success: true, message: 'Supervisor creado exitosamente.', id_supervisor: result.insertId };
        } else {
            return { success: false, message: 'No se pudo crear el supervisor.' };
        }
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error interno del servidor.' };
    }
};
const getAllSupervisors = async () => {
    try {
        const rows = await db.query(
            `SELECT id_supervisor, gerente_id_gerente, nombre_completo AS nombre, correo AS email, telefono, fecha AS fecha_ingreso, verificado FROM supervisores`
        );

        return { success: true, data: rows };
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error interno del servidor.' };
    }
};

const getSupervisorById = async (id_supervisor) => {
    try {
        const rows = await db.query(
            `SELECT id_supervisor, gerente_id_gerente, nombre_completo AS nombre, correo AS email, telefono, fecha AS fecha_ingreso, verificado 
             FROM supervisores WHERE id_supervisor = ?`,
            [id_supervisor]
        );

        if (rows.length === 0) {
            return { success: false, message: 'Supervisor no encontrado' };
        }

        return { success: true, data: rows[0] };
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error interno del servidor.' };
    }
};
const deleteSupervisor = async ({ id_supervisor, reason_fired }) => {
    try {
        const [supervisor] = await db.query(
            `SELECT * FROM supervisores WHERE id_supervisor = ?`,
            [id_supervisor]
        );

        if (!supervisor) {
            return { success: false, message: 'Supervisor no encontrado.' };
        }

        const fechaBaja = new Date().toLocaleString('es-ES', { 
            timeZone: 'America/Mexico_City', 
            year: 'numeric', month: '2-digit', day: '2-digit' 
        }).split('/').reverse().join('-');
        

        await db.query(
            `INSERT INTO auditoria_supervisores 
            (id_supervisor, nombre_completo, correo, telefono, fecha_alta, fecha_baja, razon_desvinculacion) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                supervisor.id_supervisor,
                supervisor.nombre_completo,
                supervisor.correo,
                supervisor.telefono,
                supervisor.fecha, 
                fechaBaja,
                reason_fired || 'Razón no especificada',
            ]
        );

        // Eliminar el supervisor de la tabla principal
        const result = await db.query(
            `DELETE FROM supervisores WHERE id_supervisor = ?`,
            [id_supervisor]
        );

        if (result.affectedRows > 0) {
            return { success: true, message: 'Supervisor eliminado exitosamente y registrado en auditoría.' };
        } else {
            return { success: false, message: 'No se pudo eliminar el supervisor.' };
        }
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error interno del servidor.' };
    }
};




module.exports = {
   
    editInfo,
    createSupervisor,
    getAllSupervisors,
    getSupervisorById,
    deleteSupervisor
};

