import React, { useState, useEffect } from 'react';

import '../../../styles/Employetable.css';
import AddProdutoModal from './AddProdutoModal'; 
import DeleteLibroModal from './Eliminar';

const ProductTable = () => {
    const [showModal, setShowModal] = useState(false);
    const [role2, setRole] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para el modal de eliminación
    const [estado, setEstado] = useState('');
    const [selectedProductId, setSelectedProductId] = useState(null);

    // Añadimos el estado para productos
    const [productos, setProductos] = useState([]); // Inicializamos el estado 'productos'

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

    const toggleModalM = (id) => {
        setSelectedProductId(id);  // Guardar el ID del producto
        setShowModal(prev => {
            const newShowModal = !prev;
            if (newShowModal) {
                setRole('edit');
            } else {
                setRole('');
                setSelectedProductId(null); // Limpiar el estado al cerrar el modal
            }
            return newShowModal;
        });
    };




    const toggleDeleteModal = (elemento) => {
        setShowDeleteModal(prev => !prev);
        setEstado(elemento);  // Actualizar el estado con el valor correcto
    };


    const fetchProductos = async () => {
        try {
            const response = await fetch("http://localhost:3000/product/getAllProducts");
            const data = await response.json();
            if (data.success) {
                console.log(data);
                setProductos(data.data);
            } else {
                console.error("Error obteniendo productos:", data.message);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };
    
    
    useEffect(() => {
        fetchProductos();
    }, []);





    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = async () => {
        try {
            const response = await fetch("http://localhost:3000/product/getProductByName", {
                method: "POST", // Usamos POST porque es lo que mencionaste
                headers: {
                    "Content-Type": "application/json", // Asegúrate de que el servidor sepa que estamos enviando JSON
                },
                body: JSON.stringify({ nombre_producto: searchQuery }) // Enviamos el nombre del producto como JSON
            });

            const data = await response.json();

            if (data.success) {
                setProductos([data.product]); // Solo mostramos el producto encontrado
            } else {
                console.error(data.message);
                setProductos([]); // Limpiamos la tabla si no se encuentra el producto
            }
        } catch (error) {
            console.error("Error al buscar producto:", error);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-center" style={{ height: "20%" }}>
                <div className="search">
                    <input 
                        type="text" 
                        className="search-input" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} // Captura el valor del input
                    />
                    <a href="#" className="search-icon" onClick={handleSearch}>
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
                                    <h2>Productos</h2>
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
                                    <th style={{ textAlign: 'center' }}>Código del producto </th>
                                    <th style={{ textAlign: 'center' }}>Nombre del producto </th>
                                    <th style={{ textAlign: 'center', width: '20%' }}>Categoría </th> {/* Ancho ajustado */}
                                    <th style={{ textAlign: 'center' }}>Precio de compra</th>
                                    <th style={{ textAlign: 'center' }}>Precio de venta </th>
                                    <th style={{ textAlign: 'center' }}>Cantidad en inventario</th>
                                    <th style={{ textAlign: 'center' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((producto) => (
                                    <tr key={producto.id_producto}>
                                        <td style={{ textAlign: 'center' }}>{producto.codigo}</td>
                                        <td style={{ textAlign: 'center' }}>{producto.nombre}</td>
                                        <td style={{ textAlign: 'center' }}>{producto.categoria}</td>
                                        <td style={{ textAlign: 'center' }}>{producto.precio_compra}</td>
                                        <td style={{ textAlign: 'center' }}>{producto.precio_venta}</td>
                                        <td style={{ textAlign: 'center' }}>{producto.cantidad}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <a onClick={() => toggleModalM(producto.id_producto)} className="edit" data-toggle="modal">
                                                <i className="fa fa-pencil" aria-hidden="true"></i>
                                            </a>

                                            <a onClick={() => toggleDeleteModal('Producto')} className="delete" data-toggle="modal">
                                                <i className="fa fa-trash" aria-hidden="true"></i>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <AddProdutoModal showModal={showModal} toggleModal={toggleModal} role={role2} productId={selectedProductId} />
                <DeleteLibroModal showDeleteModal={showDeleteModal} toggleDeleteModal={toggleDeleteModal} estado={estado} />
            </div>
        </>
    );
};

export default ProductTable;
