const {db} = require('../services/DBService');
const addBill = async ({ nombre_vendedor, fecha_hora, total_venta, nombre_comprador, cuenta_id_cuenta, empleados_id, detalles }) => {
    try {
        // Insertar factura
        const facturaResult = await db.query(
            `INSERT INTO facturas (nombre_vendedor, fecha_hora, total_venta, nombre_comprador, cuenta_id_cuenta, empleados_id) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [nombre_vendedor, fecha_hora, total_venta, nombre_comprador, cuenta_id_cuenta, empleados_id]
        );

        const facturaId = facturaResult.insertId; // Obtener el ID de la factura insertada

        // Preparar inserción de detalles
        const detalleQueries = detalles.map(({ unidades_compradas, precio_producto, producto_id, libro_id }) => {
            return db.query(
                `INSERT INTO detalle_factura (factura_id, unidades_compradas, precio_producto, producto_id, libro_id) 
                 VALUES (?, ?, ?, ?, ?)`,
                [facturaId, unidades_compradas, precio_producto, producto_id || null, libro_id || null]
            );
        });

        // Ejecutar todas las inserciones de detalles en paralelo
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
                d.libro_id
            FROM facturas f
            LEFT JOIN detalle_factura d ON f.id_facturas = d.factura_id
        `);

        // Organizar los resultados para que cada factura tenga su lista de detalles
        const facturasConDetalles = facturas.reduce((acc, factura) => {
            const { id_facturas, nombre_vendedor, fecha_hora, total_venta, nombre_comprador, cuenta_id_cuenta, empleados_id, id_detalle, unidades_compradas, precio_producto, producto_id, libro_id } = factura;

            // Si no existe la factura en el acumulador, la agregamos
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

            // Agregar el detalle a la factura
            if (id_detalle) {
                acc[id_facturas].detalles.push({
                    id_detalle,
                    unidades_compradas,
                    precio_producto,
                    producto_id,
                    libro_id
                });
            }

            return acc;
        }, {});

        // Convertir el objeto acumulado en un array
        const result = Object.values(facturasConDetalles);

        return { success: true, data: result };
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error al obtener las facturas.' };
    }
};

const getBillById = async (id_facturas) => {
    try {
        // Obtener la factura
        const facturas = await db.query(`SELECT * FROM facturas WHERE id_facturas = ?`, [id_facturas]);

        if (facturas.length === 0) {
            return { success: false, message: 'Factura no encontrada.' };
        }

        // Obtener detalles de la factura
        const detalles = await db.query(`SELECT * FROM detalle_factura WHERE factura_id = ?`, [id_facturas]);

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

