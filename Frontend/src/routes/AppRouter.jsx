import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import Login from "../pages/login";
import SuperPrincipal from "../pages/Supervisor/Principal";
import Productos from "../pages/Supervisor/Productos";
import Libros from "../pages/Supervisor/Libros";
import GerenteSupervisor from "../pages/Gerente/gerente_supervisor";
import GerenteFacturas from "../pages/Gerente/gerente_facturas";
import GerenteGanancias from "../pages/Gerente/gerente_ganancias";
import GerenteVentas from "../pages/Gerente/gerente_ventas";
import SupervisorView from "../pages/Supervisor/SupervisorView";
import EmpleadoHome from "../pages/Empleado/EmpleadoHome";
import GerenteView from "../pages/Gerente/GerenteView";
import UsuarioView from "../pages/Usuario/UsuarioView";
import TestUpload from "../pages/TestUpload/TestUpload";
import Opinion from "../pages/Supervisor/Opiniones";
import VerProducto from "../pages/Empleado/VerProducto";
import VerFacturas from "../pages/Empleado/VerFacturas";
import BuscarFactura from "../pages/Empleado/BuscarFactura";

const AppRouter = () => {
  const { role } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/testUpload" element={ <TestUpload />} />

      <Route path="/SuperPrincipal" element={role === "supervisores" ? <SuperPrincipal /> : <Navigate to="/" />} />
      <Route path="/Productos" element={role === "supervisores" ? <Productos /> : <Navigate to="/" />} />
      <Route path="/Libros" element={role === "supervisores" ? <Libros /> : <Navigate to="/" />} />
      <Route path="/Opinion" element={role === "supervisores" ? <Opinion /> : <Navigate to="/" />} />

      <Route path="/gerente_supervisor" element={<GerenteSupervisor /> } />
      <Route path="/gerente_facturas" element={<GerenteFacturas /> } />
      <Route path="/gerente_ganancias" element={ <GerenteGanancias />} />
      <Route path="/gerente_ventas" element={<GerenteVentas /> } />

      <Route path="/empleado" element={role == "empleados" ? <EmpleadoHome /> : <Navigate to="/"/>} />
      <Route path="/gerente" element={<GerenteView /> } />
      <Route path="/usuario" element={ <UsuarioView />} />

      <Route path="/producto/:id" element={role == "empleados" ? <VerProducto /> : <Navigate to="/"/>} />
      <Route path="/facturas" element={role == "empleados" ? <VerFacturas /> : <Navigate to="/"/>} />
      <Route path="/buscarFactura" element={role == "empleados" ? <BuscarFactura /> : <Navigate to="/"/>} />
    </Routes>
  );
};

export default AppRouter;
