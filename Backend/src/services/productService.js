const db = require('../services/DBService').default;

const addProduct = async ({ nombre, descripcion, codigo, categoria, precio_compra, precio_venta, cantidad, imagen }) => {
    try {
        const result = await db.query(
            `INSERT INTO producto (nombre, descripcion, codigo, categoria, precio_compra, precio_venta, cantidad, imagen) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [nombre, descripcion, codigo, categoria, precio_compra, precio_venta, cantidad, imagen]
        );

        if (result.affectedRows > 0) {
            return { success: true, message: 'Producto agregado exitosamente.', id_producto: result.insertId };
        } else {
            return { success: false, message: 'No se pudo agregar el producto.' };
        }
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error interno del servidor.' };
    }
};


const getAllProducts = async () => {
    try {
        const rows = await db.query(`SELECT id_producto, nombre, descripcion, codigo, categoria, precio_compra, precio_venta, cantidad, imagen FROM producto`);
        
        const products = rows.map(product => ({
            ...product,
            imagen: product.imagen ? product.imagen.toString('base64') : null
        }));

        return { success: true, data: products };
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error interno del servidor.' };
    }
};


module.exports = {
    addProduct,
    getAllProducts
};
