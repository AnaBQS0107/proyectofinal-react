import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import '../css/HomePage.styles.css';    

const ExklusivPage = () => {
  return (
    <div>
      <div className="hero">
      </div>
      <div className="mission-vision">
        <div className="mission">
          <i className="pi pi-fw pi-eye"></i>
          <h2>Misión</h2>
          <p-info>
            Ser un proveedor de confianza para los clientes, brindando productos de calidad.
          </p-info>
        </div>
        <div className="vision">
          <i className="pi pi-fw pi-chart-line"></i>
          <h2>Visión</h2>
          <p-info>
            Ser la empresa distribuidora de productos N°1 en el territorio costarricense.
          </p-info>
        </div>
      </div>
      <div className="info-section">
        <div className="info-item">
          <i className="pi pi-fw pi-shopping-bag"></i> 
          <h3>Tienda Principal</h3>
          <p-info>Ubicada en Calle Principal, San José, Costa Rica</p-info>
        </div>
        <div className="info-item">
          <i className="pi pi-fw pi-phone"></i> 
          <h3>Contacto</h3>
          <p-info>Número telefonico: +506 1234 5678</p-info>

        </div>
      </div>
    </div>
  );
};

export default ExklusivPage;
