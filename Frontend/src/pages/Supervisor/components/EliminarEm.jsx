import React, { useState } from 'react';

const DeleteLibroModal = ({ showDeleteModal, toggleDeleteModal, Idato }) => {
    const [razon, setRazon] = useState(''); // Estado para capturar la razón

    if (!showDeleteModal) return null; // Evita renderizar el modal si no está activo

    const handleRazonChange = (e) => {
        setRazon(e.target.value); // Actualiza la razón cuando se escribe en el campo de texto
    };

    const Eliminar = async () => {
        console.log(Idato, razon); // Muestra el ID y la razón en la consola para depuración
        try {
            const response = await fetch("http://localhost:3000/employee/deleteEmployee", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    empleados_id: Idato,
                    reason_fired: razon // Enviar la razón junto con el ID
                })
            });
            if (response.ok) {
                alert("Empleado eliminado con éxito");
                window.location.reload();
            } else {
                alert("Error al eliminar el empleado");
            }
        } catch (error) {
            console.error("Error al enviar la solicitud", error);
        }
    };

    return (
        <>
            <div
                className="modal-backdrop show"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1040
                }}
                onClick={toggleDeleteModal} // Cierra el modal si se hace clic fuera de él
            />

            <div
                className="modal show"
                tabIndex="-1"
                role="dialog"
                style={{
                    display: 'block',
                    maxHeight: '50%',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                    width: '400px',
                    padding: '20px',
                    zIndex: 1050
                }}
                aria-labelledby="deleteLibroModalLabel"
                aria-hidden={!showDeleteModal}
            >
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h5 id="deleteLibroModalLabel">
                            <strong>Eliminar empleado</strong>
                        </h5>
                        <button
                            type="button"
                            style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '20px',
                                cursor: 'pointer'
                            }}
                            onClick={toggleDeleteModal}
                        >
                            &times;
                        </button>
                    </div>
                    <div style={{ padding: '15px 0', fontSize: '16px' }}>
                        <p>¿Está seguro de que desea eliminar el empleado?</p>
                        <div className="form-group">
                            <label htmlFor="employeeHireDate">Razón de la eliminación</label>
                            <input
                                type="text"
                                className="form-control"
                                id="employeeHireDate"
                                value={razon}
                                onChange={handleRazonChange} // Captura el cambio en el campo de texto
                            />
                        </div>
                        <p style={{ color: "orange", fontSize: "14px" }}>
                            <small>Esta acción no se puede deshacer.</small>
                        </p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <button
                            style={{
                                background: "#6c757d",
                                color: "white",
                                border: "none",
                                padding: "8px 12px",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
                            onClick={toggleDeleteModal}
                        >
                            Cancelar
                        </button>
                        <button
                            style={{
                                background: "#dc3545",
                                color: "white",
                                border: "none",
                                padding: "8px 12px",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
                            onClick={Eliminar}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeleteLibroModal;
