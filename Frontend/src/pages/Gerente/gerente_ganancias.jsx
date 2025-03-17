import { useState } from "react";
import Navbar from "./components/Navbar";
import { Bar, Line, Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./styles/gerente_supervisor.css";

// Datos de ejemplo
const ProfitData = [
  { product: "Producto A", category: "Categoría 1", profitMargin: 25, netProfit: 5000 },
  { product: "Producto B", category: "Categoría 2", profitMargin: 30, netProfit: 7000 },
  { product: "Producto C", category: "Categoría 1", profitMargin: 20, netProfit: 3000 },
  { product: "Producto D", category: "Categoría 3", profitMargin: 35, netProfit: 8000 },
  { product: "Producto E", category: "Categoría 2", profitMargin: 28, netProfit: 6000 },
];

// Datos para el gráfico de comparación de ganancias por período
const profitComparisonData = {
  labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
  datasets: [
    {
      label: "Ganancias",
      data: [12000, 15000, 18000, 14000, 16000],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

// Datos para el gráfico de ganancias netas por categoría
const netProfitByCategoryData = {
  labels: ["Categoría 1", "Categoría 2", "Categoría 3"],
  datasets: [
    {
      label: "Ganancias Netas",
      data: [8000, 13000, 8000],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};

function ProfitTable({ profits }) {
  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Producto</th>
          <th className="border p-2">Categoría</th>
          <th className="border p-2">Margen de Ganancia (%)</th>
          <th className="border p-2">Ganancia Neta (Q)</th>
        </tr>
      </thead>
      <tbody>
        {profits.map((profit, index) => (
          <tr key={index} className="text-center">
            <td className="border p-2">{profit.product}</td>
            <td className="border p-2">{profit.category}</td>
            <td className="border p-2">{profit.profitMargin}%</td>
            <td className="border p-2">Q {profit.netProfit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function GerenteGanancias() {
  const [profits, setProfits] = useState(ProfitData);

  return (
    <div className="p-6">
      <Navbar />
      <h2 className="text-xl font-bold my-4">Reporte de Ganancias</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Margen de ganancia por producto (Tabla) */}
        <div className="border p-4 rounded-lg shadow-md">
          <h3 className="text-center font-semibold mb-4">Margen de ganancia por producto</h3>
          <ProfitTable profits={profits} />
        </div>

        {/* Comparación de ganancias en distintos períodos (Gráfico de barras) */}
        <div className="border p-4 rounded-lg shadow-md">
          <h3 className="text-center font-semibold mb-4">Comparación de ganancias por período</h3>
          <Bar
            data={profitComparisonData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
              },
            }}
          />
        </div>

        {/* Ganancias netas por categoría (Gráfico de pastel) */}
        <div className="border p-4 rounded-lg shadow-md">
          <h3 className="text-center font-semibold mb-4">Ganancias netas por categoría</h3>
          <Pie
            data={netProfitByCategoryData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}