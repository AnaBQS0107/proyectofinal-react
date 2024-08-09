import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import '../css/SingUpForm.styles.css';
import backgroundImage from '../img/image.png'; // Asegúrate de que la ruta sea correcta

function SignUpForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', { username, email, password });
  };

  return (
    <div className="sign-up-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="form-overlay">
        <div className="form-card">
          <h2>Inicio de Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="p-field">
              <span className="p-input-icon-left">
               
                <InputText
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Cédula"
                />
              </span>
            </div>
         
            <div className="p-field">
              <span className="p-input-icon-left">
              
                <InputText
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                />
              </span>
            </div>
            <Button type="submit" label="Iniciar Sesión" className="p-button-rounded" />
          </form>
          <p className="mt-3">¿No tienes cuenta? Crea una</p>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;