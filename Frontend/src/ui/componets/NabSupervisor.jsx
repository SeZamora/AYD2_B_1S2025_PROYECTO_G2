import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from "../../hook/useAuth";  // Asegúrate de no usar llaves {}

const Navbar = () => {
    const { logout ,role} = useAuth(); 
    const navigate = useNavigate();
    const navbarStyle = {
        background: 'linear-gradient(to right, #268b8f,rgb(106, 95, 145))',
        position: 'fixed',
        height: '70px',
        top: '0',
        left: '0',
        width: '100%',
        zIndex: '1000',


    };

    const handleLogout = () => {
        logout();
        navigate('/');
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={navbarStyle}>
            <div className="container-fluid">
                <a className="navbar-brand" style={{ color: "#e59a34" }}>NebookVault</a>
                <a className="nav-link" >
                                <div>
                                    <i class="fa fa-users fa-2x" aria-hidden="true" onClick={() => navigate('/SuperPrincipal')}></i>
                                </div>
                                Empleados
                            </a>
                            <a className="nav-link">
                                <div>
                                <i class="fa fa-shopping-cart fa-2x" aria-hidden="true" onClick={() => navigate('/Productos')}></i>
                                </div>
                                Productos
                            </a>
                            <a className="nav-link">
                                <div>
                                <i class="fa fa-star fa-2x" aria-hidden="true" onClick={() => navigate('/Opinion')} ></i>
                                </div>
                                Opiniones
                            </a>


                            <a className="nav-link">
                                <div>
                                <i className="fa fa-book fa-2x" aria-hidden="true"onClick={() => navigate('/Libros')} ></i>

                                </div>
                                libros
                            </a>
               


                    <ul className="navbar-nav ms-auto d-flex flex-row mt-3 mt-lg-0">
                        <li className="nav-item text-center mx-2 mx-lg-1">
                            <button className="nav-link btn btn-link text-light" onClick={handleLogout}>
                                <div>
                                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                                </div>
                                Cerrar sesión
                            </button>
                        </li>
                    </ul>
                </div>
            
        </nav>
    );
};

export default Navbar;
