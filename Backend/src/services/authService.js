const pool = require('../database/connection');



const login = async ({ username, password, userType }) => {
    try {
        console.log(username, password, userType);



        return { success: true , message: 'wujuuu' };


    } catch (error) {
        console.error('Error al generar la receta:', error);
        return { success: false, message: 'Error interno del servidor' };
    }
};






module.exports = {
   
    login
};
