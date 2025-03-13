import React from 'react';

const DeleteLibroModal = ({ showDeleteModal, toggleDeleteModal, estado }) => {
    if (!showDeleteModal) return null; // Evita renderizar el modal si no está activo

    
    console.log(estado);
    const mensajes = {
        libro: '¿Estás seguro de que deseas eliminar este libro?',
         producto: '¿Estás seguro de que deseas eliminar este producto?',
        default: '¿Estás seguro de que deseas eliminar este elemento?' // Mensaje por defecto
    };

    // Obtener el mensaje según el estado (en minúsculas para evitar problemas con mayúsculas)
    const mensaje = mensajes[estado?.toLowerCase()] || mensajes.default;

    return (
        <>
            {/* Fondo gris semi-transparente */}
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

            {/* Modal */}
            <div
                className="modal show"
                tabIndex="-1"
                role="dialog"
                style={{
                    display: 'block',
                    maxHeight: '40%',
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
                            Eliminar {estado ? estado.charAt(0).toUpperCase() + estado.slice(1) : 'Elemento'}
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
                        <p>{mensaje}</p>
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
