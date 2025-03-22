import React, { useState, useEffect } from 'react';
import '../../../styles/Employetable.css';
import AddEmployeeModal from './AddEmployeeModal';
import DeleteLibroModal from './EliminarEm';

const EmployeeTable = () => {
    const [showModal, setShowModal] = useState(false);
    const [role, setRole] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await fetch("http://localhost:3000/employee/getAllEmployees");
            const data = await response.json();
            console.log(data.employeeInvoices);
            if (data.success) {
                setEmployees(data.employeeInvoices);
            } else {
                console.error("Error obteniendo empleados:", data.message);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const toggleModal = () => {
        setShowModal(prev => !prev);
        setRole(prev => (prev ? '' : 'add'));
    };

    const toggleModalM = (id) => {
        setSelectedEmployeeId(id);
        setShowModal(prev => !prev);
        setRole(prev => (prev ? '' : 'modify'));
    };

    const toggleDeleteModal = (id) => {
        setSelectedEmployeeId(id);
        setShowDeleteModal(prev => !prev);
    };

    const abrirModal = (facturas) => {
        console.log("Facturas recibidas:", facturas); // Verifica si es un array
        setFacturaSeleccionada(Array.isArray(facturas) ? facturas : []);
        setModalAbierto(true);
    };
    

    const cerrarModal = () => {
        setModalAbierto(false);
    };

    return (
        <>
            <div className="d-flex justify-content-center" style={{ height: "20%" }}>
                <div className="search">
                    <input type="text" className="search-input" />
                    <span className="search-icon">
                        <i className="fa fa-search"></i>
                    </span>
                </div>
            </div>
            <div className="container">
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-xs-6">
                                    <h2>Empleados</h2>
                                </div>
                                <div className="col-xs-6 text-right">
                                    <button className="btn btn-success" onClick={toggleModal}>
                                        <i className="material-icons">&#xE147;</i> <span>Añadir Nuevo Empleado</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>CUI</th>
                                    <th>Teléfono</th>
                                    <th>Fecha de contratación</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee) => (
                                    <tr key={employee.empleados_id}>
                                        <td onClick={() => abrirModal(employee.facturas)}>{employee.nombre}</td>
                                        <td>{employee.apellido}</td>
                                        <td>{employee.cui}</td>
                                        <td>{employee.telefono}</td>
                                        <td>{employee.fecha}</td>
                                        <td>
                                            <a onClick={() => toggleModalM(employee.empleados_id)} className="edit" data-toggle="modal">
                                                <i className="fa fa-pencil" aria-hidden="true"></i>
                                            </a>
                                            <a onClick={() => toggleDeleteModal(employee.empleados_id)} className="delete" data-toggle="modal">
                                                <i className="fa fa-trash" aria-hidden="true"></i>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <AddEmployeeModal showModal={showModal} toggleModal={toggleModal} role={role} productId={selectedEmployeeId} />
                <DeleteLibroModal showDeleteModal={showDeleteModal} toggleDeleteModal={toggleDeleteModal} Idato={selectedEmployeeId} />
            </div>

            {modalAbierto && facturaSeleccionada && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800">Ventas Realizadas {facturaSeleccionada.id_facturas}</h1>

                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Fecha y Hora</th>
                                        <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Comprador</th>
                                        <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Total Venta</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {Array.isArray(facturaSeleccionada) && facturaSeleccionada.length > 0 ? (
    facturaSeleccionada.map((factura, index) => (
        <tr key={index} className="hover:bg-gray-50 transition-colors">
            <td className="py-3 px-4 border-b text-sm text-gray-700">{factura.fecha_hora}</td>
            <td className="py-3 px-4 border-b text-sm text-gray-700">{factura.nombre_comprador}</td>
            <td className="py-3 px-4 border-b text-sm text-gray-700">Q {factura.total_venta}</td>
        </tr>
    ))
) : (
    <tr>
        <td colSpan="3" className="py-3 px-4 text-center text-gray-500">No hay detalles disponibles</td>
    </tr>
)}

                                </tbody>

                            </table>
                        </div>

                        <button onClick={cerrarModal} className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md">
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default EmployeeTable;
