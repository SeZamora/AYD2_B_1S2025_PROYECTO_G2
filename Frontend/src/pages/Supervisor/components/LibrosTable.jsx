import React, { useState, useEffect } from 'react';
import '../../../styles/Employetable.css';
import AddLibrosModal from './AddLibrosModal';
import DeleteLibroModal from './Eliminar';

const LibrosTable = () => {
    const [showModal, setShowModal] = useState(false);
    const [role2, setRole] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para el modal de eliminación
    const [estado, setEstado] = useState('');



    const [libros, setlibros] = useState([]);

    const fetchLibros = async () => {
        try {
            const response = await fetch("http://localhost:3000/book/getallbooks");
            const data = await response.json();
            console.log(data);  // Verifica el contenido de data
            if (data.success && Array.isArray(data.books)) {
                setlibros(data.books);
            } else {
                console.error("Error obteniendo libros:", data.message);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };



    useEffect(() => {
        fetchLibros();
    }, []);



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
                setRole('edit');
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
                                        <td style={{ textAlign: 'center' }}>{libro.fecha_lanzamiento}</td>
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
