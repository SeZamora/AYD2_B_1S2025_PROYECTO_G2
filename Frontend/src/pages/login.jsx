import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import useAuth from '../hook/useAuth';
import { useNavigate } from 'react-router-dom'; 
import './login.css';

const LoginPage = () => {
    const navigate = useNavigate(); 
    const { login } = useAuth();
    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');

    const isFormValid = username.trim() !== '' && password.trim() !== '' && userType.trim() !== '';

    const handleSubmit = async (e) => {
        if (username === 'admin' && password === 'admin') {
            navigate('/gerente_supervisor');
            return;
        }

        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, userType })
            });
            
            const data = await response.json();
            console.log(data);
            if (data.success) {
                notifySuccess(data.message);
                console.log(data);

                // Guardar el ID del usuario en el localStorage
                if (data.user && data.user.id) {
                    localStorage.setItem('userId', data.user.id); // Guardar el ID del usuario
                }

                login(data.userType);

                // Redirigir según el tipo de usuario
                if (data.userType === 'supervisores') {
                    navigate('/SuperPrincipal'); 
                }
                if (data.userType === 'empleados') {
                    navigate('/empleado'); 
                }
                if (data.userType === 'cuenta') {
                    navigate('/usuario');
                }
            } else {
                notifyError(data.message);
            }
        } catch (error) {
            notifyError('Error en la conexión con el servidor');
        }
    };

    return (
        <div className="login-page">
            <div className="container-form sign-in">
                <form className="formulario" id="loginForm" onSubmit={handleSubmit}>
                    <h2 className="create-account">Iniciar Sesión</h2>

                    <div className="input-group">
                        <label className="input-label">Usuario</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Tipo de Usuario</label>
                        <div className="radio-group">
                            {['admin', 'cuenta', 'supervisores', 'empleados'].map((type) => (
                                <label key={type} style={{ marginRight: '10px' }}>
                                    <input
                                        type="radio"
                                        name="userType"
                                        value={type}
                                        checked={userType === type}
                                        onChange={(e) => setUserType(e.target.value)}
                                    />
                                    {type}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="input-button" disabled={!isFormValid}>
                        <b>Login</b>
                    </button>
                </form>
                
                <div className="welcome-back">
                    <div className="message">
                        <h2>Bienvenido de nuevo</h2>
                        <p>Si aún no tienes una cuenta, por favor regístrate aquí</p>
                        <button className="input-button" onClick={() => navigate('/Registro')}>Registrarse</button>
                        <a className="recover-password-link" onClick={() => navigate('/Contraseña')}>
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>
                </div>
                <ToastContainer position="bottom-right" autoClose={3000} pauseOnHover theme="colored" />
            </div>
        </div>
    );
};

export default LoginPage;