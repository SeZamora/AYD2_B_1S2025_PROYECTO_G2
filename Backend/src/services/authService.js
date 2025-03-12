
const db = require('../services/DBService').default;
const encrypter = require('../services/encryptService');



const register = async ({ email, password, fullName, age }) => {
    try {
       
        const [rows] = await db.query(`SELECT * FROM cuenta WHERE correo = ?`, [email]);

      
        if (rows && rows.length > 0) {
            return { success: false, message: 'El correo electrónico ya está registrado.' };
        }

      // encriptar contraseña
        const hashedPassword = await encrypter.sha256(password);

      
        const result = await db.query(
            `INSERT INTO cuenta (correo, contrasenia, nombre, edad, verificado) VALUES (?, ?, ?, ?, ?)`,
            [email, hashedPassword, fullName, age, 0] 
        );

    
        if (result && result.affectedRows > 0) {
            return { success: true, message: 'Usuario registrado exitosamente.' };
        } else {
            return { success: false, message: 'Error al registrar el usuario.' };
        }
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return { success: false, message: 'Error interno del servidor.' };
    }
};


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
   
    login,
    register
};
