import React, { useEffect, useState } from 'react';

const AddEmployeeModal = ({ showModal, toggleModal, role,productId }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        cui: '',
        telefono: '',
        correo: '',
        edad: '',
        genero: '',
        fecha: '',
        imagen: null,
        supervisores_id_supervisor: '',
        verificado:0,
        contrasenia: null

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


const handleFileChange = (e) => {
    setFormData({ ...formData, imagen: e.target.files[0] });
};


const handleSubmit = async (e) => {

    e.preventDefault();
    if (role == 'add') {
        const data = new FormData();

        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        try {
            const response = await fetch("http://localhost:3000/employee/addEmployee", {
                method: "POST",
                body: data
            });
          
            if (response.ok) {
                alert("Producto agregado con éxito");
                setFormData({
                    nombre: '',
        apellido: '',
        cui: '',
        telefono: '',
        correo: '',
        edad: '',
        genero: '',
        fecha: '',
        imagen: null,
        supervisores_id_supervisor: '',
        verificado:0,
        contrasenia: null
                });
                toggleModal();
                window.location.reload();
            } else {
                alert("Error al agregar el producto");
            }
        } catch (error) {
            console.error("Error al enviar la solicitud", error);
        }
    } else if (role === 'modify') {
        const data = {
            empleados_id: productId,
            correo: formData.correo,
            telefono: Number(formData.telefono),
            edad: Number(formData.edad)
        };
        
        console.log(data);
        
        try {
            const response = await fetch("http://localhost:3000/employee/editInfo", {
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
                    apellido: '',
                    cui: '',
                    telefono: '',
                    correo: '',
                    edad: '',
                    genero: '',
                    fecha: '',
                    imagen: null,
                    supervisores_id_supervisor: '',
                    verificado:0,
                    contrasenia: null
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
                                {role === 'edit' ? 'Editar Empleado' : 'Agregar Nuevo Empleado'}
                            </h5>
                        </div>
                        <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                                {role === 'add' && (
                                    <>
                                        <div className="form-group">
                                            <label htmlFor="employeeName">Nombre</label>
                                            <input type="text" className="form-control" name='nombre' id="employeeName" value={formData.nombre} onChange={handleChange}  placeholder="Nombre del empleado" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="employeeLastName">Apellido</label>
                                            <input type="text" className="form-control" id="employeeLastName" name='apellido' value={formData.apellido} onChange={handleChange}  placeholder="Apellido del empleado" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="employeeCUI">CUI</label>
                                            <input type="number" className="form-control" id="employeeCUI" name='cui'value={formData.cui} onChange={handleChange} placeholder="Número de CUI" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="employeeGender">Género</label>
                                            <input type="text" className="form-control" id="employeeGender"name='genero' value={formData.genero} onChange={handleChange} placeholder="Género" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="employeeHireDate">Fecha de contratación</label>
                                            <input type="date" className="form-control" id="employeeHireDate" name='fecha' value={formData.fecha} onChange={handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="employeePhoto">Fotografía</label>
                                            <input type="file" className="form-control" id="imagen" name="imagen" accept="image/*" onChange={handleFileChange} required />
                                            </div>
                                    </>
                                )}

                              
                                <div className="form-group">
                                    <label htmlFor="employeePhone">Teléfono</label>
                                    <input type="text" className="form-control" id="employeePhone" placeholder="Número de teléfono" name='telefono' value={formData.telefono} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="employeeEmail">Correo electrónico</label>
                                    <input type="email" className="form-control" id="employeeEmail" placeholder="Correo electrónico" name='correo' value={formData.correo} onChange={handleChange}  />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="employeeAge">Edad</label>
                                    <input type="number" className="form-control" id="employeeAge" placeholder="Edad" name='edad' value={formData.edad} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="employeeAge">Supervisor</label>
                                    <input type="number" className="form-control" id="employeeAge" placeholder="supervisor" name='supervisores_id_supervisor'  value={formData.supervisores_id_supervisor} onChange={handleChange} />
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

export default AddEmployeeModal;
