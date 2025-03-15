const billService = require('../services/billService');
const addBill = async (req, res) => {
    try {
        const { nombre_vendedor, fecha_hora, total_venta, nombre_comprador, cuenta_id_cuenta, empleados_id, detalles } = req.body;

        if (!nombre_vendedor || !fecha_hora || !total_venta || !nombre_comprador || !cuenta_id_cuenta || !empleados_id || !detalles || detalles.length === 0) {
            return res.status(400).json({ message: 'Todos los campos y al menos un detalle son obligatorios' });
        }

        const resultado = await billService.addBill({
            nombre_vendedor,
            fecha_hora,
            total_venta,
            nombre_comprador,
            cuenta_id_cuenta,
            empleados_id,
            detalles
        });

        if (!resultado.success) {
            return res.status(400).json({ status: 'error', message: resultado.message });
        }

        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error :', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
const getAllBills = async (req, res) => {
    try {
        const resultado = await billService.getAllBills();
        if (!resultado.success) {
            return res.status(400).json({ status: 'error', message: resultado.message });
        }

        res.status(200).json(resultado);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getBillById = async (req, res) => {
    try {
        const { id } = req.body; // Ahora se recibe desde el body en lugar de params

        if (!id) {
            return res.status(400).json({ status: 'error', message: 'El ID de la factura es obligatorio' });
        }

        const resultado = await billService.getBillById(id);
        if (!resultado.success) {
            return res.status(404).json({ status: 'error', message: resultado.message });
        }

        res.status(200).json(resultado);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
module.exports = {
    addBill,
    getAllBills,
    getBillById
};

