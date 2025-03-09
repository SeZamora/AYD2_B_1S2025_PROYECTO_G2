import React, { useEffect, useState } from 'react';

const AddLibrosModal = ({ showModal, toggleModal, role }) => {
    const [formData, setFormData] = useState({
        Títulodellibro  : '',
        Autor: '',
        Fechadelanzamiento: '',
        Descripción : '',
        género: '',
        stock: '',
        Precio: ''
    });

    useEffect(() => {
        if (showModal) {
            console.log(role);
        }
    }, [showModal, role]);

    return (
        <>
            {/* Fondo gris semi-transparente */}
            {showModal && (
                <div
                    className="modal-backdrop fade show"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1040
                    }}
                    onClick={toggleModal}
                />
            )}

            {/* Modal */}
            <div
                className={`modal fade ${showModal ? 'show' : ''}`}
                tabIndex="-1"
                role="dialog"
                style={{
                    display: showModal ? 'block' : 'none',
                    zIndex: 1050,
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
                aria-labelledby="addEmployeeModalLabel"
                aria-hidden={!showModal}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addEmployeeModalLabel">
                                {role === 'edit' ? 'Editar Empleado' : 'Agregar Nuevo Empleado'}
                            </h5>
                        </div>
                        <div className="modal-body">
                            <form>
                                {role === 'add' && (
                                    <>
                                        <div className="form-group">
                                            <label htmlFor="employeeName">Título del libro</label>
                                            <input type="text" className="form-control" id="employeeName"  />
                                        </div>                            
                                        <div className="form-group">
                                            <label htmlFor="employeeCUI">Autor</label>
                                            <input type="text" className="form-control" id="employeeCUI"  />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="employeeGender">Fecha de lanzamiento</label>
                                            <input type="date" className="form-control" id="employeeGender" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="employeeHireDate">género</label>
                                            <input type="file" className="form-control" id="employeeHireDate" />
                                        </div>
                                       
                                    </>
                                )}

                              
                                <div className="form-group">
                                    <label htmlFor="employeePhone">stock</label>
                                    <input type="text" className="form-control" id="employeePhone"  />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="employeeEmail">Precio</label>
                                    <input type="email" className="form-control" id="employeeEmail"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="employeeAge">Descripción</label>
                                    <input type="" className="form-control" id="employeeAge" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={toggleModal}>
                                Cerrar
                            </button>
                            <button type="button" className="btn btn-primary">
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddLibrosModal;
