import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import '../css/Navbar.css'; 

function Navbar() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <Button
        icon="pi pi-bars"
        onClick={() => setVisible(true)}
        className="p-button-text p-button-plain navbar-toggle"
        style={{ fontSize: '2em' }}
      />

      <Sidebar visible={visible} onHide={() => setVisible(false)} className="navbar-sidebar">
        <div className="navbar-menu">
          <Button
            label="Inicio"
            icon="pi pi-home"
            onClick={() => {
              navigate('/');
              setVisible(false);
            }}
            className="p-button-text navbar-menu-item" 
            style={{ width: '100%' }}
          />
          <Button
            label="Login"
            icon="pi pi-user"
            onClick={() => {
              navigate('/login');
              setVisible(false);
            }}
            className="p-button-text navbar-menu-item" 
            style={{ width: '100%', marginTop: '10px' }}
          />
          <Button
            label="Registro de Clientes"
            icon="pi pi-user"
            onClick={() => {
              navigate('/RegistroC');
              setVisible(false);
            }}
            className="p-button-text navbar-menu-item" 
            style={{ width: '100%', marginTop: '10px' }}
          />
          <Button
            label="Registro de Empleados"
            icon="pi pi-users"
            onClick={() => {
              navigate('/RegistroE');
              setVisible(false);
            }}
            className="p-button-text navbar-menu-item" 
            style={{ width: '100%', marginTop: '10px' }}
          />
          <Button
            label="Registro de Productos"
            icon="pi pi-box"
            onClick={() => {
              navigate('/RegistroP');
              setVisible(false);
            }}
            className="p-button-text navbar-menu-item" 
            style={{ width: '100%', marginTop: '10px' }}
          />
        </div>
      </Sidebar>
    </div>
  );
}

export default Navbar;