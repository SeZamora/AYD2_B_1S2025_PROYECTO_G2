import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/login";
import SuperPrincipal from "../pages/Supervisor/Principal";
import Productos from "../pages/Supervisor/Productos";
import Libros from "../pages/Supervisor/Libros";
import GerenteSupervisor from "../pages/Gerente/gerente_supervisor";
import GerenteFacturas from "../pages/Gerente/gerente_facturas";
import GerenteGanancias from "../pages/Gerente/gerente_ganancias";
import GerenteVentas from "../pages/Gerente/gerente_ventas";
const AppRouter = () => {
    //const { logout, role } = useAuth();
  
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />  
          <Route path="/SuperPrincipal" element={<SuperPrincipal />} />    
          <Route path="/Productos" element={<Productos />} /> 
          <Route path="/Libros" element={<Libros />} /> 
          <Route path="/gerente_supervisor" element={<GerenteSupervisor />} />
          <Route path="/gerente_facturas" element={<GerenteFacturas />} />
          <Route path="/gerente_ganancias" element={<GerenteGanancias />} />
          <Route path="/gerente_ventas" element={<GerenteVentas />} />
        </Routes>
      </Router>
    );
  };
  
  export default AppRouter;
  