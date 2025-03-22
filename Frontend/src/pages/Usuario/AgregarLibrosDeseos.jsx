import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../ui/componets/NavUsuario'; // Ajusta la ruta según tu estructura

const AgregarLibrosDeseos = () => {
    const navigate = useNavigate();
    const [librosDisponibles, setLibrosDisponibles] = useState([]);
    const [idCuenta, setIdCuenta] = useState(''); // Estado para almacenar el ID de la cuenta

    // Obtener todos los libros disponibles
    useEffect(() => {
        const fetchLibrosDisponibles = async () => {
            try {
                const response = await fetch('http://localhost:3000/book/getallbooks');
                const result = await response.json();

                if (result.success) {
                    setLibrosDisponibles(result.books);
                } else {
                    console.error('Error al obtener los libros disponibles:', result.message);
                }
            } catch (error) {
                console.error('Error al obtener los libros disponibles:', error);
            }
        };

        fetchLibrosDisponibles();
    }, []);

    // Agregar un libro a la lista de deseos
    const agregarAListaDeseos = async (idLibro) => {
        if (!idCuenta) {
            alert('Por favor, ingresa tu ID de cuenta.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/book/addDeseo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_libro: idLibro, id_cuenta: idCuenta }),
            });

            const result = await response.json();

            if (result.success) {
                alert('Libro agregado a la lista de deseos');
            } else {
                alert('Error al agregar el libro a la lista de deseos');
            }
        } catch (error) {
            console.error('Error al agregar el libro a la lista de deseos:', error);
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
                Agregar Libros a la Lista de Deseos
            </h1>

            {/* Campo para ingresar el ID de la cuenta */}
            <div className="text-center mt-4">
                <label htmlFor="idCuenta" className="block text-lg font-medium text-gray-700">
                    Ingresa tu ID de cuenta:
                </label>
                <input
                    type="text"
                    id="idCuenta"
                    value={idCuenta}
                    onChange={(e) => setIdCuenta(e.target.value)}
                    className="mt-2 p-2 border border-gray-300 rounded-md"
                    placeholder="Ejemplo: 1"
                />
            </div>

            {/* Lista de libros disponibles */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {librosDisponibles.map((libro) => (
                    <div key={libro.id_libro} className="bg-white shadow-lg rounded-lg p-4">
                        <img 
                            src="https://via.placeholder.com/150" // Imagen por defecto (puedes cambiarla)
                            alt={libro.titulo} 
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <h3 className="text-xl font-bold mt-2">{libro.titulo}</h3>
                        <p className="text-gray-600">{libro.autor}</p>
                        <p className="text-green-600 font-bold mt-2">Q {libro.precio}</p>
                        <button
                            className="bg-teal-500 text-white px-4 py-2 rounded-md mt-4 w-full hover:bg-teal-600"
                            onClick={() => agregarAListaDeseos(libro.id_libro)}
                        >
                            Agregar a la lista de deseos
                        </button>
                    </div>
                ))}
            </div>

            {/* Botón para volver a la lista de deseos */}
            <div className="text-center mt-6">
                <button
                    className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600"
                    onClick={() => navigate('/listaDeseos')} // Cambia la ruta según tu necesidad
                >
                    Volver a la lista de deseos
                </button>
            </div>
        </>
    );
};

export default AgregarLibrosDeseos;