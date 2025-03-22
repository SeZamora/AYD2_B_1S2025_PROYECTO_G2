import { CardEmpleado } from '../../ui/CardEmpleado';
import Productos from './components/Productos';
import Navbar from '../../ui/componets/NavEmpleado';
import { CrearFactura} from './components/CrearFactura'
import ModalFactura from './components/ModalFactura';
import React, {useState } from 'react';
import { useNavigate } from "react-router-dom";
import './empleado.css'
import Libros from './components/Libros';


export const EmpleadoHome = () => {
    const navigate = useNavigate();

    const [carrito, setCarrito] = useState([]); 
    const [total, setTotal] = useState(0); 

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenPdf, setIsModalOpenPdf] = useState(false);
    const [factura, setFactura] = useState(null)

    const [idFactura, setIdFactura] = useState(null);

    const handleVerProducto = (id) => {
        navigate(`/producto/${id}`);
    };

    const handleVerLibro = (id) => {
        navigate(`/libro/${id}`);
    };

    const handleAgregarCarrito = (producto) => {
        const esProducto = producto.id_producto !== undefined;
        const esLibro = producto.id_libro !== undefined;
    
        const idKey = esProducto ? "id_producto" : "id_libro";
        const precioKey = esProducto ? producto.precio_venta : producto.precio;
    
        const productoExistente = carrito.find(
            (item) => item[idKey] === producto[idKey] && (esProducto ? item.id_producto : item.id_libro)
        );
    
        if (productoExistente) {
            // Si el producto/libro ya está en el carrito, aumentamos la cantidad
            const nuevoCarrito = carrito.map((item) =>
                item[idKey] === producto[idKey] && (esProducto ? item.id_producto : item.id_libro)
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            );
            setCarrito(nuevoCarrito);
        } else {
            // Si no está en el carrito, lo agregamos con cantidad 1
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        }
    
        // Actualizar el total
        setTotal(total + parseFloat(precioKey));
    };
    

    const handleEliminarDelCarrito = (producto) => {
        const esProducto = producto.id_producto !== undefined;
        const id = esProducto ? producto.id_producto : producto.id_libro;
    
   
        const nuevoCarrito = carrito.filter(
            (item) => (esProducto ? item.id_producto !== id : item.id_libro !== id)
        );
    

        const precio = esProducto ? parseFloat(producto.precio_venta) : parseFloat(producto.precio);
        setCarrito(nuevoCarrito);
        setTotal(total - precio * producto.cantidad);
    };
    

    const handlePagar = () => {
        setIsModalOpen(true);
    }

    const handleConfirmarPedido = async (datos) => {
        setIsModalOpenPdf(false); 
        setIsModalOpen(false);
        const pdffactura = {
            nombre_vendedor: datos.nombreVendedor,
            fecha_hora: new Date().toISOString().slice(0, 19).replace('T', ' '),
            total_venta: total.toFixed(2),
            nombre_comprador: datos.nombreComprador,
            cuenta_id_cuenta: datos.idComprador,
            empleados_id: datos.idVendedor,
            detalles: carrito.map((item) => ({
                unidades_compradas: item.cantidad,
                precio_producto: item.precio_venta || item.precio,
                producto_id: item.id_producto || null,
                libro_id: item.id_libro || null
            }))
        };
    
        try {
            const response = await fetch('http://localhost:3000/bill/addbill', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pdffactura)
            });
    
            const data = await response.json();

            const response2 = await fetch(`http://localhost:3000/bill/getBillById`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ id: Number(data.id_factura) })
            })

            const facturacompleta = await response2.json()

    
            setCarrito([]);
            setTotal(0);
            
            setIdFactura(data.id_factura);
            setFactura(facturacompleta.data);
    
        } catch (error) {
            console.error('Error al crear la factura:', error);
        }finally{
            setIsModalOpen(false);
            setIsModalOpenPdf(true); 
            
        }
    
        
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCloseModalPdf = () => {
        setIsModalOpenPdf(false);
        setFactura(null);
        setIdFactura(null);
        console.log( factura)
    };


    return (
        <>
            <div className="bg-primary-100 h-16">
                <Navbar />
            </div>

            <h1 className="md:text-6xl font-extrabold text-center bg-gradient-to-r 
                from-indigo-500 to-teal-400 bg-clip-text text-transparent tracking-wide py-4 mt-16">
                    Productos
                </h1>
            {/* Sección de productos */}
            <Productos handleAgregarCarrito={handleAgregarCarrito} handleVerProducto={handleVerProducto}/>

            {/* Seccion de Libros*/}
            <h1 className="md:text-6xl font-extrabold text-center bg-gradient-to-r 
                from-indigo-500 to-teal-400 bg-clip-text text-transparent tracking-wide py-4 mt-4">
                    Libros
                </h1>

            <Libros handleAgregarCarrito={handleAgregarCarrito} handleVerLibro={handleVerLibro}/>

            {/* Sección del carrito */}
            <div className="fixed bottom-0 right-0 bg-white shadow-lg w-96 p-4 border border-gray-200">
                <h2 className="text-2xl font-bold mb-4">Carrito de Compras</h2>
                {carrito.length === 0 ? (
                    <p className="text-gray-500">No hay productos en el carrito.</p>
                ) : (
                    <>
                        <ul className="space-y-2">
                            {carrito.map((item) => (
                                <li 
                                    key={`${item.id_producto ? `producto-${item.id_producto}` : `libro-${item.id_libro}`}`}
                                    className="flex justify-between items-center"
                                >
                                    <span>
                                        {item.nombre || item.titulo} (x{item.cantidad})
                                    </span>
                                    <span className="font-semibold">
                                        Q {((item.precio_venta || item.precio) * item.cantidad).toFixed(2)}
                                    </span>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => handleEliminarDelCarrito(item)}
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

                            {isModalOpen && (
                                <CrearFactura onClose={handleCloseModal} onConfirm={handleConfirmarPedido} />
                            )}

                        </div>

                        
                    </>
                )}
            </div>

            {isModalOpenPdf && (
                                <ModalFactura
                                    isOpen={isModalOpenPdf}
                                    onClose={handleCloseModalPdf} 
                                    factura={factura}
                                    id_factura={idFactura}
                                />
            )}
        </>
    );
};

export default EmpleadoHome;