import { useState } from "react";
import Navbar from "./components/Navbar";
import "./styles/alertaStock.css";

const AlertasStock = () => {
    const [stockGeneral, setStockGeneral] = useState(10); // Stock mínimo general
    const [productos, setProductos] = useState([
        { id: 1, nombre: "Lapicero", stock: 15, stockMinimo: null },
        { id: 2, nombre: "Cuaderno", stock: 8, stockMinimo: null },
        { id: 3, nombre: "Borrador", stock: 20, stockMinimo: null },
    ]);
    const [alertas, setAlertas] = useState([]);

    // Función para actualizar el stock mínimo general
    const handleStockGeneralChange = (e) => {
        const nuevoStock = parseInt(e.target.value, 10);
        setStockGeneral(nuevoStock);
    };

    // Función para guardar o aplicar el stock mínimo general
    const handleGuardarStockGeneral = () => {
        actualizarAlertas(stockGeneral, productos);
        alert(`Stock mínimo general actualizado a ${stockGeneral} unidades.`);
    };

    // Función para actualizar el stock mínimo de un producto específico
    const handleStockProductoChange = (id, nuevoStockMinimo) => {
        const nuevosProductos = productos.map((producto) =>
            producto.id === id ? { ...producto, stockMinimo: nuevoStockMinimo } : producto
        );
        setProductos(nuevosProductos);
        actualizarAlertas(stockGeneral, nuevosProductos);
    };

    // Función para actualizar las alertas
    const actualizarAlertas = (stockGeneral, productos) => {
        const nuevasAlertas = productos.filter((producto) => {
            const stockMinimo = producto.stockMinimo !== null ? producto.stockMinimo : stockGeneral;
            return producto.stock < stockMinimo;
        });
        setAlertas(nuevasAlertas);
    };

    return (
        <>
            <div className="p-6">
                <Navbar />
                <br />
                <center><h1 className="text-2xl font-bold mb-6">Alertas de Stock de Productos</h1></center>
                {/* Configuración General */}
                <div className="configuracion-general">
                    <h2>Configuración General</h2>
                    <div className="flex items-center gap-4">
                        <label>Stock mínimo para todos los productos:</label>
                        <input
                            type="number"
                            value={stockGeneral}
                            onChange={handleStockGeneralChange}
                            className="w-20 p-2 border rounded"
                            min="0"
                        />
                        <button
                            onClick={handleGuardarStockGeneral}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Establecer
                        </button>
                    </div>
                </div>

                {/* Configuración por Producto */}
                <div className="mb-8 p-4 border rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Configuración por Producto</h2>
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">Producto</th>
                                <th className="border p-2">Stock Actual</th>
                                <th className="border p-2">Stock Mínimo</th>
                                <th className="border p-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((producto) => (
                                <tr key={producto.id} className="text-center">
                                    <td className="border p-2">{producto.nombre}</td>
                                    <td className="border p-2">{producto.stock}</td>
                                    <td className="border p-2">
                                        <input
                                            type="number"
                                            value={producto.stockMinimo !== null ? producto.stockMinimo : ""}
                                            onChange={(e) =>
                                                handleStockProductoChange(producto.id, parseInt(e.target.value, 10))
                                            }
                                            className="w-20 p-2 border rounded"
                                            min="0"
                                            placeholder={stockGeneral}
                                        />
                                    </td>
                                    <td className="border p-2">
                                        <button
                                            className="text-red-500"
                                            onClick={() => handleStockProductoChange(producto.id, null)}
                                        >
                                            Establecer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Alertas Activas */}
                <div className="p-4 border rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Alertas Activas</h2>
                    {alertas.length > 0 ? (
                        <table className="w-full border-collapse border">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-2">Producto</th>
                                    <th className="border p-2">Stock Actual</th>
                                    <th className="border p-2">Stock Mínimo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {alertas.map((alerta) => (
                                    <tr key={alerta.id} className="text-center">
                                        <td className="border p-2">{alerta.nombre}</td>
                                        <td className="border p-2 text-red-500">{alerta.stock}</td>
                                        <td className="border p-2">
                                            {alerta.stockMinimo !== null ? alerta.stockMinimo : stockGeneral}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500">No hay alertas activas.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default AlertasStock;