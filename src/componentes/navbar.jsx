import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
            icon="pi pi-box"
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
                icon="pi pi-user"
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
                          <>
                          <Button
                            label="Ordenes"
                            icon="pi pi-list"
                            onClick={() => {
                              navigate('/ordenes');
                              setVisible(false);
                            }}
                            className="p-button-text navbar-menu-item"
                            style={{ width: '100%', marginTop: '10px' }}
                          />
                        </>
              )}
              {userRole === 'empleado' && (
                <>
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
                    label="Mantenimiento Clientes"
                    icon="pi pi-pencil"
                    onClick={() => {
                      navigate('/MantenimientoC');
                      setVisible(false);
                    }}
                    className="p-button-text navbar-menu-item"
                    style={{ width: '100%', marginTop: '10px' }}
                  />
                      <Button
                    label="Mantenimiento Empleados"
                    icon="pi pi-pencil"
                    onClick={() => {
                      navigate('/MantenimientoE');
                      setVisible(false);
                    }}
                    className="p-button-text navbar-menu-item"
                    style={{ width: '100%', marginTop: '10px' }}
                  />
                  <Button
                    label="Ingresar productos"
                    icon="pi pi-box"
                    onClick={() => {
                      navigate('/RegistroP');
                      setVisible(false);
                    }}
                    className="p-button-text navbar-menu-item"
                    style={{ width: '100%', marginTop: '10px' }}
                  />
                  
                </>
                
              )}
              <Button
                label="Logout"
                icon="pi pi-power-off"
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
