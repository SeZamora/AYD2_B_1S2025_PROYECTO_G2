import { CardEmpleado } from '../../../ui/CardEmpleado';
import { useEffect, useState } from 'react';

export const Productos = ({ handleAgregarCarrito }) => {

        const [productos, setProductos] = useState([]);

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

    return(
        <div className="mt-2 grid grid-cols-3 p-4 gap-4">
            
            {productos.map((producto) => (
                <CardEmpleado key={`producto-${producto.id_producto}`}>
                    <h1 className="text-3xl font-bold text-center">
                        {producto.nombre}
                    </h1>
                    <img src={producto.imagen} alt={producto.nombre} className="w-full h-85 object-cover rounded-lg mt-4 mb-4" />
                    <br />
                    <div className="flex ">
                        <label className="text-xl font-bold mr-2">Codigo:</label>
                        <h1 className="text-xl">
                            {producto.codigo}
                        </h1>
                    </div>
                    <div className="flex ">
                        <label className="text-xl font-bold mr-2">Precio:</label>
                        <h1 className="text-xl">
                            Q {producto.precio_venta}
                        </h1>
                    </div>
                    <div className="flex ">
                        <label className="text-xl font-bold mr-2">Cantidad Disponible:</label>
                        <h1 className="text-xl">
                            {producto.cantidad}
                        </h1>
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <button
                            className="bg-green-400 px-4 py-1 rounded-md my-2 disabled:bg-primary-300 w-full text-text-100 font-bold mr-2"
                            onClick={() => handleAgregarCarrito(producto)}
                        >
                            Agregar Carrito
                        </button>

                    </div>
                </CardEmpleado>
            ))}
        </div>
    )

}

export default Productos;