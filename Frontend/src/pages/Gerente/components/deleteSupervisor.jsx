import { useState } from "react";

const EliminarSupervisorModal = ({ isOpen, onClose, supervisor, onDelete }) => {
  const [reason, setReason] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason) {
      alert("Por favor, ingresa la razón del despido.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/supervisor/deleteSupervisor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_supervisor: supervisor.id_supervisor,
          reason_fired: reason,
        }),
      });

      if (response.ok) {
        alert("Supervisor eliminado correctamente.");
        onDelete(); // Actualizar la lista de supervisores
        onClose(); // Cerrar el modal
      } else {
        alert("Error al eliminar el supervisor.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error al eliminar el supervisor.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Eliminar Supervisor</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Razón del despido:
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border rounded"
              rows="3"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Eliminar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EliminarSupervisorModal;