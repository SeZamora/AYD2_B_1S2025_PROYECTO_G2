import React from 'react';

import '../../../styles/Employetable.css';
const EmployeeTable = () => {
    return (
        <div className="container">
            <div className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-xs-6">
                                <h2>Empleados</h2>
                            </div>
                            <div className="col-xs-6">
                                <a href="#addEmployeeModal" className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Employee</span></a>

                            </div>
                        </div>
                    </div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>

                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>CUI</th>
                                <th>Teléfono</th>
                                <th>Fecha de contratación</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>

                                <td>Thomas Hardy</td>
                                <td>thomashardy@mail.com</td>
                                <td>89 Chiaroscuro Rd, Portland, USA</td>
                                <td>(171) 555-2222</td>
                                <td>
                                    <a href="#editEmployeeModal" className="edit" data-toggle="modal"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                                    <a href="#deleteEmployeeModal" className="delete" data-toggle="modal"><i class="fa fa-trash" aria-hidden="true"></i></a>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>

                </div>
            </div>
        </div>


    );
};

export default EmployeeTable;
