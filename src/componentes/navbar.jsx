import React, { useState, useEffect } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { obtenerOrdenesCheckout } from '../api/ordenes.api'; // Importar la función para obtener órdenes en checkout
import logo from '../img/LogoFooter.png';
import '../css/Navbar.css';

function Navbar() {
  const [visible, setVisible] = useState(false);
  const [hayOrdenCheckout, setHayOrdenCheckout] = useState(false); // Estado para manejar si hay una orden en checkout
  const navigate = useNavigate();
  const { userRole, isAuthenticated, logout } = useAuth();
  const ClientesID = localStorage.getItem('ClientesID');

  useEffect(() => {
    const verificarOrdenCheckout = async () => {
      if (ClientesID) {
        try {
          const ordenesCheckout = await obtenerOrdenesCheckout(ClientesID);
          setHayOrdenCheckout(ordenesCheckout.length > 0);
        } catch (error) {
          console.error('Error al verificar órdenes en checkout:', error);
        }
      }
    };

    verificarOrdenCheckout();
  }, [ClientesID]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="navbar">
      <Button
        icon="pi pi-bars"
        onClick={() => setVisible(true)}
        className="p-button-hamburguesa"
  
      />
      <img
        src={logo}
        alt="Logo"
        className="navbar-logo"
        style={{ height: '60px', marginLeft: '18px' }}
      />
      <Button
        icon="pi pi-shopping-cart"
        className="navbar-cart"
        onClick={() => {
          navigate('/carrito');
        }}
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
                <>
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
                  {hayOrdenCheckout && (
                    <Button
                      label="Checkout"
                      icon="pi pi-credit-card"
                      onClick={() => {
                        navigate('/checkout');
                        setVisible(false);
                      }}
                      className="p-button-text navbar-menu-item"
                      style={{ width: '100%', marginTop: '10px' }}
                    />
                  )}
                </>
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
