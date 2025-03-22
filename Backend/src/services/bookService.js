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
        const result = await db.query(`SELECT * FROM libros WHERE id_libro = ? AND disponible = 1`, [id_libro]);

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
            WHERE l.disponible = 1
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


const updateResenia = async (id_resenia, { calificacion, comentario, fecha }) => {
    try {
        const result = await db.query(
            `UPDATE resenias SET calificacion = ?, comentario = ?, fecha = ? WHERE id_resenia = ?`,
            [calificacion, comentario, fecha, id_resenia]
        );

        if (result.affectedRows === 0) {
            return { success: false, message: 'Reseña no encontrada o sin cambios' };
        }

        return { success: true, message: 'Reseña actualizada exitosamente' };
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error al actualizar la reseña.' };
    }
};

const deleteResenia = async (id_resenia) => {
    try {
        const result = await db.query(
            `DELETE FROM resenias WHERE id_resenia = ?`,
            [id_resenia]
        );

        if (result.affectedRows === 0) {
            return { success: false, message: 'Reseña no encontrada' };
        }

        return { success: true, message: 'Reseña eliminada exitosamente' };
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error al eliminar la reseña.' };
    }
};

const topbooks = async () =>{
    try{
        const topbooks = await db.query(`
            SELECT 
                l.id_libro, 
                l.titulo, 
                l.autor, 
                AVG(r.calificacion) AS calificacion_promedio
            FROM libros l
            JOIN resenias r ON l.id_libro = r.libros_id_libro
            GROUP BY l.id_libro, l.titulo, l.autor
            HAVING COUNT(r.id_resenia) > 0  
            ORDER BY calificacion_promedio DESC
            LIMIT 10; 
        `);
        return { success: true, data: topbooks };
    }catch(error){
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error al obtener los libros.' };
    }
}

const addDeseo = async (cuenta_id_cuenta, libro_id) => {
    try{
        
        const [libro] = await db.query(
            `SELECT disponible FROM libros WHERE id_libro = ?`,
            [libro_id]
        );
        
        //verificar que exista libro
        if(libro.length === 0 || libro.disponible !== 1){
            return { success: false, message: 'El libro no existe.' };
        }
        const [deseoExistente] = await db.query(
            `SELECT id_deseo FROM deseos WHERE cuenta_id_cuenta = ? AND libro_id = ?`,
            [cuenta_id_cuenta, libro_id]
        );
        //console.log(deseoExistente)
        if (deseoExistente != null) {
            return { success: false, message: "Este libro ya está en tu lista de deseos." };
        }

         const result = await db.query(
            `INSERT INTO deseos (cuenta_id_cuenta, libro_id) VALUES (?, ?)`,
            [cuenta_id_cuenta, libro_id]
        );

        return { success: true, message: "Deseo agregado exitosamente.", id_deseo: result.insertId };

    }catch(error){
        console.error('Database error', error.sqlMessage || error);
        return { success: false, message: 'Error al agregar el libro a la lista de deseos.' };
    }
}
const getDeseosByUsuario = async (cuenta_id_cuenta) => {
    try {
        const deseos = await db.query(
            `SELECT 
                d.id_deseo, 
                d.cuenta_id_cuenta, 
                l.id_libro, 
                l.titulo, 
                l.autor, 
                l.precio
            FROM deseos d
            JOIN libros l ON d.libro_id = l.id_libro
            WHERE d.cuenta_id_cuenta = ?`,
            [cuenta_id_cuenta]
        );

        return { success: true, data: deseos };
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error al obtener la lista de deseos.' };
    }
};
const eliminarDeseo = async (id_deseo) => {
    try {
        const resultado = await db.query(
            `DELETE FROM deseos WHERE id_deseo = ?`, 
            [id_deseo]
        );

        if (resultado.affectedRows > 0) {
            return { success: true, message: 'Deseo eliminado exitosamente.' };
        } else {
            return { success: false, message: 'No se encontró el deseo con el ID proporcionado.' };
        }
    } catch (error) {
        console.error('Database Error:', error.sqlMessage || error);
        return { success: false, message: 'Error al eliminar el deseo.' };
    }
};

module.exports = { 
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    addResenia,
    getAllResenias,
    deleteBook,
    updateResenia,
    deleteResenia,
    topbooks,
    getDeseosByUsuario,
    addDeseo,
    eliminarDeseo
};