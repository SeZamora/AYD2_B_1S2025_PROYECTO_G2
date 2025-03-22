
const {db} = require('../services/DBService');
const encrypter = require('../services/encryptService');



const register = async ({ email, password, fullName, age }) => {
    try {
       
        const [rows] = await db.query(`SELECT * FROM cuenta WHERE correo = ?`, [email]);

      
        if (rows && rows.length > 0) {
            return { success: false, message: 'El correo electrónico ya está registrado.' };
        }


        const hashedPassword = encrypter.encrypt(password);

      
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

        const users = await db.query(`SELECT * FROM ${userType} WHERE correo = ? AND contrasenia = ? AND verificado = 1`, [username, encrypter.encrypt(password)]);



        if (users.length === 0) {
            return { success: false, message: 'Usuario o contraseña incorrectos' };
        }
        // add user email to the response
        return { success: true , message: 'Inicio de sesión exitoso', userType, email: username };


    } catch (error) {
        console.error('Error al generar la receta:', error);
        return { success: false, message: 'Error interno del servidor' };
    }
};


const verifyEmail = async (email, usertype) => {
    try {
        const result = await db.query(
            `UPDATE ${usertype} SET verificado = 1 WHERE correo = ?`,
            [email]
        );


        if (result.affectedRows > 0) {
            return { success: true, message: 'Correo verificado exitosamente.' };
        } else {
            return { success: false, message: 'No se encontró una cuenta con este correo.' };
        }
    } catch (error) {
        
        console.error('Error al verificar correo:', error);
        return { success: false, message: 'Error interno del servidor.' };
    }
};


const recoverPassword = async (email) => {
    try {
        const rows = await db.query(`SELECT * FROM cuenta WHERE correo = ?`, [email]);

        if (rows.length === 0) {
            return { success: false, message: 'No se encontró una cuenta con este correo.' };
        }
        // recover password

        const contrasenia = encrypter.decrypt(rows[0].contrasenia); 
        

        return { success: true, message: 'Correo enviado exitosamente.', password: contrasenia  };
    } catch (error) {
        console.error('Error al recuperar contraseña:', error);
        return { success: false, message: 'Error interno del servidor.' };
    }
};





module.exports = {
   
    login,
    register,
    verifyEmail,
    recoverPassword
};
