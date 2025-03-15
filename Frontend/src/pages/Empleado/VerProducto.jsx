import { useParams } from "react-router-dom";
import Navbar from '../../ui/componets/NavEmpleado';

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
    }
];

export const ProductoDetalle = () => {
    const { id } = useParams();
    const producto = productos.find(p => p.id === parseInt(id));

    if (!producto) {
        return <h1>Producto no encontrado</h1>;
    }

    return (
        <>
            <div className="bg-primary-100 h-16">
                    <Navbar/>
            </div>
            <div className="mt-20 ">
                <div className="bg-white shadow-lg rounded-2xl p-6 max-w-sm mx-auto border border-gray-200">
                    <h1 className="md:text-6xl font-extrabold text-center  bg-gradient-to-r 
                    from-indigo-500 to-teal-400  bg-clip-text text-transparent shadow-md tracking-wide mb-4 ">{producto.nombre}</h1>
                    <img 
                        src={producto.imagen} 
                        alt={producto.nombre} 
                        className="w-full h-1/2 object-cover rounded-lg mt-4"
                    />
                    <div className="mt-4 space-y-6 text-gray-700">
                        <p className="text-2xl"><span className="font-semibold">Descripción:</span> {producto.descripcion}</p>
                        <p className="text-2xl"><span className="font-semibold">Código:</span> {producto.codigo}</p>
                        <p className="text-2xl"><span className="font-semibold">Categoría:</span> {producto.categoria}</p>
                        <p className="text-2xl text-green-600 font-bold"><span className="font-semibold">Precio de Venta:</span> ${producto.precio_venta}</p>
                        <p className="text-2xl  text-gray-500"><span className="font-semibold">Cantidad Disponible:</span> {producto.cantidad}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductoDetalle;
