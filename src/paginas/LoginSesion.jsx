import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import '../css/SingUpForm.styles.css';
import backgroundImage from '../img/image.png'; 

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', { username, password });
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
          <p className="login-footer">¿No tienes cuenta? Crea una cuenta</p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
