import { useParams } from "react-router-dom";
import Navbar from '../../../ui/componets/NavEmpleado';
import { useEffect, useState } from "react";

export const ProductoDetalle = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/product/getProductById`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id_producto: Number(id) })


        })
        .then((response) => response.json())
        .then((data) => {
            setProducto(data.product);
        })
        .catch((error) => {
            console.error('Error al obtener los datos:', error);
        });
    
    }, [id]);

    if (!producto) {
        return <h1>Producto no encontrado</h1>;
    }

    return (
        <>
            <div className="bg-primary-100 h-16">
                    <Navbar/>
            </div>
            <div className="mt-32">
                <div className="bg-white shadow-lg rounded-2xl p-6 max-w-sm mx-auto border border-gray-200 mt-12">
                <h1 className="md:text-8xl font-extrabold text-center bg-gradient-to-r 
                from-indigo-500 to-teal-400 bg-clip-text text-transparent tracking-wide py-4 mb-16">
                    {producto.nombre}
                </h1>
                    <img
                        src={`data:image/jpeg;base64,${producto.imagen}`}
                        alt={producto.nombre}
                        className="w-full h-48 object-cover rounded-md"
                    />
                    <div className="mt-4 space-y-8 text-gray-700">
                        <p className="text-2xl"><span className="font-semibold">Descripción:</span> {producto.descripcion}</p>
                        <p className="text-2xl"><span className="font-semibold">Código:</span> {producto.codigo}</p>
                        <p className="text-2xl"><span className="font-semibold">Categoría:</span> {producto.categoria}</p>
                        <p className="text-2xl text-green-600 font-bold"><span className="font-semibold">Precio de Venta:</span> ${producto.precio_venta}</p>
                        <p className="text-2xl  text-red-500"><span className="font-semibold">Precio de Compra:</span> ${producto.precio_compra}</p>
                        <p className="text-2xl  text-gray-500"><span className="font-semibold">Cantidad Disponible:</span> {producto.cantidad}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductoDetalle;
