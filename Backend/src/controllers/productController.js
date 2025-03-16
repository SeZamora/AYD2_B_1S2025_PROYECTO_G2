const productService = require('../services/productService');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
    try {
        const { nombre, descripcion, codigo, categoria, precio_compra, precio_venta, cantidad } = req.body;
        const imagen = req.file ? req.file.buffer : null; 

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
const getProductById = async (req, res) => {
    try {
        const { nombre_producto } = req.body;

        if (!nombre_producto) {
            return res.status(400).json({ message: 'El nombre del producto es obligatorio' });
        }

        const result = await productService.getProductById(nombre_producto);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
};

const getProduct = async (req, res) => {
    try {
        const { id_producto } = req.body;

        if (!id_producto) {
            return res.status(400).json({ message: 'El ID del producto es obligatorio' });
        }

        const result = await productService.getProduct(id_producto);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
};



const editProduct = async (req, res) => {
    try {
        const { id_producto,descripcion, precio_venta, cantidad } = req.body;
        
        if (!id_producto || !precio_venta || !cantidad) {

            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const result = await productService.editProduct({
            id_producto,
            
            descripcion,
            
            precio_venta,
            cantidad
        });

        res.status(200).json(result);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al editar el producto' });
    }

}



module.exports = {
    addProduct,
    upload,
    getAllProducts,
    getProductById,
    editProduct,
    getProduct
};
