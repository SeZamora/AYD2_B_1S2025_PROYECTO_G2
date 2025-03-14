const db = require('../services/DBService').default;
const addBook = async ({ titulo, autor, fecha_lanzamiento, descripcion, genero, stock, precio }) => {
    try {
        const result = await db.query(
            `INSERT INTO libros (titulo, autor, fecha_lanzamiento, descripcion, genero, stock, precio) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [titulo, autor, fecha_lanzamiento, descripcion, genero, stock, precio]
        );

        if (result.affectedRows > 0) {
            return { success: true, message: 'Libro agregado exitosamente.', id_libro: result.insertId };
        } else {
            return { success: false, message: 'No se pudo agregar el libro.' };
        }
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error interno del servidor.' };
    }
};

const getAllBooks = async () => {
    try {
        const result = await db.query(`SELECT * FROM libros`);

        if (result.length > 0) {
            return { success: true, books: result };
        } else {
            return { success: false, message: 'No hay libros disponibles.' };
        }
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error interno del servidor.' };
    }
};

const getBookById = async (id_libro) => {
    try {
        const result = await db.query(`SELECT * FROM libros WHERE id_libro = ?`, [id_libro]);

        if (result.length > 0) {
            return { success: true, book: result[0] }; // Retorna el libro encontrado
        } else {
            return { success: false, message: 'No se encontró un libro con el ID proporcionado.' };
        }
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error interno del servidor.' };
    }
};


module.exports = { addBook, getAllBooks, getBookById };