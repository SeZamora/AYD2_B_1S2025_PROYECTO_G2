const {db} = require('../services/DBService');
const addBill = async ({ nombre_vendedor, fecha_hora, total_venta, nombre_comprador, cuenta_id_cuenta, empleados_id, detalles }) => {
    try {
        // Insertar factura
        const facturaResult = await db.query(
            `INSERT INTO facturas (nombre_vendedor, fecha_hora, total_venta, nombre_comprador, cuenta_id_cuenta, empleados_id) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [nombre_vendedor, fecha_hora, total_venta, nombre_comprador, cuenta_id_cuenta, empleados_id]
        );

        const facturaId = facturaResult.insertId; 
        const detalleQueries = detalles.map(({ unidades_compradas, precio_producto, producto_id, libro_id }) => {
            const result = db.query(
                `INSERT INTO detalle_factura (factura_id, unidades_compradas, precio_producto, producto_id, libro_id) 
                 VALUES (?, ?, ?, ?, ?)`,
                [facturaId, unidades_compradas, precio_producto, producto_id || null, libro_id || null]
            );
                // Actualizar el stock si es producto o libro
            if (producto_id) {
                db.query(
                    `UPDATE producto SET cantidad = cantidad - ? WHERE id_producto = ?`,
                    [unidades_compradas, producto_id]
                );
            } else if (libro_id) {
                db.query(
                    `UPDATE libros SET stock = stock - ? WHERE id_libro = ?`,
                    [unidades_compradas, libro_id]
                );
            }
            return result;
        });
       
       
        await Promise.all(detalleQueries);

        return { success: true, message: 'Factura agregada exitosamente.', id_factura: facturaId };
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error al agregar la factura.' };
    }
};
const getAllBills = async () => {
    try {
        // Obtener facturas con detalles
        const facturas = await db.query(`
            SELECT 
                f.id_facturas,
                f.nombre_vendedor,
                f.fecha_hora,
                f.total_venta,
                f.nombre_comprador,
                f.cuenta_id_cuenta,
                f.empleados_id,
                d.id_detalle,
                d.unidades_compradas,
                d.precio_producto,
                d.producto_id,
                p.nombre,
                d.libro_id,
                l.titulo
            FROM facturas f
            LEFT JOIN detalle_factura d ON f.id_facturas = d.factura_id
            LEFT JOIN libros l ON d.libro_id = l.id_libro
            LEFT JOIN producto p ON d.producto_id = p.id_producto
            `);

    
        const facturasConDetalles = facturas.reduce((acc, factura) => {
            const { id_facturas, nombre_vendedor, fecha_hora, total_venta, nombre_comprador, cuenta_id_cuenta, empleados_id, id_detalle, unidades_compradas, precio_producto, producto_id, nombre, libro_id, titulo } = factura;

         
            if (!acc[id_facturas]) {
                acc[id_facturas] = {
                    id_facturas,
                    nombre_vendedor,
                    fecha_hora,
                    total_venta,
                    nombre_comprador,
                    cuenta_id_cuenta,
                    empleados_id,
                    detalles: []
                };
            }

            if (id_detalle) {
                acc[id_facturas].detalles.push({
                    id_detalle,
                    unidades_compradas,
                    precio_producto,
                    producto_id,
                    nombre,
                    libro_id,
                    titulo
                });
            }

            return acc;
        }, {});

        
        const result = Object.values(facturasConDetalles);

        return { success: true, data: result };
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error al obtener las facturas.' };
    }
};

const getBillById = async (id_facturas) => {
    try {
    
        const facturas = await db.query(`SELECT * FROM facturas WHERE id_facturas = ?`, [id_facturas]);

        if (facturas.length === 0) {
            return { success: false, message: 'Factura no encontrada.' };
        }

       
        const detalles = await db.query(`SELECT d.*, p.nombre, l.titulo
            FROM detalle_factura d
            LEFT JOIN producto p ON d.producto_id = p.id_producto
            LEFT JOIN libros l ON d.libro_id = l.id_libro
            WHERE d.factura_id = ?
                `, 
            
            
            [id_facturas]);

        return { success: true, data: { ...facturas[0], detalles } };
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error al obtener la factura.' };
    }
};
module.exports = {
    addBill,
    getAllBills,
    getBillById
};

