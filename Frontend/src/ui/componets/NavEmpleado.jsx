import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="bg-gradient-to-r from-teal-600 to-indigo-600 fixed top-0 left-0 w-full z-50 shadow-lg">
            <div className="container mx-auto flex items-center justify-between py-1 px-1">
                <a className="text-2xl font-bold text-orange-400 cursor-pointer" onClick={() => navigate('/')}>NebookVault</a>
                
                <button className="lg:hidden text-white text-1xl">
                    <i className="fas fa-bars"></i>
                </button>

                <ul className="hidden lg:flex space-x-6 text-white text-lg">
                    <li className="flex flex-col items-center cursor-pointer hover:text-orange-300" onClick={() => navigate('/empleado')}>
                        <i className="fa fa-users text-1xl"></i>
                        <span>Home</span>
                    </li>
                    <li className="flex flex-col items-center cursor-pointer hover:text-orange-300" onClick={() => navigate('/')}>
                        <i className="fa fa-shopping-cart text-1xl"></i>
                        <span>Empleado</span>
                    </li>
                    <li className="flex flex-col items-center cursor-pointer hover:text-orange-300" onClick={() => navigate('/facturas')}>
                        <i className="fa fa-star text-1xl"></i>
                        <span>Facturas</span>
                    </li>
                    <li className="flex flex-col items-center cursor-pointer hover:text-orange-300" onClick={() => navigate('/buscarFactura')}>
                        <i className="fa fa-book text-1xl"></i>
                        <span>Buscar Factura</span>
                    </li>
                </ul>
                
                <button className="text-white flex flex-col items-center hover:text-red-400" onClick={() => alert('Cerrar sesión')}> 
                    <i className="fa fa-sign-out text-1xl"></i>
                    <span>Cerrar sesión</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
