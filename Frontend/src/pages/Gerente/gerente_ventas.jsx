import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import "./styles/gerente_ventas.css";
import { Bar, Line, Pie } from "recharts";

const SalesData = Array(10).fill({
  product: "xxxxxxxx",
  category: "xxxxxxxx",
  quantity: "xx",
  revenue: "xxxx",
});

function SalesTable({ sales }) {
  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Producto</th>
          <th className="border p-2">Categoría</th>
          <th className="border p-2">Cantidad Vendida</th>
          <th className="border p-2">Ingresos</th>
        </tr>
      </thead>
      <tbody>
        {sales.map((sale, index) => (
          <tr key={index} className="text-center">
            <td className="border p-2">{sale.product}</td>
            <td className="border p-2">{sale.category}</td>
            <td className="border p-2">{sale.quantity}</td>
            <td className="border p-2">{sale.revenue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function GerenteVentas() {
  const [sales, setSales] = useState(SalesData);
  
  return (
    <div className="p-6">
      <Navbar />
      <h2 className="text-xl font-bold my-4">Reporte de Ventas</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="border p-4">
          <h3 className="text-center">Productos más vendidos</h3>
          <Line data={[]} />
          <SalesTable sales={sales} />
        </div>
        <div className="border p-4">
          <h3 className="text-center">Comparación de ventas</h3>
          <Bar data={[]} />
          <SalesTable sales={sales} />
        </div>
        <div className="border p-4">
          <h3 className="text-center">Volumen de ventas por categoría</h3>
          <Pie data={[]} />
          <SalesTable sales={sales} />
        </div>
      </div>
    </div>
  );
}
