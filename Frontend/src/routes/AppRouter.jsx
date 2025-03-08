import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/login";
import SuperPrincipal from "../pages/Supervisor/Principal";
const AppRouter = () => {
    //const { logout, role } = useAuth();
  
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />  
          <Route path="/SuperPrincipal" element={<SuperPrincipal />} />        
        </Routes>
      </Router>
    );
  };
  
  export default AppRouter;
  