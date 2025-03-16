import { CardEmpleado } from '../../ui/CardEmpleado';
import Navbar from '../../ui/componets/NavEmpleado';
import React, { useEffect } from 'react';
import './empleado.css'


export const VerFacturas = () => {
    const [facturas, setFacturas] = React.useState([]);
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

    return(
        <>  
            <div className="bg-primary-100 h-16">
                <Navbar />
            </div>
            <div className="mt-20 grid grid-cols-3 p-4 gap-4">
                {facturas.map((factura) => (
                    <CardEmpleado key={factura.id_facturas}>
                        <div className="flex ">
                            <label className="text-xl font-bold mr-2">ID Factura:</label>
                            <h1 className="text-xl">
                                {factura.id_facturas}
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
                                {new Date(factura.fecha_hora).toLocaleString()}
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