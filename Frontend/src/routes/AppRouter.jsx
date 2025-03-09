import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/login";
const AppRouter = () => {
    //const { logout, role } = useAuth();
  
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />          
        </Routes>
      </Router>
    );
  };
  
  export default AppRouter;
  