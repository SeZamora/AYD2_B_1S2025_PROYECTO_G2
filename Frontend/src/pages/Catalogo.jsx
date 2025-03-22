import React, {useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {CardEmpleado} from '../ui/CardEmpleado';



export const Catalogo = () => {
    const navigate = useNavigate();

    const [productos, setProductos] = useState([]);
    const [libros, setLibros] = useState([]);
    
    useEffect(() => {
        fetch(`http://localhost:3000/product/getAllProducts`)
            .then((response) => response.json())
            .then((data) => {
                setProductos(data.data);
            })
            .catch((error) => {
                console.error('Error al obtener los datos:', error);
            });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:3000/book/getallbooks`)
            .then((response) => response.json())
            .then((data) => {
                setLibros(data.books);
            })
            .catch((error) => {
                console.error('Error al obtener los datos:', error);
            });
    }, []);






    return (
        <>

            <button 
                className="absolute top-4 left-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                onClick={() => navigate('/')}
            >
                Volver al Login
            </button>

            <h1 className="md:text-6xl font-extrabold text-center bg-gradient-to-r 
                from-indigo-500 to-teal-400 bg-clip-text text-transparent tracking-wide py-4 mt-16">
                Productos
            </h1>
            
            <div className="mt-2 grid grid-cols-3 p-4 gap-4">
                {productos.map((producto) => (
                    <CardEmpleado key={`producto-${producto.id_producto}`}>
                        <h1 className="text-3xl font-bold text-center">
                            {producto.nombre}
                        </h1>
                        <img
                            src={`data:image/jpeg;base64,${producto.imagen}`}
                            alt={producto.nombre}
                            className="w-full h-48 object-cover rounded-md"
                        />
                        <br />
                        <div className="flex ">
                            <label className="text-xl font-bold mr-2">Codigo:</label>
                            <h1 className="text-xl">{producto.codigo}</h1>
                        </div>
                        <div className="flex ">
                            <label className="text-xl font-bold mr-2">Precio:</label>
                            <h1 className="text-xl">Q {producto.precio_venta}</h1>
                        </div>
                        <div className="flex ">
                            <label className="text-xl font-bold mr-2">Cantidad Disponible:</label>
                            <h1 className="text-xl">{producto.cantidad}</h1>
                        </div>
                        <div className="flex items-center justify-center mt-4">
                            <button
                                className="bg-green-400 px-4 py-1 rounded-md my-2 disabled:bg-primary-300 w-full text-text-100 font-bold mr-2"
                                onClick={() => navigate(`/Registro`)}
                            >
                                Comprar
                            </button>
                        </div>
                    </CardEmpleado>
                ))}
            </div>

            {/* Sección de Libros */}
            <h1 className="md:text-6xl font-extrabold text-center bg-gradient-to-r 
                from-indigo-500 to-teal-400 bg-clip-text text-transparent tracking-wide py-4 mt-4">
                Libros
            </h1>
            <div className="mt-2 grid grid-cols-3 p-4 gap-4">
                {libros.map((libro) => (
                    <CardEmpleado key={`libro-${libro.id_libro}`}>
                        <h1 className="text-3xl font-bold text-center">
                            {libro.titulo}
                        </h1>
                        <br/>
                        <div className="flex ">
                            <label className="text-xl font-bold mr-2">Autor:</label>
                            <h1 className="text-xl">{libro.autor}</h1>
                        </div>
                        <div className="flex ">
                            <label className="text-xl font-bold mr-2">Precio:</label>
                            <h1 className="text-xl">Q {libro.precio}</h1>
                        </div>
                        <div className="flex ">
                            <label className="text-xl font-bold mr-2">Stock:</label>
                            <h1 className="text-xl">{libro.stock}</h1>
                        </div>
                        <div className="flex items-center justify-center mt-4">
                            <button
                                className="bg-green-400 px-4 py-1 rounded-md my-2 disabled:bg-primary-300 w-full text-text-100 font-bold mr-2"
                                onClick={() => navigate(`/Registro`)}
                            >
                                Comprar
                            </button>
                        </div>
                    </CardEmpleado>
                ))}
            </div>
        </>
    );
};

export default Catalogo;