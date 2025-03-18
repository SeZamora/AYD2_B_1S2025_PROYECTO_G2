import React, { useState, useEffect } from 'react';

const AddProdutoModal = ({ showModal, toggleModal, role, productId }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        codigo: '',
        categoria: '',
        precio_compra: '',
        precio_venta: '',
        cantidad: '',
        imagen: null
    });

    useEffect(() => {
        if (showModal) {
            console.log(role);
        }
    }, [showModal, role]);

    // Manejar cambios en inputs de texto y números
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Manejar selección de archivo
    const handleFileChange = (e) => {
        setFormData({ ...formData, imagen: e.target.files[0] });
    };

    // Enviar datos al backend
    const handleSubmit = async (e) => {

        e.preventDefault();
        if (role == 'add') {
            const data = new FormData();

            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            try {
                const response = await fetch("http://localhost:3000/product/addProduct", {
                    method: "POST",
                    body: data
                });

                if (response.ok) {
                    alert("Producto agregado con éxito");
                    setFormData({
                        nombre: '',
                        descripcion: '',
                        codigo: '',
                        categoria: '',
                        precio_compra: '',
                        precio_venta: '',
                        cantidad: '',
                        imagen: null
                    });
                    toggleModal();
                    window.location.reload();
                } else {
                    alert("Error al agregar el producto");
                }
            } catch (error) {
                console.error("Error al enviar la solicitud", error);
            }
        } else if (role === 'edit') {
            const data = {
                id_producto: productId,
                descripcion: formData.descripcion,
                precio_venta: Number(formData.precio_venta),
                cantidad: Number(formData.cantidad)
            };
            
            console.log(data);
            
            try {
                const response = await fetch("http://localhost:3000/product/editProduct", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json" 
                    },
                    body: JSON.stringify(data) 
                });
            
                if (response.ok) {
                    alert("Producto editado con éxito");
                    setFormData({
                        nombre: '',
                        descripcion: '',
                        codigo: '',
                        categoria: '',
                        precio_compra: '',
                        precio_venta: '',
                        cantidad: '',
                        imagen: null
                    });
                    toggleModal();
                    window.location.reload();
                } else {
                    alert("Error al editar el producto");
                }
            } catch (error) {
                console.error("Error al enviar la solicitud", error);
            }
        }            
    };        

    return (
        <>
            {/* Fondo gris semi-transparente */}
            {showModal && (
                <div
                    className="modal-backdrop fade show"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1040
                    }}
                    onClick={toggleModal}
                />
            )}

            {/* Modal */}
            <div
                className={`modal fade ${showModal ? 'show' : ''}`}
                tabIndex="-1"
                role="dialog"
                style={{
                    display: showModal ? 'block' : 'none',
                    zIndex: 1050,
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
                aria-labelledby="addProductModalLabel"
                aria-hidden={!showModal}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addProductModalLabel">
                                {role === 'edit' ? 'Editar Producto' : 'Agregar Nuevo Producto'}
                            </h5>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                {role === "add" && (
                                    <>
                                        <div className="form-group">
                                            <label htmlFor="nombre">Nombre del producto</label>
                                            <input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="codigo">Código del producto</label>
                                            <input type="text" className="form-control" id="codigo" name="codigo" value={formData.codigo} onChange={handleChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="categoria">Categoría</label>
                                            <input type="text" className="form-control" id="categoria" name="categoria" value={formData.categoria} onChange={handleChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="precio_compra">Precio de compra</label>
                                            <input type="number" className="form-control" id="precio_compra" name="precio_compra" value={formData.precio_compra} onChange={handleChange} required />
                                        </div>
                                    </>
                                )}

                                <div className="form-group">
                                    <label htmlFor="precio_venta">Precio de venta</label>
                                    <input type="number" className="form-control" id="precio_venta" name="precio_venta" value={formData.precio_venta} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cantidad">Cantidad en inventario</label>
                                    <input type="number" className="form-control" id="cantidad" name="cantidad" value={formData.cantidad} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="descripcion">Descripción</label>
                                    <textarea className="form-control" id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange}></textarea>
                                </div>

                                {role === "add" && (
                                    <div className="form-group">
                                        <label htmlFor="imagen">Imagen del producto</label>
                                        <input type="file" className="form-control" id="imagen" name="imagen" accept="image/*" onChange={handleFileChange} required />
                                    </div>
                                )}

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={toggleModal}>
                                        Cerrar
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Guardar
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddProdutoModal;
