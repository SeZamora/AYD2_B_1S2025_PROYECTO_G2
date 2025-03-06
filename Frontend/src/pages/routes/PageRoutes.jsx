import { Route, Routes } from 'react-router-dom';
import Navbar from '../../ui/components/Navbar';


import { RecetasPage, HomePage, AppointmentsRecordPage, RegisterPacient, EditarPaciente, BuscarExpediente } from '../paciente';

const navigationPatient = [
  { name: 'Principal', href: '/home-page', current: false },
  { name: 'Crear Paciente', href: '/register-pacient', current: false },  
  { name: 'Generar receta', href: '/RecetasPage', current: false },
  { name: 'Ver citas', href: '/appointment-list', current: false },
  { name: 'Buscar Expediente', href: '/buscar-expediente', current: false },
];

 //<Route path="/buscar-expediente" element={<BuscarExpediente />} />
const PageRoutesComponent = () => {
  return (
    <>
      <Navbar navigation={navigationPatient} editRoute={'profile-patient'} />
      <Routes>
        <Route path="home-page" element={<HomePage />} />
        <Route path="appointment-list" element={<AppointmentsRecordPage />} />
        <Route path="RecetasPage" element={<RecetasPage />} />
        <Route path="register-pacient" element={<RegisterPacient />} />
        <Route path="editar-paciente/:pacienteId" element={<EditarPaciente/>} />
        <Route path="buscar-expediente" element={<BuscarExpediente />} />
       
       
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};

export const PageRoutes = PageRoutesComponent;
