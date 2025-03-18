import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import "./styles/gerente_ventas.css";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

export default function GerenteVentas() {
  const [topProductsData, setTopProductsData] = useState([]);
  const [salesByCategoryData, setSalesByCategoryData] = useState([]);
  const [salesComparisonData, setSalesComparisonData] = useState([]);

  // Colores para las gráficas
  const barColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];
  const pieColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];

  // Función para obtener los datos de los productos más vendidos
  const masVendidos = async () => {
    try {
      const res = await fetch("http://localhost:3000/reports/masVendidos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      // Agrupar los datos por tipo y sumar las cantidades vendidas
      const groupedData = data.reduce((acc, item) => {
        const tipo = item.tipo;
        const cantidad = parseInt(item.total_vendido); // Convertir a número
        if (!acc[tipo]) {
          acc[tipo] = 0; // Inicializar el acumulador para el tipo
        }
        acc[tipo] += cantidad; // Sumar la cantidad vendida
        return acc;
      }, {});

      // Transformar los datos agrupados en un formato compatible con el gráfico
      const transformedData = Object.keys(groupedData).map((tipo) => ({
        type: tipo,
        quantity: groupedData[tipo],
      }));

      setTopProductsData(transformedData);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  // Función para obtener los datos de ventas por categoría
  const ventasPorCategoria = async () => {
    try {
      const res = await fetch("http://localhost:3000/reports/ventasPorCategoria", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      // Transformar los datos para el gráfico de pastel
      const transformedData = data.map((item) => ({
        name: item.categoria,
        value: parseFloat(item.total_ingresos), // Convertir a número
      }));

      setSalesByCategoryData(transformedData);
    } catch (error) {
      console.error("Error al obtener los datos de ventas por categoría:", error);
    }
  };

  // Función para obtener los datos de ventas mensuales
  const ventasMensuales = async () => {
    try {
      const res = await fetch("http://localhost:3000/reports/ventasMensuales", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      // Transformar los datos para el gráfico de líneas
      const transformedData = data.map((item) => ({
        period: item.mes, // Usar el mes como período
        ventas: parseFloat(item.total_ventas), // Convertir a número
      }));

      setSalesComparisonData(transformedData);
    } catch (error) {
      console.error("Error al obtener los datos de ventas mensuales:", error);
    }
  };

  // Llamar a las funciones al cargar el componente
  useEffect(() => {
    masVendidos();
    ventasPorCategoria();
    ventasMensuales();
  }, []);

  return (
    <div className="p-6">
      <Navbar />
      <h2 className="text-xl font-bold my-4">Reporte de Ventas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Gráfico de productos más vendidos por tipo */}
        <div className="border p-4 rounded-lg shadow-md">
          <h3 className="text-center font-semibold mb-4">Productos más vendidos por tipo</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProductsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Legend />
              {topProductsData.map((entry, index) => (
                <Bar
                  key={`bar-${index}`}
                  dataKey="quantity"
                  fill={barColors[index % barColors.length]} // Asignar colores cíclicamente
                  name="Cantidad Vendida"
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de comparación de ventas por período */}
        <div className="border p-4 rounded-lg shadow-md">
          <h3 className="text-center font-semibold mb-4">Comparación de ventas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesComparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="ventas"
                stroke="#82ca9d" // Color de la línea
                name="Ventas"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de volumen de ventas por categoría */}
        <div className="border p-4 rounded-lg shadow-md">
          <h3 className="text-center font-semibold mb-4">Volumen de ventas por categoría</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={salesByCategoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8" // Color por defecto
                label
              >
                {salesByCategoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={pieColors[index % pieColors.length]} // Asignar colores cíclicamente
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}