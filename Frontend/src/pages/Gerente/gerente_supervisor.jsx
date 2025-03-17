import { useState, useEffect } from "react";
import "./styles/gerente_supervisor.css";
import Navbar from "./components/Navbar";
import AgregarSupervisorModal from "./components/agregarSupervisor";
import EditSupervisorModal from "./components/editSupervisor";
import SupervisorModal from "./components/verSupervisorModal";

const GerenteSupervisor = () => {
  const [supervisors, setSupervisors] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);

  const getAllSupervisors = async () => {
    try {
      const response = await fetch("http://localhost:3000/supervisor/getAllSupervisor", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Supervisores recibidos:", data);
        setSupervisors(Array.isArray(data.data) ? data.data : []);
      } else {
        setSupervisors([]);
      }
    } catch (error) {
      console.error("Error al obtener supervisores:", error);
      setSupervisors([]);
    }
  };

  useEffect(() => {
    getAllSupervisors();
  }, []);

  return (
    <div>
      <div className="p-6">
        <Navbar />
        <div className="flex justify-between items-center my-4">
          <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 p-2 border rounded">
            ➕ Agregar supervisor
          </button>
        </div>
        <SupervisorTable
          supervisors={supervisors}
          onEdit={(sup) => {
            setSelectedSupervisor(sup);
            setEditModalOpen(true);
          }}
          onView={(sup) => {
            setSelectedSupervisor(sup);
            setViewModalOpen(true);
          }}
        />
      </div>

      <AgregarSupervisorModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <EditSupervisorModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        supervisor={selectedSupervisor}
        onUpdate={getAllSupervisors}
      />
      <SupervisorModal
        isOpen={viewModalOpen}
        supervisor={selectedSupervisor}
        onClose={() => setViewModalOpen(false)}
      />
    </div>
  );
};

function SupervisorTable({ supervisors, onEdit, onView }) {
  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Nombre completo</th>
          <th className="border p-2">Teléfono</th>
          <th className="border p-2">Correo</th>
          <th className="border p-2">Fecha de ingreso</th>
          <th className="border p-2">Ver</th>
          <th className="border p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {supervisors.map((data, index) => (
          <tr key={index} className="text-center">
            <td className="border p-2">{data.nombre}</td>
            <td className="border p-2">{data.telefono}</td>
            <td className="border p-2">{data.email}</td>
            <td className="border p-2">{data.fecha_ingreso.split("T")[0]}</td>
            <td
              className="border p-2 text-blue-500 cursor-pointer"
              onClick={() => onView(data)}
            >
              Ver supervisor
            </td>
            <td className="border p-2">
              <button
                className="text-blue-500 mx-2"
                onClick={() => onEdit(data)}
              >
                Modificar
              </button>
              <button className="text-red-500">Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default GerenteSupervisor;
