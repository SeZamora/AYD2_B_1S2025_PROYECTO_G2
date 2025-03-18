const { db } = require('../services/DBService');

const masVendidos = async () => {
    try {
        const result = await db.query(`
               
            SELECT 
                p.id_producto AS id,
                p.nombre AS nombre,
                COALESCE(SUM(d.unidades_compradas), 0) AS total_vendido,
                'producto' AS tipo
            FROM producto p
            LEFT JOIN detalle_factura d ON p.id_producto = d.producto_id
            GROUP BY p.id_producto, p.nombre

            UNION ALL

            
            SELECT 
                l.id_libro AS id,
                l.titulo AS nombre,
                COALESCE(SUM(d.unidades_compradas), 0) AS total_vendido,
                'libro' AS tipo
            FROM libros l
            LEFT JOIN detalle_factura d ON l.id_libro = d.libro_id
            GROUP BY l.id_libro, l.titulo

            ORDER BY total_vendido DESC;
                
        `);
        return result;
    } catch (error) {
        console.error('Error al obtener los productos más vendidos:', error);
        throw error;
    }
};


const ventasMensuales = async () => {
    try {
        const result = await db.query(`
            SELECT 
                DATE_FORMAT(f.fecha_hora, '%Y-%m') AS mes,
                COALESCE(SUM(f.total_venta), 0) AS total_ventas
            FROM facturas f
            GROUP BY mes
            ORDER BY mes;
        `);
        return result;
    } catch (error) {
        console.error("Error al obtener las ventas mensuales:", error);
        throw error;
    }
};

const ventasPorCategoria = async () => {
    try {
        const result = await db.query(`
            SELECT 
                p.categoria, 
                COALESCE(SUM(d.unidades_compradas), 0) AS total_vendido,
                COALESCE(SUM(d.unidades_compradas * d.precio_producto), 0) AS total_ingresos
            FROM producto p
            LEFT JOIN detalle_factura d ON p.id_producto = d.producto_id
            GROUP BY p.categoria
            ORDER BY total_vendido DESC;
        `);
        return result;
    } catch (error) {
        console.error("Error al obtener las ventas por categoría:", error);
        throw error;
    }
};
const gananciaProducto = async () => {
    try {
        const result = await db.query(`
            SELECT 
                p.nombre AS nombre_producto, 
                p.categoria, 
                SUM(d.unidades_compradas * (p.precio_venta - p.precio_compra)) AS ganancia_neta,
                ROUND(
                    (SUM(d.unidades_compradas * (p.precio_venta - p.precio_compra)) / 
                    NULLIF(SUM(d.unidades_compradas * p.precio_venta), 0)) * 100, 2
                ) AS margen_ganancia

            FROM 
                producto p
            JOIN 
                detalle_factura d ON p.id_producto = d.producto_id
            GROUP BY 
                p.nombre, p.categoria;


        `);
        return result;
    } catch (error) {
        console.error("Error al obtener las ventas por producto:", error);
        throw error;
    }
};


const gananciaPorPeriodo = async () => {        
    try{
        const result = await db.query(`
            SELECT 
                DATE_FORMAT(f.fecha_hora, '%Y-%m') AS mes,
                COALESCE(SUM(d.unidades_compradas * (p.precio_venta - p.precio_compra)), 0) AS ganancia_neta
            FROM facturas f
            JOIN 
                detalle_factura d ON f.id_facturas = d.factura_id
            JOIN 
                producto p ON d.producto_id = p.id_producto
            GROUP BY mes
            ORDER BY mes;

            
            `);
        return result;
    }catch(error){      
        console.error("Error al obtener las ganancias por periodo:", error);
        throw error;
    }
};

const gananciaCategoria = async () => { 
    try{
        const result = await db.query(`
            SELECT 
                p.categoria, 
                COALESCE(SUM(d.unidades_compradas * (p.precio_venta - p.precio_compra)), 0) AS ganancia_neta
            FROM detalle_factura d
            JOIN 
                producto p ON d.producto_id = p.id_producto
            GROUP BY p.categoria
            ORDER BY p.categoria;
        `);
        return result;
    }catch(error){
        console.error("Error al obtener las ganancias por categoria:", error);
        throw error;
    }
}


module.exports = {
    masVendidos,
    ventasMensuales,
    ventasPorCategoria,
    gananciaProducto,
    gananciaPorPeriodo,
    gananciaCategoria
};
