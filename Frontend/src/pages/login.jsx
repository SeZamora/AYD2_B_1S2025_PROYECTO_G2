import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import useAuth from '../hook/useAuth';
import './login.css';

const LoginPage = () => {
    
    const  { login } = useAuth();
    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {

        e.preventDefault();
       
        if(username==="Admin" || password==="Admin"){
            console.log(username);
            login('Admin');

            
        }else if(username==="User" || password==="User"){
            console.log(username);
            login('User');
        }else if (username==="Empleado" || password==="Empleado"){
            console.log(username);
            login('Empleado');
            

        }else if (username==="Supervisor" || password==="Supervisor"){
            
            console.log(username);
            login('Supervisor');
        }else{
            notifyError('Usuario o contraseña incorrectos');
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
                            
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                            
                        />
                    </div>

                    <button type="submit" className="input-button">
                        <b>Login
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                <path fill="currentColor" fillRule="evenodd" d="M3.5 9.568v4.864c0 2.294 0 3.44.722 4.153c.655.647 1.674.706 3.596.712l-.015-.105c-.115-.844-.115-1.916-.115-3.247v-.053c0-.403.331-.73.74-.73c.408 0 .739.327.739.73c0 1.396.001 2.37.101 3.105c.098.714.275 1.093.548 1.362s.656.445 1.379.54c.744.1 1.731.101 3.146.101h.985c1.415 0 2.401-.002 3.146-.1c.723-.096 1.106-.272 1.378-.541c.273-.27.451-.648.548-1.362c.1-.734.102-1.709.102-3.105V8.108c0-1.397-.002-2.37-.102-3.105c-.097-.714-.275-1.093-.547-1.362c-.273-.27-.656-.445-1.38-.54C17.728 3 16.742 3 15.327 3h-.985c-1.415 0-2.402.002-3.146.1c-.723.096-1.106.272-1.379.541c-.273.27-.45.648-.548 1.362c-.1.734-.101 1.708-.101 3.105c0 .403-.331.73-.74.73a.734.734 0 0 1-.739-.73v-.053c0-1.33 0-2.403.115-3.247l.015-.105c-1.922.006-2.94.065-3.596.712c-.722.713-.722 1.86-.722 4.153m9.885 5.38l2.464-2.432a.723.723 0 0 0 0-1.032l-2.464-2.432a.746.746 0 0 0-1.045 0a.723.723 0 0 0 0 1.032l1.202 1.186H6.457a.734.734 0 0 0-.74.73c0 .403.331.73.74.73h7.085l-1.202 1.186a.723.723 0 0 0 0 1.032a.746.746 0 0 0 1.045 0" clipRule="evenodd" />
                            </svg>
                        </b>
                    </button>
                </form>

                <div className="welcome-back">
                    <div className="message">
                        <h2>Bienvenido de nuevo</h2>
                        <p>Si aún no tienes una cuenta, por favor regístrate aquí</p>
                        <button className="input-button"  >Registrarse</button>
                    </div>
                </div>
                <ToastContainer position="bottom-right" autoClose={3000} pauseOnHover theme="colored" />

            </div>
        </div>

    );
}

export default LoginPage;
