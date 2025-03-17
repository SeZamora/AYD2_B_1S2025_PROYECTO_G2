import { useState } from "react";
import Navbar from '../../ui/componets/NavEmpleado';
import ModalFactura from './components/ModalFactura';



export const BuscarFactura = () => {
    const [idFactura, setIdFactura] = useState("");
    const [facturaEncontrada, setFacturaEncontrada] = useState(null);

    const buscarFactura = () => {
        fetch(`http://localhost:3000/bill/getBillById`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id: Number(idFactura) })
        })
        .then((response) => response.json())
        .then((data) => {
            setFacturaEncontrada(data.data);
        })
        .catch((error) => {
            console.error('Error al obtener los datos:', error);
        });
    };

    const [isModalOpenPdf, setIsModalOpenPdf] = useState(false);
    
    const handleCloseModalPdf = () => {
        setIsModalOpenPdf(false);
    };

    const handleOpenModalPdf = () => {
        setIsModalOpenPdf(true);
    };


    return (
        <>
            <div className="bg-primary-100 h-16">
                    <Navbar />
            </div>
            <div className="container mt-4">
                <h2 className="mb-3">Buscar Factura</h2>
                <div className="input-group mb-3">
                    <input 
                        type="number" 
                        className="form-control" 
                        placeholder="Ingrese el ID de la factura" 
                        onChange={(e) => setIdFactura(e.target.value)}
                        value={idFactura}
                    />
                    <button className="btn btn-primary" onClick={buscarFactura}>
                        Buscar
                    </button>
                </div>

                {facturaEncontrada ? (
                    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
                        {/* Encabezado de la factura */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800">Factura #{facturaEncontrada.id_facturas}</h1>
                            <p className="text-sm text-gray-500">Detalles de la transacción</p>
                        </div>

                        {/* Información de la factura */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <p className="text-gray-600"><strong>Vendedor:</strong> {facturaEncontrada.nombre_vendedor}</p>
                                <p className="text-gray-600"><strong>Comprador:</strong> {facturaEncontrada.nombre_comprador}</p>
                            </div>
                            <div>
                                <p className="text-gray-600"><strong>Fecha y Hora:</strong> {new Date(facturaEncontrada.fecha_hora).toLocaleString()}</p>
                                <p className="text-gray-600"><strong>ID Empleado:</strong> {facturaEncontrada.empleados_id}</p>
                            </div>
                        </div>

                        {/* Tabla de detalles de la factura */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Producto ID</th>
                                        <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Unidades Compradas</th>
                                        <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Precio Unitario</th>
                                        <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {facturaEncontrada.detalles.map((detalle, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="py-3 px-4 border-b text-sm text-gray-700">{detalle.producto_id}</td>
                                            <td className="py-3 px-4 border-b text-sm text-gray-700">{detalle.unidades_compradas}</td>
                                            <td className="py-3 px-4 border-b text-sm text-gray-700">Q {detalle.precio_producto}</td>
                                            <td className="py-3 px-4 border-b text-sm text-gray-700">Q {(detalle.unidades_compradas * parseFloat(detalle.precio_producto)).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Total de la venta */}
                        <div className="mt-8 text-right">
                            <p className="text-lg font-semibold text-gray-800">
                                <strong>Total de la Venta:</strong> Q {facturaEncontrada.total_venta}
                            </p>

                            <button
                                className="bg-green-400 px-4 py-1 rounded-md my-2 disabled:bg-primary-300 w-full text-text-100 font-bold"
                                onClick={() => handleOpenModalPdf(facturaEncontrada, idFactura)}
                            >
                                Ver PDF
                            </button>
                        </div>

                        
                        {isModalOpenPdf && (
                                        <ModalFactura
                                            isOpen={isModalOpenPdf}
                                            onClose={handleCloseModalPdf} 
                                            factura={facturaEncontrada}
                                            id_factura={idFactura}
                                        />
                        )}
                    </div>
                ) : idFactura && (
                    <p className="text-center text-red-500 font-semibold">Factura no encontrada</p>
                )}
            </div>
        </>
    );
};

export default BuscarFactura;
