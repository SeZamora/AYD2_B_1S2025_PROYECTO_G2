import { CardEmpleado } from '../../ui/CardEmpleado';
import Navbar from '../../ui/componets/NavEmpleado';
import React from 'react';
import './empleado.css'

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


export const VerFacturas = () => {
    return(
        <>  
            <div className="bg-primary-100 h-16">
                <Navbar />
            </div>
            <div className="mt-20 grid grid-cols-3 p-4 gap-4">
                {facturas.map((factura) => (
                    <CardEmpleado key={factura.id}>
                        <div className="flex ">
                            <label className="text-xl font-bold mr-2">ID:</label>
                            <h1 className="text-xl">
                                {factura.id}
                            </h1>
                        </div>
                        <div className="flex ">
                            <label className="text-xl font-bold mr-2">Total:</label>
                            <h1 className="text-xl">
                                {factura.total_venta}
                            </h1>
                        </div>
                        <div className="flex ">
                            <label className="text-xl font-bold mr-2">Vendedor:</label>
                            <h1 className="text-xl">
                                {factura.nombre_vendedor}
                            </h1>
                        </div>
                        <div className="flex ">
                            <label className="text-xl font-bold mr-2">Comprador:</label>
                            <h1 className="text-xl">
                                {factura.nombre_comprador}
                            </h1>
                        </div>
                        <div className="flex ">
                            <label className="text-xl font-bold mr-2">Fecha:</label>
                            <h1 className="text-xl">
                                {factura.fecha_hora}
                            </h1>
                        </div>
                        <div className="flex items-center justify-center">                           
                            <button
                                className="bg-green-400 px-4 py-1 rounded-md my-2 disabled:bg-primary-300 w-full text-text-100 font-bold"
                            >
                                Descargar
                            </button>
                        </div>
                    </CardEmpleado>
                ))}
            </div>
        </>
    );

};

export default VerFacturas;