const {db} = require('../services/DBService');
//const S3Service = require('../services/S3Service');

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
        const rows = await db.query(`SELECT id_producto, nombre, descripcion, codigo, categoria, precio_compra, precio_venta, cantidad, imagen FROM producto WHERE disponible = 1`);
        
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


const getProduct = async (id_producto) => {
    try {
        const rows = await db.query(`SELECT * FROM producto WHERE id_producto = ? AND disponible = 1`, [id_producto]);

        if (rows.length > 0) {
            const product = rows[0];
            product.imagen = product.imagen ? product.imagen.toString('base64') : null;

            return { success: true, product };
        } else {
            return { success: false, message: 'No se encontró un producto con ese ID' };
        }
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error interno del servidor.' };
    }
};

const getProductById = async (nombre_producto) => {
    try {
        const rows = await db.query(`SELECT * FROM producto WHERE nombre = ? AND disponible = 1`, [nombre_producto]);

        if (rows.length > 0) {
            const product = rows[0];
            product.imagen = product.imagen ? product.imagen.toString('base64') : null;

            return { success: true, product };
        } else {
            return { success: false, message: 'No se encontró un producto con ese nombre' };
        }
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error interno del servidor.' };
    }
};

const editProduct = async ({ id_producto, descripcion, precio_venta, cantidad }) => {
    if (!id_producto) {
        return { success: false, message: 'El ID del producto es obligatorio.' };
    }

    try {
        const result = await db.query(
            `UPDATE producto 
             SET descripcion = ?, precio_venta = ?, cantidad = ? 
             WHERE id_producto = ?`,
            [descripcion, precio_venta, cantidad, id_producto]
        );

        return result.affectedRows > 0
            ? { success: true, message: 'Producto actualizado exitosamente.' }
            : { success: false, message: 'No se pudo actualizar el producto o no hubo cambios.' };
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error interno del servidor.' };
    }
};
const deleteProduct = async (id_producto) => {
    try {
        const result = await db.query(
            `UPDATE producto SET disponible = 0 WHERE id_producto = ?`, 
            [id_producto]
        );

        if (result.affectedRows > 0) {
            return { success: true, message: 'Producto marcado como no disponible.' };
        } else {
            return { success: false, message: 'No se pudo actualizar el estado del producto.' };
        }
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error interno del servidor.' };
    }
}

const StockGeneral = async (stockGeneral) => {
    try {
        if (stockGeneral === undefined) {
            return { success: false, message: 'Se requiere un valor para stockGeneral' };
        }

        const result = await db.query(
            `UPDATE producto SET stock_minimo = ? WHERE stock_minimo IS NULL OR stock_minimo <> ?`,
            [stockGeneral, stockGeneral]
        );

        if (result.affectedRows > 0) {
            return { success: true, message: 'Stock general configurado correctamente.' };
        } else {
            return { success: false, message: 'No se pudo actualizar el stock general.' };
        }
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error interno del servidor.' };
    }
};

const StockPorProducto = async (id_producto, stock_minimo ) => {
    try {
       
        const result = await db.query(
            `UPDATE producto SET stock_minimo = ? WHERE id_producto = ?`,
            [stock_minimo, id_producto]
        );

        if (result.affectedRows > 0) {
            return { success: true, message: `Stock mínimo actualizado para el producto ${id_producto}.` };
        } else {
            return { success: false, message: 'No se pudo actualizar el stock mínimo del producto.' };
        }
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error interno del servidor.' };
    }
};

const alertasStock = async () => {
    try {
        const result = await db.query(`
            SELECT id_producto, nombre, cantidad, stock_minimo
            FROM producto
            WHERE cantidad < stock_minimo
        `);


        if (result !== undefined) {
            return { success: true, alertas: result };
        } else {
            return { success: false, message: 'No hay alertas de stock.' };
        }
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error interno del servidor.' };
    }
};
module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    editProduct,
    getProduct,
    deleteProduct,
    StockGeneral,
    StockPorProducto,
    StockPorProducto,
    alertasStock
};