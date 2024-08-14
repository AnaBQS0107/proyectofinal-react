import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../img/LogoFooter.png';
import '../css/Navbar.css';

function Navbar() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { userRole, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout(); 
    navigate('/'); 
  };

  return (
    <div className="navbar">
      <Button
        icon="pi pi-bars"
        onClick={() => setVisible(true)}
        className="p-button-text p-button-plain navbar-toggle"
        style={{ fontSize: '2em' }}
      />
      <img 
        src={logo} 
        alt="Logo" 
        className="navbar-logo"
        style={{ height: '60px', marginLeft: '18px' }}
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
            label="Productos"
            icon="pi pi-shopping-cart"
            onClick={() => {
              navigate('/productos');
              setVisible(false);
            }}
            className="p-button-text navbar-menu-item"
            style={{ width: '100%', marginTop: '10px' }}
          />
          {!isAuthenticated ? (
            <>
              <Button
                label="Login"
                icon="pi pi-sign-in"
                onClick={() => {
                  navigate('/login');
                  setVisible(false);
                }}
                className="p-button-text navbar-menu-item"
                style={{ width: '100%', marginTop: '10px' }}
              />
              <Button
                label="Registrarse"
                icon="pi pi-user-plus"
                onClick={() => {
                  navigate('/RegistroC');
                  setVisible(false);
                }}
                className="p-button-text navbar-menu-item"
                style={{ width: '100%', marginTop: '10px' }}
              />
            </>
          ) : (
            <>
              {userRole === 'cliente' && (
                <Button
                  label="Órdenes"
                  icon="pi pi-list"
                  onClick={() => {
                    navigate('/ordenes');
                    setVisible(false);
                  }}
                  className="p-button-text navbar-menu-item"
                  style={{ width: '100%', marginTop: '10px' }}
                />
              )}
              {userRole === 'empleado' && (
                <>
                  <Button
                    label="Registro Empleados"
                    icon="pi pi-users"
                    onClick={() => {
                      navigate('/RegistroE');
                      setVisible(false);
                    }}
                    className="p-button-text navbar-menu-item"
                    style={{ width: '100%', marginTop: '10px' }}
                  />
                         <Button
                    label="Ingresar Productos"
                    icon="pi pi-plus"
                    onClick={() => {
                      navigate('/RegistroP');
                      setVisible(false);
                    }}
                    className="p-button-text navbar-menu-item"
                    style={{ width: '100%', marginTop: '10px' }}
                  />
                 
            
                  <Button
                    label="Mantenimiento Empleados"
                    icon="pi pi-user-edit"
                    onClick={() => {
                      navigate('/MantenimientoE');
                      setVisible(false);
                    }}
                    className="p-button-text navbar-menu-item"
                    style={{ width: '100%', marginTop: '10px' }}
                  />
                   <Button
                    label="Mantenimiento Clientes"
                    icon="pi pi-user-edit"
                    onClick={() => {
                      navigate('/MantenimientoC');
                      setVisible(false);
                    }}
                    className="p-button-text navbar-menu-item"
                    style={{ width: '100%', marginTop: '10px' }}
                  />
                  <Button
                    label="Mantenimiento Productos"
                    icon="pi pi-shopping-bag"
                    onClick={() => {
                      navigate('/MantenimientoP');
                      setVisible(false);
                    }}
                    className="p-button-text navbar-menu-item"
                    style={{ width: '100%', marginTop: '10px' }}
                  />
                        <Button
                    label="Control de Inventario"
                    icon="pi pi-box"
                    onClick={() => {
                      navigate('/ControlI');
                      setVisible(false);
                    }}
                    className="p-button-text navbar-menu-item"
                    style={{ width: '100%', marginTop: '10px' }}
                  />
                </>
              )}
              <Button
                label="Logout"
                icon="pi pi-external-link"
                onClick={handleLogout}
                className="p-button-text navbar-menu-item"
                style={{ width: '100%', marginTop: '10px' }}
              />
              
            </>
          )}
        </div>
      </Sidebar>
    </div>
  );
}

export default Navbar;
