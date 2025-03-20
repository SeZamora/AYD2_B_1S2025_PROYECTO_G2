import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="bg-gradient-to-r from-teal-600 to-indigo-600 fixed top-0 left-0 w-full z-50 shadow-lg">
            <div className="container mx-auto flex items-center py-1 px-4">
                
                {/* Asegura que el texto esté completamente a la izquierda */}
                <a className="text-2xl font-bold text-orange-400 cursor-pointer mr-auto" onClick={() => navigate('/usuario')}>
                    NebookVault
                </a>

                <button className="lg:hidden text-white text-1xl">
                    <i className="fas fa-bars"></i>
                </button>

                <ul className="hidden lg:flex space-x-6 text-white text-lg">
                    <li className="flex flex-col items-center cursor-pointer hover:text-orange-300" onClick={() => navigate('/usuario')}>
                        <i className="fa fa-shopping-cart text-1xl"></i>
                        <span>Home</span>
                    </li>
                    <li className="flex flex-col items-center cursor-pointer hover:text-orange-300" onClick={() => navigate('/usuario')}>
                        <i className="fa fa-star text-1xl"></i>
                        <span>x</span>
                    </li>
                    <li className="flex flex-col items-center cursor-pointer hover:text-orange-300" onClick={() => navigate('/usuario')}>
                        <i className="fa fa-book text-1xl"></i>
                        <span>x</span>
                    </li>
                </ul>
                
                {/* Asegura que el botón esté completamente a la derecha */}
                <button className="text-white flex flex-col items-center hover:text-red-400 ml-auto" onClick={() => navigate('/')}>
                    <i className="fa fa-sign-out text-1xl"></i>
                    <span>Cerrar sesión</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
