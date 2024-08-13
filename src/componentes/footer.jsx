import React from 'react';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import LogoFooter from '../img/logo.png'; 
import '../css/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="center-content">
          <img
            src={LogoFooter} 
            alt="Fashion Fusion Logo"
            className="footer-logo"
          />
          <div className="social-icons">
            <Button icon="pi pi-facebook" className="p-button-rounded p-button-text p-button-lg" />
            <Button icon="pi pi-instagram" className="p-button-rounded p-button-text p-button-lg" />
            <Button icon="pi pi-youtube" className="p-button-rounded p-button-text p-button-lg" />
            <Button icon="pi pi-pinterest" className="p-button-rounded p-button-text p-button-lg" />
            <Button icon="pi pi-linkedin" className="p-button-rounded p-button-text p-button-lg" />
          </div>
        </div>
      </div>
      <Divider className="footer-divider" />
      <div className="company-info">
        Fashion Fusion | 2024
      </div>
    </footer>
  );
};

export default Footer;
