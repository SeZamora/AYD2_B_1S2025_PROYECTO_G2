import { CardEmpleado } from '../../../ui/CardEmpleado';
import { useEffect, useState } from 'react';

export const Libros = ({ handleAgregarCarrito, handleVerLibro }) => {

    const [libros, setLibros] = useState([]);

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

    return(
        <div className="mt-2 grid grid-cols-3 p-4 gap-4">
            
            {libros.map((libro) => (
                <CardEmpleado key={`libro-${libro.id_libro}`}>
                    <h1 className="text-3xl font-bold text-center">
                        {libro.titulo}
                    </h1>
                    <br/>
                    <div className="flex ">
                        <label className="text-xl font-bold mr-2">Autor:</label>
                        <h1 className="text-xl">
                            {libro.autor}
                        </h1>
                    </div>
                    <div className="flex ">
                        <label className="text-xl font-bold mr-2">Precio:</label>
                        <h1 className="text-xl">
                            Q {libro.precio}
                        </h1>
                    </div>
                    <div className="flex ">
                        <label className="text-xl font-bold mr-2">Stock:</label>
                        <h1 className="text-xl">
                            {libro.stock}
                        </h1>
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <button
                            className="bg-green-400 px-4 py-1 rounded-md my-2 disabled:bg-primary-300 w-full text-text-100 font-bold mr-2"
                            onClick={() => handleAgregarCarrito(libro)}
                        >
                            Agregar Carrito
                        </button>
                        <button
                            className="bg-blue-400 px-4 py-1 rounded-md my-2 disabled:bg-primary-300 w-full text-text-100 font-bold"
                            onClick={() => handleVerLibro(libro.id_libro)}
                        >
                            Ver Libro
                        </button>
                    </div>
                </CardEmpleado>
            ))}
        </div>
    )

}

export default Libros;