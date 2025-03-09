import React from "react";
import Navbar from "../../ui/componets/NabSupervisor";
import "./../../styles/SPrincipal.css";
import LibrosTable from './components/LibrosTable'; // Importamos el nuevo componente

const Libros = () => {
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

       
        <LibrosTable />
      </div>
      {/* 
        

       
      */}


    </div>
  );
};


export default Libros;
