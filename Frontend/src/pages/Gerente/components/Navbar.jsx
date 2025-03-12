import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    const navigate = useNavigate(); // Hook para la navegación

    const handleLogout = () => {
        // limpiar localstorage
        //localStorage.removeItem("token");
        //localStorage.removeItem("user");
        navigate("/"); // Redirige a la página de inicio
    };

    return (
      <nav className="flex justify-between items-center p-4 border-b">
        <div className="flex gap-4">
          <Link to="/gerente_supervisor" className="font-bold text-blue-500">Supervisores</Link>
          <Link to="/gerente_facturas">Facturas</Link>
          <Link to="/gerente_ventas">Ventas</Link>
          <Link to="/gerente_ganancias">Ganancias</Link>
        </div>
        <button className="border p-2 rounded" onClick={handleLogout}>Cerrar sesión</button>
      </nav>
    );
}
