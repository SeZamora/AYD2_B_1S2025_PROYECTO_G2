const bookService = require('../services/bookService');
const { AddReseniaCommand } = require('../commands/addResenia');
const { Command } = require('../commands/command');
const { GetReseniaCommand } = require('../commands/getResenia');
const {EditarComentarioCommand} = require('../commands/EditarComentario');
const {EliminarComentarioCommand} = require('../commands/EliminarComentario');
const incommand = new Command();
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
        const { id_libro } = req.body; 

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

        const comando = new AddReseniaCommand(bookService, {
            calificacion,
            comentario,
            fecha,
            cuenta_id_cuenta,
            libros_id_libro
        });

        const resultado = await incommand.executeCommand(comando);

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
        const comando = new GetReseniaCommand(bookService);
        const result = await incommand.executeCommand(comando);
        
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

const updateResenia = async (req, res) => {
    try {
        const { id_resenia, calificacion, comentario, fecha } = req.body;

        if (!id_resenia || !calificacion || !comentario || !fecha) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        if (calificacion < 1 || calificacion > 5) {
            return res.status(400).json({ message: 'La calificación debe estar entre 1 y 5' });
        }

        const comando = new EditarComentarioCommand(bookService, id_resenia, { calificacion, comentario, fecha });
        const result = await incommand.executeCommand(comando);

        if (!result.success) {
            return res.status(400).json({ status: 'error', message: result.message });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error('Error :', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const deleteResenia = async (req, res) => {
    try {
        const { id_resenia } = req.body; 

        if (!id_resenia) {
            return res.status(400).json({ message: 'El ID de la reseña es obligatorio' });
        }

        const comando = new EliminarComentarioCommand(bookService, id_resenia);
        const result = await incommand.executeCommand(comando);

        if (!result.success) {
            return res.status(400).json({ status: 'error', message: result.message });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error('Error :', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const topbooks = async (req, res) => {
    try{
        const result = await bookService.topbooks();
        if(!result.success){
            return res.status(404).json({message: 'No se encontraron libros'});
        }
        res.status(200).json(result);
    }catch(error){
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al obtener los libros' });
    }
}

const addDeseo = async (req, res) => {
        try{
            console.log("add deseo")
            const {id_libro, id_cuenta} = req.body;
            if(!id_libro || !id_cuenta){
                return res.status(400).json({message: 'Todos los campos son obligatorios'});
            }
            const result = await bookService.addDeseo(id_cuenta, id_libro);
            res.status(200).json(result);

        }catch(error){
            console.error('Error:', error);
            res.status(500).json({ message: 'Error al agregar deseo' });
        }

}


const getDeseos = async (req, res) => {
    try{
        const {id_cuenta} = req.body;
        if(!id_cuenta){
            return res.status(400).json({message: 'Todos los campos son obligatorios'});
        }
        const result = await bookService.getDeseosByUsuario(id_cuenta);
        res.status(200).json(result);

    }catch(error){
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al obtener deseos' });
    }

}
const eliminarDeseo = async (req, res) => {
    try{
        const {id_deseo} = req.body;
        if(!id_deseo){
            return res.status(400).json({message: 'Todos los campos son obligatorios'});
        }
        const result = await bookService.eliminarDeseo(id_deseo);
        res.status(200).json(result);
    }catch(error){
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al eliminar deseo' });   
    }
}

module.exports = { addBook, 
    getAllBooks, 
    getBookById, 
    updateBook, 
    addResenia, 
    getAllResenias, 
    deleteBook
    ,updateResenia,
    deleteResenia,
    topbooks,
    addDeseo,
    getDeseos,
    eliminarDeseo
};
