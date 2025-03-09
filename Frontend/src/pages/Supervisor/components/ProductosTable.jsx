import React, { useState } from 'react';
import '../../../styles/Employetable.css';
import AddProdutoModal from './AddProdutoModal'; // Asegúrate de importar correctamente el archivo

const ProductTable = () => {
    const [showModal, setShowModal] = useState(false);
    const [role2, setRole] = useState('');

    const Produto = [
        { codigo: "P001", nombre: "Producto 1", categoria: "Categoría A", precioCompra: 100, precioVenta: 150, cantidad: 50 },
        { codigo: "P002", nombre: "Producto 2", categoria: "Categoría B", precioCompra: 200, precioVenta: 250, cantidad: 30 },
        { codigo: "P003", nombre: "Producto 3", categoria: "Categoría A", precioCompra: 150, precioVenta: 200, cantidad: 20 },
        { codigo: "P004", nombre: "Producto 4", categoria: "Categoría C", precioCompra: 300, precioVenta: 350, cantidad: 10 },
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
                            {Produto.map((Produto) => (
                                <tr key={Produto.codigo}>
                                    <td style={{ textAlign: 'center' }}>{Produto.codigo}</td>
                                    <td style={{ textAlign: 'center' }}>{Produto.nombre}</td>
                                    <td style={{ textAlign: 'center' }}>{Produto.categoria}</td>
                                    <td style={{ textAlign: 'center' }}>{Produto.precioCompra}</td>
                                    <td style={{ textAlign: 'center' }}>{Produto.precioVenta}</td>
                                    <td style={{ textAlign: 'center' }}>{Produto.cantidad}</td>
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

            <AddProdutoModal showModal={showModal} toggleModal={toggleModal} role={role2}/>
        </div>
        </>
    );
};

export default ProductTable;
