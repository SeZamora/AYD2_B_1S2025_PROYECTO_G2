import React, { useState } from 'react';
import '../../../styles/Employetable.css';
import AddEmployeeModal from './AddEmployeeModal'; // Asegúrate de importar correctamente el archivo

const EmployeeTable = () => {
    const [showModal, setShowModal] = useState(false);
    const [role2, setRole] = useState('');

    const employees = [
        { id: 1, nombre: "Thomas", apellido: "Hardy", cui: "123456789", telefono: "(171) 555-2222", fecha: "2023-05-14" },
        { id: 2, nombre: "Maria", apellido: "Gonzalez", cui: "987654321", telefono: "(171) 555-3333", fecha: "2022-08-20" },
        { id: 3, nombre: "Carlos", apellido: "Ramirez", cui: "456123789", telefono: "(171) 555-4444", fecha: "2021-10-30" },
        { id: 4, nombre: "Sofia", apellido: "López", cui: "321654987", telefono: "(171) 555-5555", fecha: "2020-12-15" },
        // Más empleados aquí...
    ];

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


    const toggleModalM = () => {
        setShowModal(prev => {
            const newShowModal = !prev;
            if (newShowModal) {
                setRole('modify'); // Solo asigna 'admin' cuando el modal se abre
            } else {
                setRole(''); // Puedes limpiar el estado cuando se cierra si lo deseas
            }
            return newShowModal;
        });
    };
    
    
    

    return (
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
                            {employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.nombre}</td>
                                    <td>{employee.apellido}</td>
                                    <td>{employee.cui}</td>
                                    <td>{employee.telefono}</td>
                                    <td>{employee.fecha}</td>
                                    <td>
                                        <a onClick={toggleModalM} className="edit" data-toggle="modal">
                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                        </a>
                                        <a href="#deleteEmployeeModal" className="delete" data-toggle="modal">
                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AddEmployeeModal showModal={showModal} toggleModal={toggleModal} role={role2}/>
        </div>
    );
};

export default EmployeeTable;
