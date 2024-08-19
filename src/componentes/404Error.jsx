import React from 'react';
import { Button } from 'primereact/button';
import '../css/404.styles.css';
import errorImage from '../img/404.png'; 
const ErrorPage = () => {
  return (
    <div className="error-container">
    
      <img src={errorImage} alt="404 Error" className="error-image" />
      <h2>Oops! No pudimos encontrar la página que buscas</h2>
      <Button label="Volver al inicio" className="p-button-outlined" onClick={() => window.location.href = '/'} />
    </div>
  );
};

export default ErrorPage;