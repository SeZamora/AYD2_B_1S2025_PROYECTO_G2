import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/agregarSupervisor.css";

const ModalAgregarSupervisor = ({ isOpen, onClose }) => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  if (!isOpen) return null;

  // Configuración de notificaciones
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const AddSupervisor = async () => {
    const supervisor = {
      gerente_id_gerente: 1, // quemado
      nombre,
      email: correo,
      telefono,
      fecha_ingreso: fechaIngreso,
      contrasenia,
    };

    try {
      const response = await fetch("http://localhost:3000/supervisor/addSupervisor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(supervisor),
      });

      if (response.ok) {
        notifySuccess("Supervisor agregado correctamente");
        onClose();
      } else {
        notifyError("Error al agregar supervisor");
      }
    } catch (error) {
      notifyError("Error de red al agregar supervisor");
    }
  };

  return (
    <>
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
              <input type="text" placeholder="Nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </label>
            <label>
              Correo
              <input type="email" placeholder="Correo electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)} />
            </label>
            <label>
              Teléfono
              <input type="tel" placeholder="Teléfono de contacto" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            </label>
            <label>
              Contraseña
              <input type="password" placeholder="Contraseña" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} />
            </label>
            <label className="date-container">
              Fecha de ingreso
              <input type="date" value={fechaIngreso} onChange={(e) => setFechaIngreso(e.target.value)} />
              <FaCalendarAlt className="calendar-icon" />
            </label>
          </div>
          <div className="modal-footer">
            <button className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button className="ok-button" onClick={AddSupervisor}>
              OK
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalAgregarSupervisor;
