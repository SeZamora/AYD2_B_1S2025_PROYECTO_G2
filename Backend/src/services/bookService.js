const { db } = require('../services/DBService');
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
        const result = await db.query(`SELECT * FROM libros WHERE disponible = 1`);

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


const updateBook = async ({ id_libro, descripcion, stock, precio }) => {
    try {
        const result = await db.query(
            `UPDATE libros SET descripcion = ?, stock = ?, precio = ? WHERE id_libro = ?`,
            [descripcion, stock, precio, id_libro]
        );

        if (result.affectedRows > 0) {
            return { success: true, message: 'Libro actualizado exitosamente.' };
        } else {
            return { success: false, message: 'No se pudo actualizar el libro.' };
        }

    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Error al actualizar el libro' };
    }
};

const addResenia = async ({ calificacion, comentario, fecha, cuenta_id_cuenta, libros_id_libro }) => {
    try {
        const result = await db.query(
            `INSERT INTO resenias (calificacion, comentario, fecha, cuenta_id_cuenta, libros_id_libro) 
             VALUES (?, ?, ?, ?, ?)`,
            [calificacion, comentario, fecha, cuenta_id_cuenta, libros_id_libro]
        );

        return { success: true, message: 'Reseña agregada exitosamente.', id_resenia: result.insertId };
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error al agregar la reseña.' };
    }
};

const getAllResenias = async () => {
    try {
        const reviews = await db.query(`
            SELECT r.id_resenia, r.calificacion, r.comentario, r.fecha, 
                   c.id_cuenta, c.nombre AS nombre_usuario, 
                   l.id_libro, l.titulo AS titulo_libro
            FROM resenias r
            JOIN cuenta c ON r.cuenta_id_cuenta = c.id_cuenta
            JOIN libros l ON r.libros_id_libro = l.id_libro
            ORDER BY r.fecha DESC
        `);

        return { success: true, data: reviews };
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error al obtener las reseñas.' };
    }
};

const deleteBook = async (id_libro) => {
    try {
        const result = await db.query(
            `UPDATE libros SET disponible = 0 WHERE id_libro = ?`, 
            [id_libro]
        );

        if (result.affectedRows > 0) {
            return { success: true, message: 'Libro marcado como no disponible.' };
        } else {
            return { success: false, message: 'No se pudo actualizar el estado del libro.' };
        }
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error al actualizar el libro.' };
    }
}


module.exports = { 
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    addResenia,
    getAllResenias,
    deleteBook

};