const bookService = require('../services/bookService');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const addBook = async (req, res) => {
    try {
        const { titulo, autor, fecha_lanzamiento, descripcion, genero, stock, precio } = req.body;

        if (!titulo || !autor || !fecha_lanzamiento || !genero || !stock || !precio) {
            return res.status(400).json({ message: 'Todos los campos obligatorios deben estar completos' });
        }

        const result = await bookService.addBook({
            titulo,
            autor,
            fecha_lanzamiento,
            descripcion,
            genero,
            stock,
            precio
        });

        res.status(200).json(result);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al agregar el libro' });
    }
};


const getAllBooks = async (req, res) => {
    try {
        const result = await bookService.getAllBooks();
        res.status(200).json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al obtener libros' });
    }
};

// obtener libro por ID

const getBookById = async (req, res) => {
    try {
        const { id_libro } = req.body; // Se obtiene el ID desde el cuerpo de la solicitud

        if (!id_libro) {
            return res.status(400).json({ message: 'El ID del libro es obligatorio' });
        }

        const result = await bookService.getBookById(id_libro);

        if (!result.success) {
            return res.status(404).json(result);
        }

        res.status(200).json(result);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al obtener el libro' });
    }
};


const updateBook = async (req, res) => {
    try {
        const { id_libro, titulo, autor, fecha_lanzamiento, descripcion, genero, stock, precio } = req.body;

        if (!id_libro) {
            return res.status(400).json({ message: 'El ID del libro es obligatorio' });
        }

        const result = await bookService.updateBook({
            id_libro,
            titulo,
            autor,
            fecha_lanzamiento,
            descripcion,
            genero,
            stock,
            precio
        });

        if (!result.success) {
            return res.status(404).json(result);
        }

        res.status(200).json(result);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al actualizar el libro' });
    }
}

module.exports = { addBook, getAllBooks, getBookById, updateBook };
