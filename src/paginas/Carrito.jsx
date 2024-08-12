import React, { useState, useEffect } from 'react';
import { obtenerCarrito } from '../api/ordenes.api'; 

function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const idOrdenCliente = localStorage.getItem('idOrdenCliente');

  useEffect(() => {
    const fetchCarrito = async () => {
      try {
        const carritoData = await obtenerCarrito(idOrdenCliente);
        setCarrito(carritoData);
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
      }
    };

    fetchCarrito();
  }, [idOrdenCliente]);

  if (carrito.length === 0) {
    return <div>Tu carrito está vacío.</div>;
  }

  return (
    <div>
      <h2>Tu Carrito</h2>
      <ul>
        {carrito.map((item, index) => (
          <li key={index}>
            <img src={`http://localhost:4001/uploads/${item.Imagen}`} alt={item.Nombre} style={{ width: '100px', marginRight: '10px' }} />
            {item.Nombre} - Cantidad: {item.Cantidad} - Precio: {formatCurrency(item.Precio)}
          </li>
        ))}
      </ul>
    </div>
  );
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC'
  }).format(value);
};

export default Carrito;
