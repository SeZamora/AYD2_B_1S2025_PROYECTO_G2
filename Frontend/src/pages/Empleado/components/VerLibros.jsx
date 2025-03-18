import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../../ui/componets/NavEmpleado";

const LibroDetalle = () => {
    const { id } = useParams();
    const [libro, setLibro] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/book/getById", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_libro: Number(id) }),
        })
            .then((response) => response.json())
            .then((data) => {
                setLibro(data.book);
            })
            .catch((error) => {
                console.error("Error al obtener los datos:", error);
            });
    }, [id]);

    if (!libro) {
        return <h1 className="text-center text-2xl mt-10">Libro no encontrado</h1>;
    }

    return (
        <>
            <div className="bg-primary-100 h-16">
                <Navbar />
            </div>
            <div className="mt-32">
                <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md mx-auto border border-gray-200 mt-12">
                    <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r 
                        from-indigo-500 to-teal-400 bg-clip-text text-transparent tracking-wide py-4 mb-6">
                        {libro.titulo}
                    </h1>
                    
                    <p className="text-xl text-center"><span className="font-semibold">Autor:</span> {libro.autor}</p>

                    <div className="mt-4 space-y-6 text-gray-700">
                        <p className="text-xl"><span className="font-semibold">Género:</span> {libro.genero}</p>
                        <p className="text-xl"><span className="font-semibold">Fecha de Lanzamiento:</span> {new Date(libro.fecha_lanzamiento).toLocaleDateString()}</p>
                        <p className="text-xl"><span className="font-semibold">Descripción:</span> {libro.descripcion}</p>
                        <p className="text-xl font-bold text-green-600"><span className="font-semibold">Precio:</span> Q{libro.precio}</p>
                        <p className="text-xl"><span className="font-semibold">Disponible:</span> {libro.disponible} unidades</p>
                        <p className="text-xl"><span className="font-semibold">Stock:</span> {libro.stock} unidades</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LibroDetalle;
