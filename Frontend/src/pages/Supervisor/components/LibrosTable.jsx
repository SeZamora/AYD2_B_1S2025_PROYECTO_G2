import React, { useState } from 'react';
import '../../../styles/Employetable.css';
import AddLibrosModal from './AddLibrosModal'; 
import DeleteLibroModal from './Eliminar';

const LibrosTable = () => {
    const [showModal, setShowModal] = useState(false);
    const [role2, setRole] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para el modal de eliminación
    const [estado, setEstado] = useState('');


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

    // Cambié esta parte para actualizar el estado antes de pasar la prop
    const toggleDeleteModal = (elemento) => {
        setShowDeleteModal(prev => !prev);
        setEstado(elemento);  // Actualizar el estado con el valor correcto
    };

    return (
        <>
            <div className="d-flex justify-content-center" style={{ height: "20%" }}>
                <div className="search">
                    <input type="text" className="search-input" name="" />
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
                                    <th style={{ textAlign: 'center' }}>titulo del libro</th>
                                    <th style={{ textAlign: 'center', width: '20%' }}>Autor</th>
                                    <th style={{ textAlign: 'center' }}>Fecha de lanzamiento</th>
                                    <th style={{ textAlign: 'center' }}>género</th>
                                    <th style={{ textAlign: 'center' }}>stock</th>
                                    <th style={{ textAlign: 'center' }}>Precio</th>
                                    <th style={{ textAlign: 'center' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {libros.map((libro) => (
                                    <tr key={libro.codigo}>
                                        <td style={{ textAlign: 'center' }}>{libro.titulo}</td>
                                        <td style={{ textAlign: 'center' }}>{libro.autor}</td>
                                        <td style={{ textAlign: 'center' }}>{libro.fechaLanzamiento}</td>
                                        <td style={{ textAlign: 'center' }}>{libro.genero}</td>
                                        <td style={{ textAlign: 'center' }}>{libro.stock}</td>
                                        <td style={{ textAlign: 'center' }}>{libro.precio}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <a onClick={toggleModalM} className="edit" data-toggle="modal">
                                                <i className="fa fa-pencil" aria-hidden="true"></i>
                                            </a>
                                            <a onClick={() => toggleDeleteModal('Libro')} className="delete" data-toggle="modal">
                                                <i className="fa fa-trash" aria-hidden="true"></i>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <AddLibrosModal showModal={showModal} toggleModal={toggleModal} role={role2} />
                <DeleteLibroModal showDeleteModal={showDeleteModal} toggleDeleteModal={toggleDeleteModal} estado={estado} />
            </div>
        </>
    );
};

export default LibrosTable;
