import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import Login from "../pages/login";
import Registro from "../pages/Registro";
import Contraseña from "../pages/Contraseña";
import SuperPrincipal from "../pages/Supervisor/Principal";
import Productos from "../pages/Supervisor/Productos";
import Libros from "../pages/Supervisor/Libros";
import GerenteSupervisor from "../pages/Gerente/gerente_supervisor";
import GerenteFacturas from "../pages/Gerente/gerente_facturas";
import GerenteGanancias from "../pages/Gerente/gerente_ganancias";
import GerenteVentas from "../pages/Gerente/gerente_ventas";

import AlertasStock from "../pages/Gerente/alertaStock";
import SupervisorView from "../pages/Supervisor/SupervisorView";
import EmpleadoHome from "../pages/Empleado/EmpleadoHome";
import GerenteView from "../pages/Gerente/GerenteView";
import UsuarioView from "../pages/Usuario/UsuarioView";
import UsuarioLibros from "../pages/Usuario/UsuarioLibros";
import TestUpload from "../pages/TestUpload/TestUpload";
import Opinion from "../pages/Supervisor/Opiniones";
import VerProducto from "../pages/Empleado/components/VerProducto";
import VerFacturas from "../pages/Empleado/VerFacturas";
import BuscarFactura from "../pages/Empleado/BuscarFactura";
import VerFacturasSupervisor  from "../pages/Supervisor/Facturas";
import LibroDetalle from "../pages/Empleado/components/VerLibros";
import AlertasStockSupervisor  from "../pages/Supervisor/AlertasStock";
import ProductosMasVotados from "../pages/Usuario/ProductosMasVotados";
import ListaDeseos from "../pages/Usuario/ListaDeseos";
import AgregarLibrosDeseos from "../pages/Usuario/AgregarLibrosDeseos";


const AppRouter = () => {
  const { role } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Registro" element={<Registro />} />
      <Route path="/Contraseña" element={<Contraseña />} />
      <Route path="/testUpload" element={ <TestUpload />} />

      <Route path="/SuperPrincipal" element={role === "supervisores" ? <SuperPrincipal /> : <Navigate to="/" />} />
      <Route path="/Productos" element={role === "supervisores" ? <Productos /> : <Navigate to="/" />} />
      <Route path="/Libros" element={role === "supervisores" ? <Libros /> : <Navigate to="/" />} />
      <Route path="/Opinion" element={role === "supervisores" ? <Opinion /> : <Navigate to="/" />} />
      <Route path="/fact" element={role === "supervisores" ? <VerFacturasSupervisor /> : <Navigate to="/" />} />
      <Route path="/Alertas" element={role === "supervisores" ? <AlertasStockSupervisor /> : <Navigate to="/" />} />

      <Route path="/gerente_supervisor" element={<GerenteSupervisor /> } />
      <Route path="/gerente_facturas" element={<GerenteFacturas /> } />
      <Route path="/gerente_ganancias" element={ <GerenteGanancias />} />
      <Route path="/gerente_ventas" element={<GerenteVentas /> } />
      <Route path="/alertas_stock" element={ <AlertasStock />} />

      <Route path="/empleado" element={role == "empleados" ? <EmpleadoHome /> : <Navigate to="/"/>} />
      <Route path="/gerente" element={<GerenteView /> } />
      <Route path="/usuario" element={ <UsuarioView />} />
      <Route path="/UsuarioLibros" element={ <UsuarioLibros />} />

      <Route path="/producto/:id" element={role == "empleados" ? <VerProducto /> : <Navigate to="/"/>} />
      <Route path="/facturas" element={role == "empleados" ? <VerFacturas /> : <Navigate to="/"/>} />
      <Route path="/buscarFactura" element={role == "empleados" ? <BuscarFactura /> : <Navigate to="/"/>} />
      <Route path="/libro/:id" element={role == "empleados" ? <LibroDetalle /> : <Navigate to="/"/>} />
    
      <Route path="/masVotados" element={ <ProductosMasVotados />} />
      <Route path="/listaDeseos" element={ <ListaDeseos />} />
      <Route path="/agregarLibrosDeseos" element={ <AgregarLibrosDeseos />} />
    </Routes>
  );
};

export default AppRouter;
