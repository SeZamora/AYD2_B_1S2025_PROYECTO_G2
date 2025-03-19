import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./styles/alertaStock.css";

const AlertasStock = () => {
    const [stockGeneral, setStockGeneral] = useState(10); // Stock mínimo general
    const [productos, setProductos] = useState([]); // Lista de productos
    const [alertas, setAlertas] = useState([]); // Alertas activas

    // Obtener los productos al cargar el componente
    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const response = await fetch("http://localhost:3000/product/getAllProducts");
                if (!response.ok) {
                    throw new Error("Error al obtener los productos");
                }
                const data = await response.json();
                if (data.success) {
                    // Mapear los datos de la API al formato esperado por el componente
                    const productosFormateados = data.data.map((producto) => ({
                        id: producto.id_producto,
                        nombre: producto.nombre,
                        stock: producto.cantidad,
                        stockMinimo: producto.stock_minimo || 0, // Si no tiene stock mínimo, se establece en 0
                    }));
                    setProductos(productosFormateados);
                    actualizarAlertas(stockGeneral, productosFormateados); // Actualizar alertas al cargar productos
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Hubo un error al obtener los productos.");
            }
        };
        obtenerProductos();
    }, []);

    // Obtener las alertas activas
    useEffect(() => {
        const obtenerAlertas = async () => {
            try {
                const response = await fetch("http://localhost:3000/product/alertasStock");
                if (!response.ok) {
                    throw new Error("Error al obtener las alertas");
                }
                const data = await response.json();
                if (data.success) {
                    // Mapear los datos de la API al formato esperado por el componente
                    const alertasFormateadas = data.alertas.map((alerta) => ({
                        id: alerta.id_producto,
                        nombre: alerta.nombre,
                        stock: alerta.cantidad,
                        stockMinimo: alerta.stock_minimo,
                    }));
                    setAlertas(alertasFormateadas);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Hubo un error al obtener las alertas.");
            }
        };
        obtenerAlertas();
    }, []);

    // Función para actualizar el stock mínimo general
    const handleStockGeneralChange = (e) => {
        const nuevoStock = parseInt(e.target.value, 10);
        setStockGeneral(nuevoStock);
    };

    // Función para guardar o aplicar el stock mínimo general
    const handleGuardarStockGeneral = async () => {
        try {
            const response = await fetch("http://localhost:3000/product/stockGeneral", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ stockGeneral }),
            });

            if (!response.ok) {
                throw new Error("Error al establecer el stock mínimo general");
            }

            const data = await response.json();
            console.log(data); // Puedes manejar la respuesta del servidor aquí

            // Actualizar las alertas después de establecer el stock mínimo general
            actualizarAlertas(stockGeneral, productos);
            alert(`Stock mínimo general actualizado a ${stockGeneral} unidades.`);
        } catch (error) {
            console.error("Error:", error);
            alert("Hubo un error al establecer el stock mínimo general.");
        }
    };

    // Función para actualizar el stock mínimo de un producto específico
    const handleEstablecerStockProducto = async (id, nuevoStockMinimo) => {
        console.log("Estableciendo stock mínimo para el producto", id, "a", nuevoStockMinimo);
        try {
            const response = await fetch("http://localhost:3000/product/stockPorProducto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id_producto: id, stock_minimo: nuevoStockMinimo }),
            });

            if (!response.ok) {
                throw new Error("Error al establecer el stock mínimo del producto");
            }

            const data = await response.json();
            console.log(data); // Puedes manejar la respuesta del servidor aquí

            // Actualizar el estado local de los productos
            const nuevosProductos = productos.map((producto) =>
                producto.id === id ? { ...producto, stockMinimo: nuevoStockMinimo } : producto
            );
            setProductos(nuevosProductos);

            // Actualizar las alertas después de establecer el stock mínimo del producto
            actualizarAlertas(stockGeneral, nuevosProductos);
            alert(`Stock mínimo del producto actualizado a ${nuevoStockMinimo} unidades.`);
        } catch (error) {
            console.error("Error:", error);
            alert("Hubo un error al establecer el stock mínimo del producto.");
        }
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
                                            defaultValue={producto.stockMinimo !== null ? producto.stockMinimo : 0}
                                            className="w-20 p-2 border rounded"
                                            min="0"
                                            onChange={(e) => {
                                                // Actualizar el valor temporalmente en el estado local
                                                const nuevosProductos = productos.map((p) =>
                                                    p.id === producto.id
                                                        ? { ...p, stockMinimo: parseInt(e.target.value, 10) }
                                                        : p
                                                );
                                                setProductos(nuevosProductos);
                                            }}
                                        />
                                    </td>
                                    <td className="border p-2">
                                        <button
                                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                            onClick={() => {
                                                const nuevoStockMinimo = producto.stockMinimo;
                                                if (!isNaN(nuevoStockMinimo) && nuevoStockMinimo >= 0) {
                                                    handleEstablecerStockProducto(producto.id, nuevoStockMinimo);
                                                } else {
                                                    alert("Por favor, ingrese un valor válido.");
                                                }
                                            }}
                                        >
                                            Establecer Stock
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
                                        <td className="border p-2">{alerta.stockMinimo}</td>
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