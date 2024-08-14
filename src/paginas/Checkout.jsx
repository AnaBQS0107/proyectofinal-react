import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerOrdenesCheckout } from '../api/ordenes.api'; // Importa la función para obtener órdenes en Checkout
import { Button } from 'primereact/button';
import '../css/Checkout.css'; // Asegúrate de crear un archivo CSS para estilos

const Checkout = () => {
    const [orden, setOrden] = useState(null);
    const navigate = useNavigate();
    const ClientesID = localStorage.getItem('ClientesID');

    useEffect(() => {
        const fetchOrdenCheckout = async () => {
            try {
                const ordenData = await obtenerOrdenesCheckout(ClientesID);
                setOrden(ordenData);
            } catch (error) {
                console.error('Error al cargar la orden en checkout:', error);
            }
        };

        if (ClientesID) {
            fetchOrdenCheckout();
        } else {
            navigate('/login'); // Redirige a login si no hay clienteID
        }
    }, [ClientesID, navigate]);

    if (!orden) {
        return <div>Cargando la orden...</div>;
    }

    return (
        <div className="checkout-container">
            <h2>Resumen de tu Orden</h2>
            <ul className="orden-list">
                {orden.map((item, index) => (
                    <li key={index} className="orden-item">
                        <img 
                            src={`http://localhost:4001/uploads/${item.Imagen}`} 
                            alt={item.NombreProducto} 
                            style={{ width: '100px', marginRight: '10px' }} 
                        />
                        <div>
                            {item.NombreProducto} - Cantidad: {item.Cantidad} - Precio: {formatCurrency(item.Precio)}
                        </div>
                    </li>
                ))}
            </ul>

            <div className="checkout-summary">
                <p>Subtotal: {formatCurrency(calcularSubtotal(orden))}</p>
                <p>IVA (13%): {formatCurrency(calcularIVA(calcularSubtotal(orden)))}</p>
                <h3>Total a pagar: {formatCurrency(calcularTotalConIVA(calcularSubtotal(orden), calcularIVA(calcularSubtotal(orden))))}</h3>
            </div>

            <Button label="Confirmar Pago" icon="pi pi-credit-card" className="p-button-success" onClick={() => alert('Pago confirmado!')} />
        </div>
    );
};

// Funciones de cálculo reutilizadas
const calcularSubtotal = (orden) => {
    return orden.reduce((acc, item) => acc + item.Cantidad * item.Precio, 0);
};

const calcularIVA = (subtotal) => {
    return subtotal * 0.13;
};

const calcularTotalConIVA = (subtotal, iva) => {
    return subtotal + iva;
};

const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CR', {
        style: 'currency',
        currency: 'CRC'
    }).format(value);
};

export default Checkout;
