import "../styles/verSupervisorModal.css";

const SupervisorModal = ({ isOpen, supervisor, onClose }) => {
  if (!isOpen || !supervisor) return null; 
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{supervisor.nombre}</h2>
        <p><strong>Cargo:</strong> {supervisor.cargo}</p>
        <p><strong>Teléfono:</strong> {supervisor.telefono}</p>
        <p><strong>Email:</strong> <a href={`mailto:${supervisor.email}`}>{supervisor.email}</a></p>
        <button className="close-button" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default SupervisorModal;
