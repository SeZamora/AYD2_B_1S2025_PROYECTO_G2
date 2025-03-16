import { CardEmpleado } from '../../ui/CardEmpleado';
import Navbar from '../../ui/componets/NavEmpleado';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './empleado.css'


export const EmpleadoHome = () => {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]); 
    const [total, setTotal] = useState(0); 

    const handleVerProducto = (id) => {
        navigate(`/producto/${id}`);
    };

    const handleAgregarCarrito = (producto) => {
        const productoExistente = carrito.find((item) => item.id_producto === producto.id_producto);

        if (productoExistente) {
            const nuevoCarrito = carrito.map((item) =>
                item.id_producto === producto.id_producto
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            );
            setCarrito(nuevoCarrito);
        } else {
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        }

        setTotal(total + parseFloat(producto.precio_venta));
    };

    const handleEliminarDelCarrito = (id) => {
        const productoEliminado = carrito.find((item) => item.id_producto === id);
        const nuevoCarrito = carrito.filter((item) => item.id_producto !== id);

        setCarrito(nuevoCarrito);
        setTotal(total - parseFloat(productoEliminado.precio_venta) * productoEliminado.cantidad);
    };

    const handlePagar = () => {
        console.log('Pagar');
        console.log(carrito);
    }

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

    return (
        <>
            <div className="bg-primary-100 h-16">
                <Navbar />
            </div>

            {/* Sección de productos */}
            <div className="mt-20 grid grid-cols-3 p-4 gap-4">
                {productos.map((producto) => (
                    <CardEmpleado key={producto.id_producto}>
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
                            <button
                                className="bg-blue-400 px-4 py-1 rounded-md my-2 disabled:bg-primary-300 w-full text-text-100 font-bold"
                                onClick={() => handleVerProducto(producto.id_producto)}
                            >
                                Ver Producto
                            </button>
                        </div>
                    </CardEmpleado>
                ))}
            </div>

            {/* Sección del carrito */}
            <div className="fixed bottom-0 right-0 bg-white shadow-lg w-96 p-4 border border-gray-200">
                <h2 className="text-2xl font-bold mb-4">Carrito de Compras</h2>
                {carrito.length === 0 ? (
                    <p className="text-gray-500">No hay productos en el carrito.</p>
                ) : (
                    <>
                        <ul className="space-y-2">
                            {carrito.map((item) => (
                                <li key={item.id_producto} className="flex justify-between items-center">
                                    <span>
                                        {item.nombre} (x{item.cantidad})
                                    </span>
                                    <span className="font-semibold">Q {(item.precio_venta * item.cantidad).toFixed(2)}</span>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => handleEliminarDelCarrito(item.id_producto)}
                                    >
                                        Eliminar
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-xl font-bold">
                                Total: <span className="text-green-600">Q {total.toFixed(2)}</span>

                            </p>

                            <button className="bg-green-400 px-4 py-1 rounded-md 
                            my-2 disabled:bg-primary-300 w-full text-text-100 font-bold mr-2" 
                            onClick={() => handlePagar()}>
                                Pagar
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default EmpleadoHome;