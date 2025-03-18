import React, { useState, useEffect } from 'react';
import '../../../styles/Employetable.css';


const OponionTable = () => {
    

    const employees = [
        { id: 1, nombre: "Thomas", apellido: "Hardy", cui: "123456789", telefono: "(171) 555-2222", fecha: "2023-05-14" },
        { id: 2, nombre: "Maria", apellido: "Gonzalez", cui: "987654321", telefono: "(171) 555-3333", fecha: "2022-08-20" },
        { id: 3, nombre: "Carlos", apellido: "Ramirez", cui: "456123789", telefono: "(171) 555-4444", fecha: "2021-10-30" },
        { id: 4, nombre: "Sofia", apellido: "López", cui: "321654987", telefono: "(171) 555-5555", fecha: "2020-12-15" },
        // Más empleados aquí...
    ];

   
    const [opiniones, setOpiniones] = useState([]); // Inicializamos el estado 'productos'

        const fetchOpiniones = async () => {
            try {
                const response = await fetch("http://localhost:3000/book/resenias");
                const data = await response.json();
                if (data.success) {
                    console.log(data);
                    setOpiniones(data.data);
                } else {
                    console.error("Error obteniendo productos:", data.message);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        
        
        useEffect(() => {
            fetchOpiniones();
        }, []);

    return (
        <>
        <div class="d-flex justify-content-center" style={{ height: "20%" }}>
                  <div class="search">
                    <input type="text" class="search-input" name="" />
                    <a href="#" class="search-icon">
                      <i class="fa fa-search"></i>
                    </a>
                  </div>
                </div>
        <div className="container">
            <div className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-xs-6">
                                <h2>Opiniones de libros</h2>
                            </div>
                            
                        </div>
                    </div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                            <th>ID Libro</th>
                            <th>Nombre de Usuario</th>
                                <th>Calificacion</th>
                                <th>Fecha de la calificacion</th>
                                
                                <th>Comentario</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            {opiniones.map((opiniones) => (
                                <tr key={opiniones.id_resenia}>
                                    <td>{opiniones.id_libro}</td>
                                    <td>{opiniones.nombre_usuario}</td>
                                    <td>{opiniones.calificacion}</td>
                                    <td>{opiniones.fecha}</td>
                                    
                                    <td>{opiniones.comentario}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            
        </div>
        </>
    );
};

export default OponionTable;
