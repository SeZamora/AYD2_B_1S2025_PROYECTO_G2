const bookService = require('../services/bookService');


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
        const { id_libro, descripcion,  stock, precio } = req.body;

        if (!id_libro) {
            return res.status(400).json({ message: 'El ID del libro es obligatorio' });
        }

        const result = await bookService.updateBook({
            id_libro,
           
            descripcion,
            
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
const addResenia = async (req, res) => {
    try {
        const { calificacion, comentario, fecha, cuenta_id_cuenta, libros_id_libro } = req.body;

        if (!calificacion || !comentario || !fecha || !cuenta_id_cuenta || !libros_id_libro) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        if (calificacion < 1 || calificacion > 5) {
            return res.status(400).json({ message: 'La calificación debe estar entre 1 y 5' });
        }

        const resultado = await bookService.addResenia({
            calificacion,
            comentario,
            fecha,
            cuenta_id_cuenta,
            libros_id_libro
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

const getAllResenias = async (req, res) => {
    try {
        const result = await bookService.getAllResenias();

        if (!result.success) {
            return res.status(400).json({ status: 'error', message: result.message });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error('Error :', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { id_libro } = req.body;

        if (!id_libro) {
            return res.status(400).json({ message: 'El ID del libro es obligatorio' });
        }

        const result = await bookService.deleteBook(id_libro);

        if (!result.success) {
            return res.status(404).json(result);
        }

        res.status(200).json(result);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al eliminar el libro' });
    }
}


module.exports = { addBook, getAllBooks, getBookById, updateBook, addResenia, getAllResenias, deleteBook};
