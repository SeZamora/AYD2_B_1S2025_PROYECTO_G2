import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import "./agregarSupervisor.css";

const ModalAgregarSupervisor = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Agregar Supervisor</h2>
          <button className="close-button" onClick={onClose}>
            ✖
          </button>
        </div>
        <div className="modal-body">
          <label>
            Nombre
            <input type="text" placeholder="Nombre completo" />
          </label>
          <label>
            Correo
            <input type="email" placeholder="Correo electrónico" />
          </label>
          <label>
            Teléfono
            <input type="tel" placeholder="Teléfono de contacto" />
          </label>
          <label className="date-container">
            Fecha de ingreso
            <input type="date" />
            <FaCalendarAlt className="calendar-icon" />
          </label>
        </div>
        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="ok-button">OK</button>
        </div>
      </div>
    </div>
  );
};

export default ModalAgregarSupervisor;
