import { useState} from "react";
import "../styles/editSupervisor.css";

const EditSupervisorModal = ({ isOpen, onClose, supervisor, onUpdate }) => {
    const [newEmail, setNewEmail] = useState(supervisor?.email || "");
    const [phoneNumber, setPhoneNumber] = useState(supervisor?.telefono || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleUpdate = async () => {
        setLoading(true);
        setError("");

        const payload = {
            old_email: supervisor.email,
            new_email: newEmail,
            phone_number: phoneNumber,
        };

        try {
            const response = await fetch("http://localhost:3000/supervisor/editSupervisor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                onUpdate();
                onClose();
            } else {
                setError(data.message || "Error al actualizar supervisor");
            }
        } catch (error) {
            console.error("Error al actualizar:", error);
            setError("Error en la conexión con el servidor");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-header">Editar Supervisor</h2>

                {error && <p className="error-message">{error}</p>}

                <div className="modal-body">
                    <label className="modal-label">Nuevo Correo:</label>
                    <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="modal-input"
                    />

                    <label className="modal-label">Número de Teléfono:</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="modal-input"
                    />
                </div>

                <div className="modal-footer">
                    <button
                        onClick={onClose}
                        className="modal-button cancel"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleUpdate}
                        disabled={loading}
                        className="modal-button update"
                    >
                        {loading ? "Guardando..." : "Actualizar"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditSupervisorModal;