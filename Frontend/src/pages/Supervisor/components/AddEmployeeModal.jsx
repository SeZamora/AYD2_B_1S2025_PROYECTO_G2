import React, { useEffect, useState } from 'react';

const AddEmployeeModal = ({ showModal, toggleModal, role }) => {
    const [formData, setFormData] = useState({
        Nombre: '',
        Apellido: '',
        CUI: '',
        Teléfono: '',
        Correoelectrónico: '',
        Edad: '',
        Género: '',
        Fechadecontratación: '',
        Fotografía: ''
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
                                            <label htmlFor="employeeName">Nombre</label>
                                            <input type="text" className="form-control" id="employeeName" placeholder="Nombre del empleado" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="employeeLastName">Apellido</label>
                                            <input type="text" className="form-control" id="employeeLastName" placeholder="Apellido del empleado" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="employeeCUI">CUI</label>
                                            <input type="text" className="form-control" id="employeeCUI" placeholder="Número de CUI" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="employeeGender">Género</label>
                                            <input type="text" className="form-control" id="employeeGender" placeholder="Género" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="employeeHireDate">Fecha de contratación</label>
                                            <input type="date" className="form-control" id="employeeHireDate" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="employeePhoto">Fotografía</label>
                                            <input type="file" className="form-control" id="employeePhoto" />
                                        </div>
                                    </>
                                )}

                              
                                <div className="form-group">
                                    <label htmlFor="employeePhone">Teléfono</label>
                                    <input type="text" className="form-control" id="employeePhone" placeholder="Número de teléfono" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="employeeEmail">Correo electrónico</label>
                                    <input type="email" className="form-control" id="employeeEmail" placeholder="Correo electrónico" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="employeeAge">Edad</label>
                                    <input type="number" className="form-control" id="employeeAge" placeholder="Edad" />
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

export default AddEmployeeModal;
