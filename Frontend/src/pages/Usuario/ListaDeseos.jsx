import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../ui/componets/NavUsuario'; // Ajusta la ruta según tu estructura

const ListaDeseos = () => {
    const navigate = useNavigate();
    const [librosDeseados, setLibrosDeseados] = useState([]);
    const idCuenta = 1; 

    // Obtener la lista de deseos
    useEffect(() => {
        const fetchListaDeseos = async () => {
            try {
                const response = await fetch('http://localhost:3000/book/getDeseos', {
                    method: 'POST', // Usamos POST en lugar de GET
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id_cuenta: idCuenta }), // Enviamos el id_cuenta en el body
                });

                const result = await response.json();

                if (result.success) {
                    setLibrosDeseados(result.data);
                } else {
                    console.error('Error al obtener la lista de deseos:', result.message);
                }
            } catch (error) {
                console.error('Error al obtener la lista de deseos:', error);
            }
        };

        fetchListaDeseos();
    }, [idCuenta]);

    
    // Eliminar un libro de la lista de deseos
    const eliminarDeListaDeseos = async (idDeseo) => {
        try {
            const response = await fetch('http://localhost:3000/book/eliminarDeseo', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_deseo: idDeseo }),
            });

            const result = await response.json();

            if (result.success) {
                alert('Libro eliminado de la lista de deseos');
                // Actualizar la lista de deseos
                const updatedResponse = await fetch('http://localhost:3000/book/getDeseos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id_cuenta: idCuenta }),
                });
                const updatedResult = await updatedResponse.json();
                setLibrosDeseados(updatedResult.data);
            } else {
                alert('Error al eliminar el libro de la lista de deseos');
            }
        } catch (error) {
            console.error('Error al eliminar el libro de la lista de deseos:', error);
        }
    };

    return (
        <>
            {/* Navbar */}
            <div className="h-16">
                <Navbar />
            </div>

            {/* Título de la sección */}
            <h1 className="md:text-6xl font-extrabold text-center bg-gradient-to-r 
                from-indigo-500 to-teal-400 bg-clip-text text-transparent tracking-wide py-4 mt-16">
                Lista de Deseos
            </h1>

            {/* Lista de libros deseados */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {librosDeseados.map((libro) => (
                    <div key={libro.id_deseo} className="bg-white shadow-lg rounded-lg p-4">
                        <img
                            src="https://via.placeholder.com/150" // Imagen por defecto (puedes cambiarla)
                            alt={libro.titulo}
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <h3 className="text-xl font-bold mt-2">{libro.titulo}</h3>
                        <p className="text-gray-600">{libro.autor}</p>
                        <p className="text-yellow-500 font-bold mt-2">
                            ⭐ {libro.calificacion_promedio}
                        </p>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 w-full hover:bg-red-600"
                            onClick={() => eliminarDeListaDeseos(libro.id_deseo)}
                        >
                            Eliminar de la lista
                        </button>
                    </div>
                ))}
            </div>

            {/* Botón para agregar libros (puedes implementar un modal o redirigir a otra vista) */}
            <div className="text-center mt-6">
                <button
                    className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600"
                    onClick={() => navigate('/agregarLibrosDeseos')}
                >
                    Agregar más libros a la lista
                </button>
            </div>
        </>
    );
};

export default ListaDeseos;