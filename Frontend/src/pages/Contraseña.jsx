import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './login.css';

const RecuperarContrasena = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); 


  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const response = await fetch('http://localhost:3000/auth/recoverPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        window.alert("Correo de recuperación enviado"); 
        navigate('/');
      } else {
        window.alert("Error al enviar el correo de recuperación"); 
      }

    } catch (error) {
      console.error('Error en la conexión con el servidor', error);
      window.alert("Error en la conexión con el servidor"); 
    }
  };

  return (
    <div className="login-page">
      <div className="container-form">
        <div className="formulario">
          <h2 className="create-account">Recuperar contraseña</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="input-label">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
            />

            <input
              type="submit"
              value="Recuperar Contraseña"
              className="input-button"
            />
            
          </form>
          <button className="input-button" onClick={() => navigate('/login')}>
              Volver al inicio de sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecuperarContrasena;
