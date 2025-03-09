import React, { useState } from 'react';
import '../../../styles/Employetable.css';
import AddLibrosModal from './AddLibrosModal'; 

const LibrosTable = () => {
    const [showModal, setShowModal] = useState(false);
    const [role2, setRole] = useState('');

    const libros = [
        { 
            codigo: "B001", 
            titulo: "El Gran Libro", 
            autor: "Autor A", 
            fechaLanzamiento: "2025-01-01", 
            descripcion: "Una novela épica de aventuras y fantasía", 
            genero: "Fantasía", 
            stock: 50, 
            precio: 20.00 
        },
        { 
            codigo: "B002", 
            titulo: "La Aventura Secreta", 
            autor: "Autor B", 
            fechaLanzamiento: "2024-11-15", 
            descripcion: "Un thriller emocionante que te mantendrá al borde de tu asiento", 
            genero: "Thriller", 
            stock: 30, 
            precio: 15.00 
        },
        { 
            codigo: "B003", 
            titulo: "Recetas Mágicas", 
            autor: "Autor C", 
            fechaLanzamiento: "2023-07-30", 
            descripcion: "Recetas deliciosas para chefs novatos y expertos", 
            genero: "Cocina", 
            stock: 100, 
            precio: 10.00 
        },
        { 
            codigo: "B004", 
            titulo: "El Último Secreto", 
            autor: "Autor D", 
            fechaLanzamiento: "2022-09-12", 
            descripcion: "Un misterio sin resolver, hasta ahora", 
            genero: "Misterio", 
            stock: 15, 
            precio: 25.00 
        }
    ];
    

    const toggleModal = () => {
        setShowModal(prev => {
            const newShowModal = !prev;
            if (newShowModal) {
                setRole('add');
            } else {
                setRole('');
            }
            return newShowModal;
        });
    };

    const toggleModalM = () => {
        setShowModal(prev => {
            const newShowModal = !prev;
            if (newShowModal) {
                setRole('Produto');
            } else {
                setRole('');
            }
            return newShowModal;
        });
    };

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
                                <h2>Libros</h2>
                            </div>
                            <div className="col-xs-6 text-right">
                                <button className="btn btn-success" onClick={toggleModal}>
                                    <i className="material-icons">&#xE147;</i> <span>Add New Produto</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                
                                <th style={{ textAlign: 'center' }}>titulo del libro </th>
                                <th style={{ textAlign: 'center', width: '20%' }}>Autor </th> {/* Ancho ajustado */}
                                <th style={{ textAlign: 'center' }}>Fecha de lanzamiento</th>
                                <th style={{ textAlign: 'center' }}>género</th>
                                <th style={{ textAlign: 'center' }}>stock </th>
                                <th style={{ textAlign: 'center' }}>Precio</th>
                                <th style={{ textAlign: 'center' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {libros.map((libros) => (
                                <tr key={libros.codigo}>
                                    <td style={{ textAlign: 'center' }}>{libros.titulo}</td>
                                    <td style={{ textAlign: 'center' }}>{libros.autor}</td>
                                    <td style={{ textAlign: 'center' }}>{libros.fechaLanzamiento}</td>
                                    <td style={{ textAlign: 'center' }}>{libros.genero}</td>
                                    <td style={{ textAlign: 'center' }}>{libros.stock}</td>
                                    <td style={{ textAlign: 'center' }}>{libros.precio}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <a onClick={toggleModalM} className="edit" data-toggle="modal">
                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                        </a>
                                        <a href="#deleteProdutoModal" className="delete" data-toggle="modal">
                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AddLibrosModal showModal={showModal} toggleModal={toggleModal} role={role2}/>
        </div>
        </>
    );
};

export default LibrosTable;
