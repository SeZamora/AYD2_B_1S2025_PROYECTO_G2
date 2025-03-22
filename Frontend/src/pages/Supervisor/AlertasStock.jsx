import Navbar from "../../ui/componets/NabSupervisor";
import React, { useEffect, useState } from 'react';


export const AlertasStockSupervisor = () => {
    const [stockGeneral, setStockGeneral] = useState(10); 
    const [productos, setProductos] = useState([]); 
    const [alertas, setAlertas] = useState([]);

  
    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const [productosResponse, alertasResponse] = await Promise.all([
                    fetch("http://localhost:3000/product/getAllProducts"),
                    fetch("http://localhost:3000/product/alertasStock"),
                ]);
    
                if (!productosResponse.ok || !alertasResponse.ok) {
                    throw new Error("Error al obtener los datos");
                }
    
                const productosData = await productosResponse.json();
                const alertasData = await alertasResponse.json();
    
                if (productosData.success && alertasData.success) {
                    const productosFormateados = productosData.data.map((producto) => ({
                        id: producto.id_producto,
                        nombre: producto.nombre,
                        stock: producto.cantidad,
                        stockMinimo: producto.stock_minimo || 0,
                    }));
                    setProductos(productosFormateados);
                    actualizarAlertas(stockGeneral, productosFormateados);
    
                    const alertasFormateadas = alertasData.alertas.map((alerta) => ({
                        id: alerta.id_producto,
                        nombre: alerta.nombre,
                        stock: alerta.cantidad,
                        stockMinimo: alerta.stock_minimo,
                    }));
                    setAlertas(alertasFormateadas);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Hubo un error al obtener los datos.");
            }
        };
    
        obtenerDatos();
    }, []);


    useEffect(() => {
        const obtenerAlertas = async () => {
            try {
                const response = await fetch("http://localhost:3000/product/alertasStock");
                if (!response.ok) {
                    throw new Error("Error al obtener las alertas");
                }
                const data = await response.json();
                if (data.success) {
                    
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

   
 
    const actualizarAlertas = (stockGeneral, productos) => {
        const nuevasAlertas = productos.filter((producto) => {
            const stockMinimo = producto.stockMinimo !== null ? producto.stockMinimo : stockGeneral;
            return producto.stock < stockMinimo;
        });
        setAlertas(nuevasAlertas);
    };
    return (
        <>
            <div className="bg-primary-100 h-16">
                <Navbar />
            </div>
            <center><h1 className="text-2xl font-bold mb-6">Alertas de Stock de Productos</h1></center>
              
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
            </>
    );
};

export default AlertasStockSupervisor;