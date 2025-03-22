import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../ui/componets/NavUsuario'; // Ajusta la ruta según tu estructura de archivos

const ProductosMasVotados = () => {
    const [libros, setLibros] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Función para obtener los libros más votados
        const fetchLibrosMasVotados = async () => {
            try {
                const response = await fetch('http://localhost:3000/book/topbooks'); // Ajusta la URL según tu API
                const result = await response.json();

                if (result.success) {
                    setLibros(result.data); // Guarda los libros en el estado
                } else {
                    console.error('Error al obtener los libros más votados:', result.message);
                }
            } catch (error) {
                console.error('Error al obtener los libros más votados:', error);
            }
        };

        fetchLibrosMasVotados();
    }, []);

    return (
        <>
            {/* Navbar */}
            <div className="h-16">
                <Navbar />
            </div>

            {/* Título de la sección */}
            <h1 className="md:text-6xl font-extrabold text-center bg-gradient-to-r 
                from-indigo-500 to-teal-400 bg-clip-text text-transparent tracking-wide py-4 mt-16">
                Libros Más Votados
            </h1>

            {/* Lista de libros más votados */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {libros.map((libro) => (
                    <div key={libro.id_libro} className="bg-white shadow-lg rounded-lg p-4">
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
                    </div>
                ))}
            </div>
        </>
    );
};

export default ProductosMasVotados;