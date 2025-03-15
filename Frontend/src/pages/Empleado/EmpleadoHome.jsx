import { CardEmpleado } from '../../ui/CardEmpleado';
import Navbar from '../../ui/componets/NavEmpleado';
import React from 'react';
import { useNavigate } from "react-router-dom";
import './empleado.css'

const productos = [
    {
        id: 1,
        nombre: "Producto 1",
        descripcion: "Descripción del producto 1",
        codigo: "001",
        categoria: "Categoria 1",
        precio_compra: 100,
        precio_venta: 150,
        cantidad: 10,
        imagen: "https://espnpressroom.com/latinamerica/files/2015/06/champions-league-logo.jpg"
    },
    {
        id: 2,
        nombre: "Producto 2",
        descripcion: "Descripción del producto 2",
        codigo: "002",
        categoria: "Categoria 2",
        precio_compra: 200,
        precio_venta: 250,
        cantidad: 20,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCbw1r5F28avYQG5kVDjDuHm99dMbdo0MTvA&s"
    },
    {
        id: 3,
        nombre: "Producto 3",
        descripcion: "Descripción del producto 3",
        codigo: "003",
        categoria: "Categoria 3",
        precio_compra: 300,
        precio_venta: 350,
        cantidad: 30,
        imagen: "https://via.placeholder.com/150"
    },
    {
        id: 4,
        nombre: "Producto 4",
        descripcion: "Descripción del producto 4",
        codigo: "004",
        categoria: "Categoria 4",
        precio_compra: 400,
        precio_venta: 450,
        cantidad: 40,
        imagen: "https://via.placeholder.com/150"
    },
    {
        id: 5,
        nombre: "Producto 5",
        descripcion: "Descripción del producto 5",
        codigo: "005",
        categoria: "Categoria 5",
        precio_compra: 500,
        precio_venta: 550,
        cantidad: 50,
        imagen: "https://via.placeholder.com/150"
    },
    {
        id: 6,
        nombre: "Producto 6",
        descripcion: "Descripción del producto 6",
        codigo: "006",
        categoria: "Categoria 6",
        precio_compra: 600,
        precio_venta: 650,
        cantidad: 60,
        imagen: "https://via.placeholder.com/150"
    },
    {
        id: 7,
        nombre: "Producto 7",
        descripcion: "Descripción del producto 7",
        codigo: "007",
        categoria: "Categoria 7",
        precio_compra: 700,
        precio_venta: 750,
        cantidad: 70,
        imagen: "https://via.placeholder.com/150"
    },
    {
        id: 8,
        nombre: "Producto 8",
        descripcion: "Descripción del producto 8",
        codigo: "008",
        categoria: "Categoria 8",
        precio_compra: 800,
        precio_venta: 850,
        cantidad: 80,
        imagen: "https://via.placeholder.com/150"
    },
    {
        id: 9,
        nombre: "Producto 9",
        descripcion: "Descripción del producto 9",
        codigo: "009",
        categoria: "Categoria 9",
        precio_compra: 900,
        precio_venta: 950,
        cantidad: 90,
        imagen: "https://via.placeholder.com/150"
    },
    {
        id: 10,
        nombre: "Producto 10",
        descripcion: "Descripción del producto 10",
        codigo: "010",
        categoria: "Categoria 10",
        precio_compra: 1000,
        precio_venta: 1050,
        cantidad: 100,
        imagen: "https://via.placeholder.com/150"
    }
    
];
export const EmpleadoHome = () => {

    const navigate = useNavigate();

    const handleVerProducto = (id) => {
       navigate(`/producto/${id}`);
    }
    return (
        <>  
            <div className="bg-primary-100 h-16">
                <Navbar />
            </div>
            <div className="mt-20 grid grid-cols-3 p-4 gap-4">
                {productos.map((producto) => (
                    <CardEmpleado key={producto.id}>
                        <h1 className="text-2xl font-bold text-center">
                            {producto.nombre + " - " + producto.codigo}  
                        </h1>
                        <br/>
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
                        <div className="flex items-center justify-center">

                            <button
                                className="bg-green-400 px-4 py-1 rounded-md my-2 disabled:bg-primary-300 w-full text-text-100 font-bold mr-2"
                                
                            >
                                Agregar Carrito
                            </button>


                            
                            <button
                                className="bg-blue-400 px-4 py-1 rounded-md my-2 disabled:bg-primary-300 w-full text-text-100 font-bold"
                                onClick={() => handleVerProducto(producto.id)}
                            >
                                Ver Producto
                            </button>
                        </div>
                    </CardEmpleado>
                ))}
            </div>
        </>
    );
}

export default EmpleadoHome;