import React, { useEffect, useState } from 'react';

const AddLibrosModal = ({ showModal, toggleModal, role }) => {
    const [formData, setFormData] = useState({
        titulo: '',
        autor: '',
        fecha_lanzamiento: '',
        descripcion: '',
        genero: '',
        stock: '',
        precio: ''
    });

    useEffect(() => {
        if (showModal) {
            console.log(role);
        }
    }, [showModal, role]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };




    const handleSubmit = async (e) => {

        e.preventDefault();
        if (role == 'add') {
            const data = new FormData();

            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });
            console.log(data);

            try {
                const response = await fetch("http://localhost:3000/book/createbook", {
                    method: "POST",
                    body: data
                });

                if (response.ok) {
                    alert("Libro agregado con éxito");
                    setFormData({
                        titulo: '',
                        autor: '',
                        fecha_lanzamiento: '',
                        descripcion: '',
                        genero: '',
                        stock: '',
                        precio: ''
                    });
                    toggleModal();
                    window.location.reload();
                } else {
                    alert("Error al agregar el producto");
                }
            } catch (error) {
                console.error("Error al enviar la solicitud", error);
            }
        }

    };



    return (
        <>

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
                aria-labelledby="addEmployeeModalLabel"
                aria-hidden={!showModal}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addEmployeeModalLabel">
                                {role === 'edit' ? 'Editar Libro' : 'Agregar Nuevo Libro'}
                            </h5>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                {role === 'add' && (
                                    <>
                                        <div className="form-group">
                                            <label htmlFor="Título">Título del libro</label>
                                            <input type="text" className="form-control" id="Título" name="titulo" value={formData.titulo} onChange={handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Autor">Autor</label>
                                            <input type="text" className="form-control" id="Autor" name="autor" value={formData.autor} onChange={handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Fecha">Fecha de lanzamiento</label>
                                            <input type="date" className="form-control" id="Fecha" name="fecha_lanzamiento" value={formData.fecha_lanzamiento} onChange={handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="género">género</label>
                                            <input type="text" className="form-control" id="género" name="genero" value={formData.genero} onChange={handleChange} />
                                        </div>
                                    </>
                                )}
                                <div className="form-group">
                                    <label htmlFor="stock">stock</label>
                                    <input type="number" className="form-control" id="stock" name="stock" value={formData.stock} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Precio">Precio</label>
                                    <input type="number" className="form-control" id="Precio" name="precio" value={formData.precio} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Descripción">Descripción</label>
                                    <textarea className="form-control" id="Descripción" name="descripcion" value={formData.descripcion} onChange={handleChange}></textarea>
                               
                                </div>
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

export default AddLibrosModal;
