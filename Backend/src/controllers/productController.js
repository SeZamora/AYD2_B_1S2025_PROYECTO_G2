const productService = require('../services/productService');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
    try {
        const { nombre, descripcion, codigo, categoria, precio_compra, precio_venta, cantidad } = req.body;
        const imagen = req.file ? req.file.buffer : null; // Image buffer

        if (!nombre || !codigo || !categoria || !precio_compra || !precio_venta || !cantidad || !imagen) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const result = await productService.addProduct({
            nombre,
            descripcion,
            codigo,
            categoria,
            precio_compra,
            precio_venta,
            cantidad,
            imagen
        });

        // const resultx = {
        //     nombre,
        //     descripcion,
        //     codigo,
        //     categoria,
        //     precio_compra,
        //     precio_venta,
        //     cantidad,
        //     imagen
        // };
        // console.log(resultx);

        res.status(200).json(result);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al agregar el producto' });
    }
};


const getAllProducts = async (req, res) => {
    try {
        const result = await productService.getAllProducts();
        res.status(200).json(result);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al obtener productos' });
    }
};

module.exports = {
    addProduct,
    upload,
    getAllProducts
};
