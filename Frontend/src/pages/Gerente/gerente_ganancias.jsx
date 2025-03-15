import { useState } from "react";
import Navbar from "./components/Navbar";
import { Bar, Line } from 'react-chartjs-2';
import "chart.js/auto";
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
        </tr>
      </thead>
      <tbody>
        {facturas.map((factura, index) => (
          <tr key={index} className="text-center">
            <td className="border p-2">{factura.employee}</td>
            <td className="border p-2">{factura.date}</td>
            <td className="border p-2">{factura.name}</td>
            <td className="border p-2">{factura.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function GerenteGanancias() {
  const barData = {
    labels: ["Periodo 1", "Periodo 2", "Periodo 3"],
    datasets: [
      {
        label: "Ganancias",
        data: [10, 20, 30],
        backgroundColor: "gray",
      },
    ],
  };

  const lineData = {
    labels: ["Categoría 1", "Categoría 2", "Categoría 3"],
    datasets: [
      {
        label: "Ganancias Netas",
        data: [15, 25, 35],
        borderColor: "gray",
        fill: false,
      },
    ],
  };

  return (
    <div className="p-6">
      <Navbar />
      <div className="grid grid-cols-2 gap-6 my-4">
        <div>
          <h2 className="text-lg font-bold">Margen de ganancia por producto</h2>
          <FacturasTable facturas={Facturas} />
        </div>
        <div>
          <h2 className="text-lg font-bold">Ganancias netas por categoría de productos</h2>
          <Line data={lineData} />
        </div>
        <div>
          <h2 className="text-lg font-bold">Comparación de ganancias en distintos períodos</h2>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}
