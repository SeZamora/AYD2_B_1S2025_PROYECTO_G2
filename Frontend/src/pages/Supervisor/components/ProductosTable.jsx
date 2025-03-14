import React, { useState, useEffect } from 'react';

import '../../../styles/Employetable.css';
import AddProdutoModal from './AddProdutoModal'; // Asegúrate de importar correctamente el archivo
import DeleteLibroModal from './Eliminar';


const ProductTable = () => {
    const [showModal, setShowModal] = useState(false);
    const [role2, setRole] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para el modal de eliminación
    const [estado, setEstado] = useState('');




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

const [productos, setProductos] = useState([]);

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
                            {productos.map((productos) => (
                                <tr key={productos.id_producto}>
                                    <td style={{ textAlign: 'center' }}>{productos.codigo}</td>
                                    <td style={{ textAlign: 'center' }}>{productos.nombre}</td>
                                    <td style={{ textAlign: 'center' }}>{productos.categoria}</td>
                                    <td style={{ textAlign: 'center' }}>{productos.precio_compra}</td>
                                    <td style={{ textAlign: 'center' }}>{productos.precio_venta}</td>
                                    <td style={{ textAlign: 'center' }}>{productos.cantidad}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <a onClick={toggleModalM} className="edit" data-toggle="modal">
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

            <AddProdutoModal showModal={showModal} toggleModal={toggleModal} role={role2} />
            <DeleteLibroModal showDeleteModal={showDeleteModal} toggleDeleteModal={toggleDeleteModal} estado={estado} />

        </div>
        </>
    );
};

export default ProductTable;



﻿


