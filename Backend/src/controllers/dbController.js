const {db} = require('../services/DBService');



const testdb = async (req, res) => {
    try {

        console.log(db);
        console.log(typeof db.query);
        const users = await db.query('SELECT * FROM empleados');
        console.log(users);
        res.status(200).json(users);

    } catch (error) {
        console.error('Error en generarReceta:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};



module.exports = {
    
    testdb
};
