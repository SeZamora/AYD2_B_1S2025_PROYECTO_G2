
const db = require('../services/DBService').default;
const encrypter = require('../services/encryptService');





const login = async ({ username, password, userType }) => {
    try {
        console.log(username, password, userType);
        console.log('password encriptado', await encrypter.sha256(password));

        const users = await db.query(`SELECT * FROM ${userType} WHERE correo = ? AND contrasenia = ? AND verificado = 1`, [username, await encrypter.sha256(password)]);



        if (users.length === 0) {
            return { success: false, message: 'Usuario o contraseña incorrectos' };
        }
        // add user email to the response
        return { success: true , message: 'wujuuu', userType, email: username };


    } catch (error) {
        console.error('Error al generar la receta:', error);
        return { success: false, message: 'Error interno del servidor' };
    }
};






module.exports = {
   
    login
};
