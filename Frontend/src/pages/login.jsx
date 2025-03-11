import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import useAuth from '../hook/useAuth';
import './login.css';

const LoginPage = () => {
    const { login } = useAuth();
    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('User');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, userType })
            });
            
            const data = await response.json();
            
            console.log(data);

            // if (response.ok) {
            //     notifySuccess('Inicio de sesión exitoso');
            //     login(userType);
            // } else {
            //     notifyError(data.message || 'Usuario o contraseña incorrectos');
            // }
        } catch (error) {
            notifyError('Error en la conexión con el servidor');
        }

        try {
            const response = await fetch('http://localhost:3000/dbroute/dbtest', {
                method: 'GET',
            });
            
            const data = await response.json();
            
            console.log(data);

            // if (response.ok) {
            //     notifySuccess('Inicio de sesión exitoso');
            //     login(userType);
            // } else {
            //     notifyError(data.message || 'Usuario o contraseña incorrectos');
            // }
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
                            required
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
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Tipo de Usuario</label>
                        <div className="radio-group">
                            {[ 'Empleado', 'Supervisor', 'Usuario'].map((type) => (
                                <label  key={type} style={{ marginRight: '10px' }}>
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

                    <button type="submit" className="input-button">
                        <b>Login</b>
                    </button>
                </form>
                
                <div className="welcome-back">
                    <div className="message">
                        <h2>Bienvenido de nuevo</h2>
                        <p>Si aún no tienes una cuenta, por favor regístrate aquí</p>
                        <button className="input-button">Registrarse</button>
                    </div>
                </div>
                <ToastContainer position="bottom-right" autoClose={3000} pauseOnHover theme="colored" />
            </div>
        </div>
    );
}

export default LoginPage;
