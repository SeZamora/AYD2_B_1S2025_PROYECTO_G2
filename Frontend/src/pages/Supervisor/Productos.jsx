import React from "react";
import Navbar from "../../ui/componets/NabSupervisor";
import "./../../styles/SPrincipal.css";
import ProductTable from './components/ProductosTable'; // Importamos el nuevo componente

const Productos = () => {
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

       
        <ProductTable />
      </div>
      {/* 
        

       
      */}


    </div>
  );
};


export default Productos;
