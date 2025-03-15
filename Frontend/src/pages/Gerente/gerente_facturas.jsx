import { useState } from "react";
import Navbar from "./components/Navbar";
import "./styles/gerente_supervisor.css";

const Facturas = Array(10).fill({
  employee: "xxxxxxxx",
  date: "2024-03-01",
  name: "xxxxxxxx",
  total: "xxxx",
});

function FacturasTable({ facturas }) {
  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Empleado responsable</th>
          <th className="border p-2">Fecha Emisión</th>
          <th className="border p-2">Nombre del comprador</th>
          <th className="border p-2">Total de venta</th>
          <th className="border p-2">Descargar Factura</th>
        </tr>
      </thead>
      <tbody>
        {facturas.map((factura, index) => (
          <tr key={index} className="text-center">
            <td className="border p-2">{factura.employee}</td>
            <td className="border p-2">{factura.date}</td>
            <td className="border p-2">{factura.name}</td>
            <td className="border p-2">{factura.total}</td>
            <td className="border p-2 text-blue-500 cursor-pointer">Descargar factura</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SearchBar({ startDate, setStartDate, endDate, setEndDate, nameSearch, setNameSearch, onSearch }) {
  return (
    <div className="flex items-center gap-2 border p-2 rounded">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border p-1 rounded"
      />
      <span>-</span>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border p-1 rounded"
      />
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={nameSearch}
        onChange={(e) => setNameSearch(e.target.value)}
        className="border p-1 rounded"
      />
      <button className="ml-2 px-4 py-1 border rounded" onClick={onSearch}>Buscar</button>
    </div>
  );
}

export default function GerenteFacturas() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [filteredFacturas, setFilteredFacturas] = useState(Facturas);

  const handleSearch = () => {
    const filtered = Facturas.filter((factura) => {
      const dateMatch = (!startDate || factura.date >= startDate) && (!endDate || factura.date <= endDate);
      const nameMatch = !nameSearch || factura.name.toLowerCase().includes(nameSearch.toLowerCase());
      return dateMatch && nameMatch;
    });
    setFilteredFacturas(filtered);
  };

  return (
    <div className="p-6">
      <Navbar />
      <div className="flex justify-between items-center my-4">
        <SearchBar 
          startDate={startDate} 
          setStartDate={setStartDate} 
          endDate={endDate} 
          setEndDate={setEndDate} 
          nameSearch={nameSearch} 
          setNameSearch={setNameSearch} 
          onSearch={handleSearch} 
        />
      </div>
      <FacturasTable facturas={filteredFacturas} />
    </div>
  );
}
