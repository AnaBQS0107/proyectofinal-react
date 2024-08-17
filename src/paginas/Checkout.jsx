// components/Checkout.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    obtenerOrdenesCheckout, 
    cambiarEstadoAEnProceso, 
    eliminarOrdenCompleta, 
    cambiarEstadoACompletada 
} from '../api/ordenes.api';
import { Button } from 'primereact/button';
import '../css/Checkout.css'; // Ensure you have CSS for styles

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
            navigate('/login'); // Redirect to login if no ClientesID
        }
    }, [ClientesID, navigate]);

    const handleModificarOrden = async () => {
        if (orden && orden.length > 0) {
            try {
                await cambiarEstadoAEnProceso(orden[0].OrdenClienteID); // Change the status to "En Proceso"
                navigate('/carrito'); // Redirect to the cart page
            } catch (error) {
                console.error('Error al cambiar la orden a En Proceso:', error);
            }
        }
    };

    const handleCancelarOrden = async () => {
        if (orden && orden.length > 0) {
            try {
                await eliminarOrdenCompleta(orden[0].OrdenClienteID); // Delete the order
                navigate('/productos'); // Redirect to the home page or another appropriate page
            } catch (error) {
                console.error('Error al eliminar la orden:', error);
            }
        }
    };

    const handleConfirmarPago = async () => {
        if (orden && orden.length > 0) {
            try {
                await cambiarEstadoACompletada(orden[0].OrdenClienteID); // Mark the order as completed
                navigate('/ordenes'); // Redirect to the orders page
            } catch (error) {
                console.error('Error al completar la orden:', error);
                // Handle any errors here, like showing a notification to the user
            }
        }
    };

    if (!orden) {
        return <div>Cargando la orden...</div>;
    }

    // Extract the first item to get client info since it's the same for all items
    const clienteInfo = orden.length > 0 ? orden[0] : {};

    return (
        <div className="checkout-container">
            <h2>Resumen de tu Orden</h2>

            {/* Section to display the client's address and phone */}
            <div className="client-info">
                <p><strong>Dirección:</strong> {clienteInfo.Direccion}</p>
                <p><strong>Teléfono:</strong> {clienteInfo.Telefono}</p>
            </div>

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

            <div className="button-container">
                <Button 
                    label="Confirmar Pago" 
                    icon="pi pi-credit-card" 
                    className="p-button-confirmar" 
                    onClick={handleConfirmarPago} 
                />
                <Button 
                    label="Modificar Orden" 
                    icon="pi pi-pencil" 
                    className="p-button-modificar" 
                    onClick={handleModificarOrden} 
                    style={{ marginLeft: '10px' }}
                />
                <Button 
                    label="Cancelar Orden" 
                    icon="pi pi-times" 
                    className="p-button-cancelar" 
                    onClick={handleCancelarOrden} 
                    style={{ marginLeft: '10px' }}
                />
            </div>
        </div>
    );
};

// Reused calculation functions
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
