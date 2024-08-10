import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useAuth } from '../context/AuthContext.js'; 
import { inicioSesion } from '../api/login.api.js'; 
import backgroundImage from '../img/image.png'; 
import { useNavigate } from 'react-router-dom';
import '../css/SingUpForm.styles.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos enviados:', { username, password });

    try {
      const response = await inicioSesion(username, password);
      console.log('Respuesta del login:', response);

      if (response.data && (response.data.rol === 'cliente' || response.data.rol === 'empleado')) {
        login(response.data.rol);
        navigate('/'); 
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
      console.error('Error en el login:', err);
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="login-overlay">
        <div className="login-card">
          <h2>Inicio de Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="p-1">
              <span className="p-input-icon-left">
                <InputText
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nombre de Usuario"
                  className="login-input"
                />
              </span>
            </div>
            <div className="p-1">
              <span className="p-input-icon-left">
                <InputText
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  className="login-input"
                />
              </span>
            </div>
            <Button type="submit" label="Iniciar Sesión" className="login-button" />
          </form>
          {error && <p className="login-error">{error}</p>} 
          <p className="login-footer">¿No tienes cuenta? Crea una cuenta</p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
