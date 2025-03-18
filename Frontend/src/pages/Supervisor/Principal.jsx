import React from "react";

import Navbar from "../../ui/componets/NabSupervisor";
import "./../../styles/SPrincipal.css";
import EmployeeTable from './components/EmployeeTable'; // Importamos el nuevo componente

const SuperPrincipal = () => {
  return (
    <div>
      <Navbar />
      <div className="container-fluid"
        style={{
          marginTop: "65px",
          position: 'absolute',
          top: '0%',
          height: '90%'
        }}>

        
        <EmployeeTable />
      </div>
      

    </div>
  );
};


export default SuperPrincipal;
