import React from "react";
import Navbar from "../../ui/componets/NabSupervisor";
import "./../../styles/SPrincipal.css";
import OponionTable from "./components/OpinionTable";

const Opinion = () => {
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
            <OponionTable />
       
        
      </div>
     
    </div>
  );
};


export default Opinion;
