import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    // localStorage.removeItem("user");
    navigate("/"); // pagina de inicio
  };

  const navbarStyle = {
    background: "linear-gradient(to right, #268b8f, rgb(106, 95, 145))",
    position: "fixed",
    height: "70px",
    top: "0",
    left: "0",
    width: "100%",
    zIndex: "1000",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const linkStyle = {
    color: "#ffffff",
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 10px",
  };

  const buttonStyle = {
    background: "transparent",
    border: "none",
    color: "#ffffff",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <nav className="navbar">
      {/* Logo o nombre de la aplicación */}
      <a style={{ color: "#e59a34", fontSize: "1.5rem", fontWeight: "bold" }}>
        NebookVault
      </a>

      {/* Enlaces de navegación */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/gerente_supervisor" style={linkStyle}>
          <i className="fa fa-users fa-2x" aria-hidden="true"></i>
          <span>Supervisores</span>
        </Link>
        <Link to="/gerente_facturas" style={linkStyle}>
          <i className="fa fa-file-text fa-2x" aria-hidden="true"></i>
          <span>Facturas</span>
        </Link>
        <Link to="/gerente_ventas" style={linkStyle}>
          <i className="fa fa-shopping-cart fa-2x" aria-hidden="true"></i>
          <span>Ventas</span>
        </Link>
        <Link to="/gerente_ganancias" style={linkStyle}>
          <i className="fa fa-line-chart fa-2x" aria-hidden="true"></i>
          <span>Ganancias</span>
        </Link>
      </div>

      {/* Botón de cerrar sesión */}
      <button style={buttonStyle} onClick={handleLogout}>
        <i className="fa fa-sign-out fa-2x" aria-hidden="true"></i>
        <span>Cerrar sesión</span>
      </button>
    </nav>
  );
}