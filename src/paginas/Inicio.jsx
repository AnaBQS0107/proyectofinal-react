import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import '../css/HomePage.css';    

const ExklusivPage = () => {
  return (
    <div>
      <div className="hero">
      </div>
      <div className="mission-vision">
        <div className="mission">
          <i className="pi pi-fw pi-eye"></i>
          <h2>Misión</h2>
          <p>
            Ser un proveedor de confianza para los clientes, brindando productos de calidad.
          </p>
        </div>
        <div className="vision">
          <i className="pi pi-fw pi-chart-line"></i>
          <h2>Visión</h2>
          <p>
            Ser la empresa distribuidora de productos N°1 en el territorio costarricense.
          </p>
        </div>
      </div>
      <div className="info-section">
        <div className="info-item">
          <i className="pi pi-fw pi-shopping-bag"></i> 
          <h3>Tienda Principal</h3>
          <p>Ubicada en Calle Principal, San José, Costa Rica</p>
        </div>
        <div className="info-item">
          <i className="pi pi-fw pi-phone"></i> 
          <h3>Contactos</h3>
          <p>Número telefonico: +506 1234 5678</p>

        </div>
      </div>
    </div>
  );
};

export default ExklusivPage;
