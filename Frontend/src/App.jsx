
import AppRouter from "./routes/AppRouter";
import   { AuthProvider }  from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';



function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
      
  );

}

export default App;
