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

        <div class="d-flex justify-content-center" style={{ height: "20%" }}>
          <div class="search">
            <input type="text" class="search-input" name="" />
            <a href="#" class="search-icon">
              <i class="fa fa-search"></i>
            </a>
          </div>
        </div>
        <EmployeeTable />
      </div>
      {/* 
        

       
      */}


    </div>
  );
};


export default SuperPrincipal;
