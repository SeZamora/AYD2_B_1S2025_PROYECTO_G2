import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/login";
import SupervisorView from "../pages/Supervisor/SupervisorView";
import EmpleadoView from "../pages/Empleado/EmpleadoView";
import GerenteView from "../pages/Gerente/GerenteView";
import UsuarioView from "../pages/Usuario/UsuarioView";
const AppRouter = () => {
    //const { logout, role } = useAuth();
  
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />    
          <Route path="/supervisor" element={<SupervisorView />} /> 
          <Route path="/empleado" element={<EmpleadoView />} />          
          <Route path="/gerente" element={<GerenteView />} />          
          <Route path="/usuario" element={<UsuarioView />} />          


        </Routes>
      </Router>
    );
  };
  
  export default AppRouter;
  