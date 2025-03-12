import { useState } from "react";
import "./gerente_supervisor.css";
import Navbar from "../components/Navbar";
import AgregarSupervisorModal from "../components/agregarSupervisor";

const supervisors = Array(10).fill({
  name: "xxxxxxxxxxxxxx",
  phone: "xxxxxxxx",
  email: "xxxxxxxxxx",
  date: "2024-03-01",
});

function SupervisorTable({ supervisors }) {
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
        {supervisors.map((sup, index) => (
          <tr key={index} className="text-center">
            <td className="border p-2">{sup.name}</td>
            <td className="border p-2">{sup.phone}</td>
            <td className="border p-2">{sup.email}</td>
            <td className="border p-2">{sup.date}</td>
            <td className="border p-2 text-blue-500 cursor-pointer">ver supervisor</td>
            <td className="border p-2">
              <button className="text-blue-500 mx-2">Modificar</button>
              <button className="text-red-500">Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SearchBar({ search, setSearch }) {
  return (
    <div className="flex items-center border p-2 rounded w-1/3">
      <input
        type="text"
        placeholder="Buscar supervisores"
        className="w-full focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="ml-2 px-4 py-1 border rounded">Buscar</button>
    </div>
  );
}

export default function GerenteSupervisor() {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div>
      <div className="p-6">
        <Navbar />
        <div className="flex justify-between items-center my-4">
          <SearchBar search={search} setSearch={setSearch} />
          <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 p-2 border rounded">
            ➕ Agregar supervisor
          </button>
        </div>
        <SupervisorTable supervisors={supervisors} />
      </div>
      <AgregarSupervisorModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>

  );
}
