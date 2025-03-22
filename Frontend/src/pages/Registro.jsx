import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './login.css';

const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");

  const navigate = useNavigate();

 
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName, age })
      });

      if (response.ok) {
        window.alert("Registro exitoso"); 
        navigate('/'); 
      } else {
        window.alert("Error en el registro"); 
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
          <h2 className="create-account">Crear cuenta</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="input-label">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
            />
            
            <label htmlFor="password" className="input-label">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
            />
            
            <label htmlFor="fullName" className="input-label">Nombre completo</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nombre completo"
            />
            
            <label htmlFor="age" className="input-label">Edad</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Edad"
            />

            <input
              type="submit"
              value="Registrar"
              className="input-button"
            />
            
          </form>
          <button className="input-button" onClick={() => navigate('/')}>
              Ya tengo una cuenta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registro;
