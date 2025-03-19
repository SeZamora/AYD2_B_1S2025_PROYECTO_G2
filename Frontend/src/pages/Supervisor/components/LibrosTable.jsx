import React, { useState, useEffect } from 'react'; 
import '../../../styles/Employetable.css';
import AddLibrosModal from './AddLibrosModal';
import DeleteLibroModal from './Eliminar';

const LibrosTable = () => {
    const [showModal, setShowModal] = useState(false);
    const [role2, setRole] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [estado, setEstado] = useState('');
    const [selectedProductId, setSelectedProductId] = useState(null);

    const [libros, setLibros] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 

    const fetchLibros = async () => {
        try {
            const response = await fetch("http://localhost:3000/book/getallbooks");
            const data = await response.json();
            console.log(data);
            if (data.success && Array.isArray(data.books)) {
                setLibros(data.books);
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
        setShowModal(prev => !prev);
        setRole(prev => (prev ? '' : 'add'));
    };

    const toggleModalM = (id) => {
        setSelectedProductId(id);
        setShowModal(prev => !prev);
        setRole('edit');
    };

    const toggleDeleteModal = (elemento, id) => {
        setSelectedProductId(id);
        setEstado(elemento);
        setShowDeleteModal(prev => !prev);
    };


    const filteredLibros = libros.filter(libro =>
        libro.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="d-flex justify-content-center" style={{ height: "20%" }}>
                <div className="search">
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Buscar por título..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
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
                                        <i className="material-icons">&#xE147;</i> <span>Add New Producto</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'center' }}>Título del libro</th>
                                    <th style={{ textAlign: 'center', width: '20%' }}>Autor</th>
                                    <th style={{ textAlign: 'center' }}>Fecha de lanzamiento</th>
                                    <th style={{ textAlign: 'center' }}>Género</th>
                                    <th style={{ textAlign: 'center' }}>Stock</th>
                                    <th style={{ textAlign: 'center' }}>Precio</th>
                                    <th style={{ textAlign: 'center' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLibros.map((libro) => (
                                    <tr key={libro.codigo}>
                                        <td style={{ textAlign: 'center' }}>{libro.titulo}</td>
                                        <td style={{ textAlign: 'center' }}>{libro.autor}</td>
                                        <td style={{ textAlign: 'center' }}>{libro.fecha_lanzamiento}</td>
                                        <td style={{ textAlign: 'center' }}>{libro.genero}</td>
                                        <td style={{ textAlign: 'center' }}>{libro.stock}</td>
                                        <td style={{ textAlign: 'center' }}>{libro.precio}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <a onClick={() => toggleModalM(libro.id_libro)} className="edit" data-toggle="modal">
                                                <i className="fa fa-pencil" aria-hidden="true"></i>
                                            </a>
                                            <a onClick={() => toggleDeleteModal('Libro', libro.id_libro)} className="delete" data-toggle="modal">
                                                <i className="fa fa-trash" aria-hidden="true"></i>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <AddLibrosModal showModal={showModal} toggleModal={toggleModal} role={role2} id_libro={selectedProductId}/>
                <DeleteLibroModal showDeleteModal={showDeleteModal} toggleDeleteModal={toggleDeleteModal} estado={estado} Idato={selectedProductId} />
            </div>
        </>
    );
};

export default LibrosTable;
