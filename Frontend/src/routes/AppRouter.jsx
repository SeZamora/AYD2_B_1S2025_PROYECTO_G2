import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/login";
import SuperPrincipal from "../pages/Supervisor/Principal";
import Productos from "../pages/Supervisor/Productos";
import Libros from "../pages/Supervisor/Libros";
const AppRouter = () => {
    //const { logout, role } = useAuth();
  
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />  
          <Route path="/SuperPrincipal" element={<SuperPrincipal />} />    
          <Route path="/Productos" element={<Productos />} /> 
          <Route path="/Libros" element={<Libros />} />   
        </Routes>
      </Router>
    );
  };
  
  export default AppRouter;
  