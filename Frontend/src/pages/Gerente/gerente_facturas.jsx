import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./styles/gerente_supervisor.css";
import VerFactura from "./components/verFactura";

const GerenteFacturas = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [bills, setBills] = useState([]); // Todas las facturas obtenidas del backend
  const [filteredBills, setFilteredBills] = useState([]); // Facturas filtradas
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFactura, setSelectedFactura] = useState(null); // Factura seleccionada para ver
  const itemsPerPage = 10;

  // Obtener todas las facturas al cargar el componente
  const getAllBills = async () => {
    try {
      const response = await fetch(`http://localhost:3000/bill/bills`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Facturas obtenidas:", data);
        setBills(Array.isArray(data.data) ? data.data : []);
        setFilteredBills(Array.isArray(data.data) ? data.data : []); // Inicialmente, mostrar todas las facturas
      } else {
        setBills([]);
        setFilteredBills([]);
      }
    } catch (error) {
      console.error("Error al obtener facturas:", error);
      setBills([]);
      setFilteredBills([]);
    }
  };

  useEffect(() => {
    getAllBills();
  }, []);

  // Función para aplicar los filtros
  const applyFilters = () => {
    let filtered = bills;

    // Filtrar por fecha de inicio
    if (startDate) {
      filtered = filtered.filter((factura) => factura.fecha_hora >= startDate);
    }

    // Filtrar por fecha de fin
    if (endDate) {
      filtered = filtered.filter((factura) => factura.fecha_hora <= endDate);
    }

    // Filtrar por nombre del cliente
    if (nameSearch) {
      filtered = filtered.filter((factura) =>
        factura.nombre_comprador.toLowerCase().includes(nameSearch.toLowerCase())
      );
    }

    // Filtrar por nombre del empleado
    if (employeeSearch) {
      filtered = filtered.filter((factura) =>
        factura.nombre_vendedor.toLowerCase().includes(employeeSearch.toLowerCase())
      );
    }

    setFilteredBills(filtered);
    setCurrentPage(1); // Reiniciar la paginación al aplicar nuevos filtros
  };

  // Lógica de paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBills = filteredBills.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          employeeSearch={employeeSearch}
          setEmployeeSearch={setEmployeeSearch}
          onSearch={applyFilters} // Usar applyFilters en lugar de getFilteredBills
        />
      </div>
      <FacturasTable facturas={currentBills} onViewFactura={setSelectedFactura} />
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredBills.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      {/* Modal para ver la factura */}
      {selectedFactura && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-4xl w-full">
            <VerFactura facturaEncontrada={selectedFactura} />
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setSelectedFactura(null)} // Cerrar el modal
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

function SearchBar({ startDate, setStartDate, endDate, setEndDate, nameSearch, setNameSearch, employeeSearch, setEmployeeSearch, onSearch }) {
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
        placeholder="Buscar por cliente"
        value={nameSearch}
        onChange={(e) => setNameSearch(e.target.value)}
        className="border p-1 rounded"
      />
      <input
        type="text"
        placeholder="Buscar por empleado"
        value={employeeSearch}
        onChange={(e) => setEmployeeSearch(e.target.value)}
        className="border p-1 rounded"
      />
      <button className="ml-2 px-4 py-1 border rounded" onClick={onSearch}>
        Buscar
      </button>
    </div>
  );
}

function FacturasTable({ facturas, onViewFactura }) {
  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Empleado responsable</th>
          <th className="border p-2">Fecha Emisión</th>
          <th className="border p-2">Nombre del comprador</th>
          <th className="border p-2">Total de venta</th>
          <th className="border p-2">Ver Factura</th>
        </tr>
      </thead>
      <tbody>
        {facturas.map((factura, index) => (
          <tr key={index} className="text-center">
            <td className="border p-2">{factura.nombre_vendedor}</td>
            <td className="border p-2">{factura.fecha_hora.split("T")[0]}</td>
            <td className="border p-2">{factura.nombre_comprador}</td>
            <td className="border p-2">{factura.total_venta}</td>
            <td className="border p-2">
              <button
                className="text-blue-500 cursor-pointer"
                onClick={() => onViewFactura(factura)} // Mostrar la factura seleccionada
              >
                Ver factura
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Pagination({ itemsPerPage, totalItems, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex justify-center mt-4">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`mx-1 px-3 py-1 border rounded ${currentPage === number ? "bg-blue-500 text-white" : "bg-white"
              }`}
          >
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default GerenteFacturas;