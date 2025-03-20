import React from 'react';

const DeleteLibroModal = ({ showDeleteModal, toggleDeleteModal, estado ,Idato}) => {
    if (!showDeleteModal) return null; 


    console.log(estado);
    const mensajes = {
        libro: '¿Estás seguro de que deseas eliminar este libro?',
         producto: '¿Estás seguro de que deseas eliminar este producto?',
        default: '¿Estás seguro de que deseas eliminar este elemento?' 
    };

    
    const Eliminar = async () => {
        if (estado === 'Libro') {
        console.log(Idato);
        try {
            const response = await fetch("http://localhost:3000/book/deletebook", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id_libro: Idato })
            });
            if (response.ok) {
                alert("Libro eliminado con éxito");
                window.location.reload();
            } else {
                alert("Error al editar el producto");
            }
        } catch (error) {
            console.error("Error al enviar la solicitud", error);
        }
    }else if (estado === 'Producto') {
        console.log(Idato);
        
        try {
            const response = await fetch("http://localhost:3000/product/deleteProduct", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id_producto: Idato })
            });
            if (response.ok) {
                alert("Producto eliminado  con éxito");
                window.location.reload();
            } else {
                alert("Error al editar el producto");
            }
        } catch (error) {
            console.error("Error al enviar la solicitud", error);
        }
    }
    };
            
   



    const mensaje = mensajes[estado?.toLowerCase()] || mensajes.default;

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
                onClick={toggleDeleteModal} 
            />

   
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
