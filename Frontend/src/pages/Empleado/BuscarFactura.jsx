import { useState } from "react";
import Navbar from '../../ui/componets/NavEmpleado';

const facturas = [
    {
        id: 1,
        nombre_vendedor: "Vendedor 1",
        fecha_hora: "2021-10-01 10:00:00",
        total_venta: 1000,
        nombre_comprador: "Comprador 1",
        cuenta_id_cuenta: 1,
        empleados_id: 1
    },
    {
        id: 2,
        nombre_vendedor: "Vendedor 2",
        fecha_hora: "2021-10-02 10:00:00",
        total_venta: 2000,
        nombre_comprador: "Comprador 2",
        cuenta_id_cuenta: 2,
        empleados_id: 2
    },
    {
        id: 3,
        nombre_vendedor: "Vendedor 3",
        fecha_hora: "2021-10-03 10:00:00",
        total_venta: 3000,
        nombre_comprador: "Comprador 3",
        cuenta_id_cuenta: 3,
        empleados_id: 3
    }
];

export const BuscarFactura = () => {
    const [idFactura, setIdFactura] = useState("");
    const [facturaEncontrada, setFacturaEncontrada] = useState(null);

    const buscarFactura = () => {
        const factura = facturas.find(f => f.id === parseInt(idFactura));
        setFacturaEncontrada(factura || null);
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
                        value={idFactura} 
                        onChange={(e) => setIdFactura(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={buscarFactura}>
                        Buscar
                    </button>
                </div>

                {facturaEncontrada ? (
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Factura #{facturaEncontrada.id}</h5>
                            <p><strong>Vendedor:</strong> {facturaEncontrada.nombre_vendedor}</p>
                            <p><strong>Fecha y Hora:</strong> {facturaEncontrada.fecha_hora}</p>
                            <p><strong>Total Venta:</strong> ${facturaEncontrada.total_venta}</p>
                            <p><strong>Comprador:</strong> {facturaEncontrada.nombre_comprador}</p>
                            <p><strong>ID Cuenta:</strong> {facturaEncontrada.cuenta_id_cuenta}</p>
                            <p><strong>ID Empleado:</strong> {facturaEncontrada.empleados_id}</p>
                        </div>
                    </div>
                ) : idFactura && (
                    <p className="text-danger">Factura no encontrada</p>
                )}
            </div>
        </>
    );
};

export default BuscarFactura;
