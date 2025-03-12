
const db = require('../services/DBService').default;



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




module.exports = {
   
    editInfo
};
