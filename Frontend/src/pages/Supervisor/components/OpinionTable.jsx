import React, { useState, useEffect } from 'react';

const OponionTable = () => {
    const [opiniones, setOpiniones] = useState([]);

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
            <div className="d-flex justify-content-center" style={{ height: "20%" }}>
                <div className="search">
                    <input type="text" className="search-input" />
                    <a href="#" className="search-icon">
                        <i className="fa fa-search"></i>
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
                                    <th style={{ width: "10%", textAlign: "center" }}>ID Libro</th>
                                    <th style={{ width: "20%" }}>Nombre de Usuario</th>
                                    <th style={{ width: "10%", textAlign: "center" }}>Calificación</th>
                                    <th style={{ width: "15%", textAlign: "center" }}>Fecha de la calificación</th>
                                    <th style={{ width: "45%", wordBreak: "break-word" }}>Comentario</th>
                                </tr>
                            </thead>
                            <tbody>
                                {opiniones.map((opinion) => (
                                    <tr key={opinion.id_resenia}>
                                        <td style={{ width: "10%", textAlign: "center" }}>{opinion.id_libro}</td>
                                        <td style={{ width: "20%" }}>{opinion.nombre_usuario}</td>
                                        <td style={{ width: "10%", textAlign: "center" }}>{opinion.calificacion}</td>
                                        <td style={{ width: "15%", textAlign: "center" }}>{opinion.fecha}</td>
                                        <td style={{ width: "45%", wordBreak: "break-word" }}>{opinion.comentario}</td>
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
