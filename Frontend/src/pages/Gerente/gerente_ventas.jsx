import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import "./styles/gerente_ventas.css";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Datos de ejemplo para los gráficos
const SalesData = [
  { product: "Producto A", category: "Categoría 1", quantity: 150, revenue: 5000 },
  { product: "Producto B", category: "Categoría 2", quantity: 200, revenue: 7000 },
  { product: "Producto C", category: "Categoría 1", quantity: 100, revenue: 3000 },
  { product: "Producto D", category: "Categoría 3", quantity: 250, revenue: 8000 },
  { product: "Producto E", category: "Categoría 2", quantity: 180, revenue: 6000 },
];

// Datos para el gráfico de productos más vendidos
const topProductsData = SalesData.sort((a, b) => b.quantity - a.quantity).slice(0, 5);

// Datos para el gráfico de comparación de ventas por período
const salesComparisonData = [
  { period: "Enero", ventas: 12000 },
  { period: "Febrero", ventas: 15000 },
  { period: "Marzo", ventas: 18000 },
  { period: "Abril", ventas: 14000 },
  { period: "Mayo", ventas: 16000 },
];

// Datos para el gráfico de volumen de ventas por categoría
const salesByCategoryData = [
  { name: "Categoría 1", value: 8000 },
  { name: "Categoría 2", value: 13000 },
  { name: "Categoría 3", value: 8000 },
];

export default function GerenteVentas() {
  const [sales, setSales] = useState(SalesData);

  return (
    <div className="p-6">
      <Navbar />
      <h2 className="text-xl font-bold my-4">Reporte de Ventas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Gráfico de productos más vendidos */}
        <div className="border p-4 rounded-lg shadow-md">
          <h3 className="text-center font-semibold mb-4">Productos más vendidos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProductsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#8884d8" name="Cantidad Vendida" />
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
              <Line type="monotone" dataKey="ventas" stroke="#82ca9d" name="Ventas" />
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
                fill="#8884d8"
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}