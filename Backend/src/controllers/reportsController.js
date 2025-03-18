const reportsService = require('../services/reportsService');

const masVendidos = async (req, res) => {
    try {
        const productos = await reportsService.masVendidos();
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener los productos más vendidos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
const ventasMensuales = async (req, res) => {
    try {
        const ventas = await reportsService.ventasMensuales();
        res.json(ventas);
    } catch (error) {
        console.error('Error al obtener los productos más vendidos por mes:', error);
        res.status(500).json({ message: error.message });
    }
};

const ventasPorCategoria = async (req, res) => {
    try {
        const ventas = await reportsService.ventasPorCategoria();
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const gananciaProducto = async (req, res) => {
    try {
        const ganancias = await reportsService.gananciaProducto();
        res.json(ganancias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const gananciaPorPeriodo = async (req, res) => {    

    try {       
        const ganancias = await reportsService.gananciaPorPeriodo();
        res.json(ganancias);
    } catch (error) {     
        res.status(500).json({ message: error.message });
    }                   
}

const gananciaCategoria = async (req, res) => { 
    try{
        const ganancias = await reportsService.gananciaCategoria();
        res.json(ganancias);
    }catch(error){
        res.status(500).json({ message: error.message });
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
