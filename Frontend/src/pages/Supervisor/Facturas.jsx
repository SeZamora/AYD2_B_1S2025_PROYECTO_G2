import { CardEmpleado } from '../../ui/CardEmpleado';
import Navbar from "../../ui/componets/NabSupervisor";
import React, { useEffect, useState } from 'react';

export const VerFacturasSupervisor = () => {
    const [facturas, setFacturas] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('cliente');
     const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [facturaSeleccionada, setFacturaSeleccionada] = useState(null); // Estado para factura seleccionada
    const [modalAbierto, setModalAbierto] = useState(false); // Estado para controlar el modal

    useEffect(() => {
        fetch(`http://localhost:3000/bill/bills`)
            .then((response) => response.json())
            .then((data) => {
                setFacturas(data.data);
            })
            .catch((error) => {
                console.error('Error al obtener los datos:', error);
            });
    }, []);

    const filteredFacturas = facturas.filter((factura) => {
        const fieldToSearch = searchType === 'cliente' ? factura.nombre_comprador : factura.nombre_vendedor;
        const matchesSearch = fieldToSearch.toLowerCase().includes(searchQuery.toLowerCase());

        const facturaDate = new Date(factura.fecha_hora);
        const matchesDateRange = (
            (!startDate || facturaDate >= new Date(startDate)) &&
            (!endDate || facturaDate <= new Date(endDate))
        );

        return matchesSearch && matchesDateRange;
    });

    const abrirModal = (factura) => {
        setFacturaSeleccionada(factura);
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
    };

    return (
        <>
            <div className="bg-primary-100 h-16">
                <Navbar />
            </div>

            <div className="container-fluid" style={{ padding: '0', overflow: 'hidden' }}>
                {/* Filtro de búsqueda */}
                <div className="row justify-content-evenly" style={{ marginTop: '30px' }}>
                    <div className="col-4" style={{
                        height: '50px',
                        backgroundColor: '#e59a34',
                        padding: '10px',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '50%'
                    }}>
                        <select
                            style={{
                                fontSize: '15px',
                                height: '30px',
                                borderRadius: '8px',
                                border: '1px solid #e59a34',
                                backgroundColor: '#fff',
                                color: '#333',
                                outline: 'none',
                                marginRight: '10px'
                            }}
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                        >
                            <option value="cliente">Cliente</option>
                            <option value="empleado">Empleado</option>
                        </select>
                        <input
                            type="text"
                            style={{
                                color: 'white',
                                border: '0',
                                outline: '0',
                                background: 'none',
                                width: '650px',
                                padding: '0 10px',
                                fontSize: '21px',
                                fontWeight: '300',
                                transition: 'width 0.4s linear'
                            }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={`Buscar por ${searchType}`}
                        />
                        <a href="#" style={{
                            width: '50px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                            backgroundColor: '#268b8f',
                            borderRadius: '10px',
                            transition: 'background-color 0.3s ease',
                            textDecoration: 'none'
                        }} onMouseOver={(e) => e.target.style.backgroundColor = '#1f6d6e'} onMouseOut={(e) => e.target.style.backgroundColor = '#268b8f'}>
                            <i className="fa fa-search"></i>
                        </a>
                    </div>
                    <div className="col-4" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            style={{
                                padding: '10px',
                                fontSize: '16px',
                                borderRadius: '8px',
                                border: '1px solid #e59a34',
                                backgroundColor: '#fff',
                                color: '#333',
                                outline: 'none',
                                transition: 'border 0.3s ease'
                            }}
                        />
                        <span style={{ fontSize: '18px', color: '#333', fontWeight: 'bold' }}>a</span>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            style={{
                                padding: '10px',
                                fontSize: '16px',
                                borderRadius: '8px',
                                border: '1px solid #e59a34',
                                backgroundColor: '#fff',
                                color: '#333',
                                outline: 'none',
                                transition: 'border 0.3s ease'
                            }}
                        />
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-3 p-4 gap-4" style={{
                    overflowY: 'auto',
                    maxHeight: 'calc(100vh - 160px)',
                    paddingBottom: '20px'
                }}>
                    {filteredFacturas.map((factura) => (
                        <CardEmpleado key={factura.id_facturas}>
                            <div className="flex">
                                <label className="text-xl font-bold mr-2">ID Factura:</label>
                                <h1 className="text-xl">{factura.id_facturas}</h1>
                            </div>
                            <div className="flex">
                                <label className="text-xl font-bold mr-2">Total:</label>
                                <h1 className="text-xl">{factura.total_venta}</h1>
                            </div>
                            <div className="flex">
                                <label className="text-xl font-bold mr-2">Vendedor:</label>
                                <h1 className="text-xl">{factura.nombre_vendedor}</h1>
                            </div>
                            <div className="flex">
                                <label className="text-xl font-bold mr-2">Comprador:</label>
                                <h1 className="text-xl">{factura.nombre_comprador}</h1>
                            </div>
                            <div className="flex">
                                <label className="text-xl font-bold mr-2">Fecha:</label>
                                <h1 className="text-xl">{new Date(factura.fecha_hora).toLocaleString()}</h1>
                            </div>
                            {/* Botón para abrir el modal */}
                            <button
                                onClick={() => abrirModal(factura)}
                                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Ver detalles
                            </button>
                        </CardEmpleado>
                    ))}
                </div>
            </div>

            {/* Modal con detalles de la factura */}
            {modalAbierto && facturaSeleccionada && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800">Factura #{facturaSeleccionada.id_facturas}</h1>
                            <p className="text-sm text-gray-500">Detalles de la transacción</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <p className="text-gray-600"><strong>Vendedor:</strong> {facturaSeleccionada.nombre_vendedor}</p>
                                <p className="text-gray-600"><strong>Comprador:</strong> {facturaSeleccionada.nombre_comprador}</p>
                            </div>
                            <div>
                                <p className="text-gray-600"><strong>Fecha y Hora:</strong> {new Date(facturaSeleccionada.fecha_hora).toLocaleString()}</p>
                                <p className="text-gray-600"><strong>ID Empleado:</strong> {facturaSeleccionada.empleados_id}</p>
                            </div>
                        </div>

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
                                    {facturaSeleccionada.detalles.map((detalle, index) => (
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

                        <button
                            onClick={cerrarModal}
                            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default VerFacturasSupervisor;
