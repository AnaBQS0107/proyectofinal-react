import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerOrdenesEnProceso, eliminarDetalleOrden, actualizarCantidadProducto } from '../api/ordenes.api'; 
import { Button } from 'primereact/button';
import { cambiarEstadoACheckout } from '../api/ordenes.api'; // Importa la función de la API

import '../css/Carrito.css';

const Carrito = () => {
    const [carrito, setCarrito] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const ClientesID = localStorage.getItem('ClientesID');

    useEffect(() => {
        if (ClientesID) {
            const fetchCarrito = async () => {
                try {
                    const carritoData = await obtenerOrdenesEnProceso(ClientesID);
                    setCarrito(carritoData);
                    setLoading(false);
                } catch (error) {
                    console.error('Error al cargar el carrito:', error);
                    setLoading(false);
                }
            };

            fetchCarrito();
        } else {
            console.warn('No se encontró ClientesID en localStorage.');
            setLoading(false);
        }
    }, [ClientesID]);

    const handleEliminarProducto = async (OrdenClienteID, ProductoID) => {
        try {
            await eliminarDetalleOrden(OrdenClienteID, ProductoID);
            setCarrito(carrito.filter(item => item.ProductoID !== ProductoID));
        } catch (error) {
            console.error('Error al eliminar el producto del carrito:', error);
        }
    };
    const calcularSubtotal = () => {
      return carrito.reduce((acc, item) => acc + item.Cantidad * item.Precio, 0);
  };
  
  const calcularIVA = (subtotal) => {
      return subtotal * 0.13; // 13% de IVA
  };
  
  const calcularTotalConIVA = (subtotal, iva) => {
      return subtotal + iva;
  };
  const handleCheckout = async () => {
    try {
        // Suponiendo que todas las órdenes en el carrito tienen el mismo OrdenClienteID
        const OrdenClienteID = carrito[0].OrdenClienteID;

        // Cambiar el estado de la orden a "Checkout"
        await cambiarEstadoACheckout(OrdenClienteID);
        console.log(OrdenClienteID);

        // Redirigir a la página de pago
        navigate('/checkout');
    } catch (error) {
        console.error('Error al proceder al pago:', error);
    }
};
    const handleActualizarCantidad = async (OrdenClienteID, ProductoID, nuevaCantidad) => {
        if (nuevaCantidad < 1) return; // No permitir cantidades menores a 1
        try {
            await actualizarCantidadProducto(OrdenClienteID, ProductoID, nuevaCantidad);
            setCarrito(carrito.map(item =>
                item.ProductoID === ProductoID ? { ...item, Cantidad: nuevaCantidad } : item
            ));
        } catch (error) {
            console.error('Error al actualizar la cantidad del producto:', error);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!ClientesID) {
        return <div>Por favor, inicia sesión para ver tu carrito.</div>;
    }

    return (
      <div className="carrito-container">
          <h2>Tu Carrito</h2>
          {carrito.length === 0 ? (
              <div>Tu carrito está vacío.</div>
          ) : (
              <>
                  <ul className="carrito-list">
                      {carrito.map((item, index) => (
                          <li key={index} className="carrito-item">
                              <img 
                                  src={`http://localhost:4001/uploads/${item.Imagen}`} 
                                  alt={item.NombreProducto} 
                                  style={{ width: '100px', marginRight: '10px' }} 
                              />
                              <div className="carrito-item-details">
                                  {item.NombreProducto} - Precio: {formatCurrency(item.Precio)}
                                  <div className="cantidad-control">
                                      <Button 
                                          icon="pi pi-minus" 
                                          className="p-button-rounded p-button-text" 
                                          onClick={() => handleActualizarCantidad(item.OrdenClienteID, item.ProductoID, item.Cantidad - 1)} 
                                      />
                                      <span>{item.Cantidad}</span>
                                      <Button 
                                          icon="pi pi-plus" 
                                          className="p-button-rounded p-button-text" 
                                          onClick={() => handleActualizarCantidad(item.OrdenClienteID, item.ProductoID, item.Cantidad + 1)} 
                                      />
                                  </div>
                                  <Button 
                                      icon="pi pi-times" 
                                      className="p-button-danger p-button-rounded p-button-text" 
                                      onClick={() => handleEliminarProducto(item.OrdenClienteID, item.ProductoID)} 
                                  />
                              </div>
                          </li>
                      ))}
                  </ul>
  
                  {/* Sección de Subtotal, IVA y Total */}
                  <div className="carrito-summary">
                      <p>Subtotal: {formatCurrency(calcularSubtotal())}</p>
                      <p>IVA (13%): {formatCurrency(calcularIVA(calcularSubtotal()))}</p>
                      <h3>Total: {formatCurrency(calcularTotalConIVA(calcularSubtotal(), calcularIVA(calcularSubtotal())))}</h3>
                  </div>
  
                  <Button label="Proceder al pago" icon="pi pi-check" className="p-button-success" onClick={handleCheckout} />

              </>
          )}
      </div>
  );
  
};

const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CR', {
        style: 'currency',
        currency: 'CRC'
    }).format(value);
};

export default Carrito;
