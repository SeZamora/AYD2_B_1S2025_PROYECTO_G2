import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Bar, Line, Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./styles/gerente_ganancias.css";

function ProfitTable({ profits }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-3 text-left">Producto</th>
          <th className="border p-3 text-left">Categoría</th>
          <th className="border p-3 text-left">Margen de Ganancia (%)</th>
          <th className="border p-3 text-left">Ganancia Neta (Q)</th>
        </tr>
      </thead>
      <tbody>
        {profits.map((profit, index) => (
          <tr key={index} className="hover:bg-gray-50 transition-colors">
            <td className="border p-3">{profit.nombre_producto}</td>
            <td className="border p-3">{profit.categoria}</td>
            <td className="border p-3">{profit.margen_ganancia}%</td>
            <td className="border p-3">Q {profit.ganancia_neta}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function GerenteGanancias() {
  const [profits, setProfits] = useState([]);
  const [netProfitByCategoryData, setNetProfitByCategoryData] = useState({
    labels: [],
    datasets: [
      {
        label: "Ganancias Netas",
        data: [],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  });
  const [profitComparisonData, setProfitComparisonData] = useState({
    labels: [],
    datasets: [
      {
        label: "Ganancias",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  // Función para obtener las ganancias netas por categoría
  const obtenerGananciasNetas = async () => {
    try {
      const res = await fetch("http://localhost:3000/reports/gananciaCategoria", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      // Transformar los datos para el gráfico de pastel
      const labels = data.map((item) => item.categoria);
      const ganancias = data.map((item) => parseFloat(item.ganancia_neta));

      setNetProfitByCategoryData({
        labels: labels,
        datasets: [
          {
            label: "Ganancias Netas",
            data: ganancias,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
          },
        ],
      });
    } catch (error) {
      console.error("Error al obtener las ganancias netas por categoría:", error);
    }
  };

  // Función para obtener las ganancias por período
  const obtenerGananciasPorPeriodo = async () => {
    try {
      const res = await fetch("http://localhost:3000/reports/gananciaPorPeriodo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      // Transformar los datos para el gráfico de barras
      const labels = data.map((item) => item.mes);
      const ganancias = data.map((item) => parseFloat(item.ganancia_neta));

      setProfitComparisonData({
        labels: labels,
        datasets: [
          {
            label: "Ganancias",
            data: ganancias,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error al obtener las ganancias por período:", error);
    }
  };

  // Función para obtener el margen de ganancia por producto
  const obtenerMargenGananciaProducto = async () => {
    try {
      const res = await fetch("http://localhost:3000/reports/gananciaProducto", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      // Transformar los datos para la tabla
      const transformedData = data.map((item) => ({
        nombre_producto: item.nombre_producto,
        categoria: item.categoria,
        ganancia_neta: parseFloat(item.ganancia_neta).toFixed(2), // Formatear a 2 decimales
        margen_ganancia: parseFloat(item.margen_ganancia).toFixed(2), // Formatear a 2 decimales
      }));

      setProfits(transformedData);
    } catch (error) {
      console.error("Error al obtener el margen de ganancia por producto:", error);
    }
  };

  // Llamar a las funciones al cargar el componente
  useEffect(() => {
    obtenerGananciasNetas();
    obtenerGananciasPorPeriodo();
    obtenerMargenGananciaProducto();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Navbar />
      <h2 className="text-2xl font-bold mb-8 text-center">Reporte de Ganancias</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Margen de ganancia por producto (Tabla) */}
        <div className="border p-6 rounded-lg shadow-lg bg-white md:col-span-2">
          <h3 className="text-xl font-semibold mb-6 text-center">
            Margen de ganancia por producto
          </h3>
          <div className="overflow-x-auto max-h-96">
            <ProfitTable profits={profits} />
          </div>
        </div>
  
        {/* Comparación de ganancias en distintos períodos (Gráfico de barras) */}
        <div className="border p-8 rounded-lg shadow-lg bg-white">
          <h3 className="text-xl font-semibold mb-6 text-center">
            Comparación de ganancias por período
          </h3>
          <div className="h-80">
            <Bar
              data={profitComparisonData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "top" },
                },
              }}
            />
          </div>
        </div>
  
        {/* Ganancias netas por categoría (Gráfico de pastel) */}
        <div className="border p-8 rounded-lg shadow-lg bg-white">
          <h3 className="text-xl font-semibold mb-6 text-center">
            Ganancias netas por categoría
          </h3>
          <div className="h-80">
            <Pie
              data={netProfitByCategoryData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "top" },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
  
}