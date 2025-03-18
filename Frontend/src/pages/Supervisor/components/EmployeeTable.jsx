import React, { useState, useEffect } from 'react';
import '../../../styles/Employetable.css';
import AddEmployeeModal from './AddEmployeeModal'; // Asegúrate de importar correctamente el archivo

import DeleteLibroModal from './EliminarEm';

const EmployeeTable = () => {
 const [showModal, setShowModal] = useState(false);
    const [role2, setRole] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para el modal de eliminación
    const [estado, setEstado] = useState('');
    const [selectedProductId, setSelectedProductId] = useState(null);

 const [employee, setProductos] = useState([]); // Inicializamos el estado 'productos'


    const fetchProductos = async () => {
        try {
            const response = await fetch("http://localhost:3000/employee/getAllEmployee");
            const data = await response.json();
            if (data.success) {
                console.log(data);
                setProductos(data.employees);

            } else {
                console.error("Error obteniendo productos:", data.message);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };
    
    
    useEffect(() => {
        fetchProductos();
    }, []);



    const toggleModal = () => {
        setShowModal(prev => {
            const newShowModal = !prev;
            if (newShowModal) {
                setRole('add'); // Solo asigna 'admin' cuando el modal se abre
            } else {
                setRole(''); // Puedes limpiar el estado cuando se cierra si lo deseas
            }
            return newShowModal;
        });
    };


    const toggleModalM = (id) => {
        setSelectedProductId(id);
        setShowModal(prev => {
            const newShowModal = !prev;
            if (newShowModal) {
                setRole('modify'); 
            } else {
                setRole(''); 
                setSelectedProductId(null);
            }
            return newShowModal;
        });
    };
    
    
    const toggleDeleteModal = ( id) => {
        setSelectedProductId(id);
        setShowDeleteModal(prev => !prev);
    };
    



    return (
        <>
        <div class="d-flex justify-content-center" style={{ height: "20%" }}>
                  <div class="search">
                    <input type="text" class="search-input" name="" />
                    <a href="#" class="search-icon">
                      <i class="fa fa-search"></i>
                    </a>
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
                                <button className="btn btn-success" onClick={toggleModal} >
                                    <i className="material-icons">&#xE147;</i> <span>Add New Employee</span>
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
                            {employee.map((employee) => (
                                <tr key={employee.empleados_id}>
                                    <td>{employee.nombre}</td>
                                    <td>{employee.apellido}</td>
                                    <td>{employee.cui}</td>
                                    <td>{employee.telefono}</td>
                                    <td>{employee.fecha}</td>
                                    <td>
                                    <a onClick={() => toggleModalM(employee.empleados_id)} className="edit" data-toggle="modal">
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                        </a>
                                        <a onClick={() => toggleDeleteModal(employee.empleados_id)}className="delete" data-toggle="modal">
                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AddEmployeeModal showModal={showModal} toggleModal={toggleModal} role={role2} productId={selectedProductId} />
            <DeleteLibroModal showDeleteModal={showDeleteModal} toggleDeleteModal={toggleDeleteModal} Idato={selectedProductId}   />

        </div>
        </>
    );
};

export default EmployeeTable;
