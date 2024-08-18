import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    obtenerOrdenesCheckout, 
    cambiarEstadoAEnProceso, 
    eliminarOrdenCompleta, 
    cambiarEstadoACompletada 
} from '../api/ordenes.api';
import { Button } from 'primereact/button';
import { guardarTransaccion } from '../api/transaccionPago.api';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import '../css/Checkout.css'; // Asegúrate de tener CSS para los estilos

const Checkout = () => {
    const [orden, setOrden] = useState(null);
    const [pagoCompletado, setPagoCompletado] = useState(false);
    const navigate = useNavigate();
    const ClientesID = localStorage.getItem('ClientesID');

    const tasaCambio = 500; // Definir la tasa de cambio fija: 1 USD = 500 CRC

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
            navigate('/login'); // Redirigir a login si no hay ClientesID
        }
    }, [ClientesID, navigate]);

    const convertirColonesADolares = (montoCRC) => {
        return montoCRC / tasaCambio; // Convertir el monto de colones a dólares
    };

    const handleModificarOrden = async () => {
        if (orden && orden.length > 0) {
            try {
                await cambiarEstadoAEnProceso(orden[0].OrdenClienteID); // Cambiar el estado a "En Proceso"
                navigate('/carrito'); // Redirigir a la página del carrito
            } catch (error) {
                console.error('Error al cambiar la orden a En Proceso:', error);
            }
        }
    };

    const handleCancelarOrden = async () => {
        if (orden && orden.length > 0) {
            try {
                await eliminarOrdenCompleta(orden[0].OrdenClienteID); // Eliminar la orden
                navigate('/productos'); // Redirigir a la página de productos o la página de inicio
            } catch (error) {
                console.error('Error al eliminar la orden:', error);
            }
        }
    };

    const handleConfirmarPago = async (detalleTransaccion) => {
        if (orden && orden.length > 0) {
            try {
                const transaccionData = {
                    ClientesID: clienteInfo.ClientesID || ClientesID,  // Verificar que ClientesID no sea nulo
                    OrdenID: orden[0].OrdenClienteID,
                    TransaccionPayPalID: detalleTransaccion.id,
                    Monto: detalleTransaccion.purchase_units[0].amount.value,
                    Moneda: detalleTransaccion.purchase_units[0].amount.currency_code,
                    EstadoTransaccion: detalleTransaccion.status,
                    MetodoPago: 'PayPal',
                    PayerID: detalleTransaccion.payer.payer_id,
                    CorreoPagador: detalleTransaccion.payer.email_address,
                    Mensaje: detalleTransaccion.purchase_units[0].description || 'Sin descripción'  // Asegúrate de que Mensaje no sea nulo
                };
    
                await guardarTransaccion(transaccionData); // Guardar la transacción en la base de datos
                await cambiarEstadoACompletada(orden[0].OrdenClienteID); // Cambiar el estado de la orden a completada
                setPagoCompletado(true);
                navigate('/ordenes'); // Redirigir a la página de órdenes
            } catch (error) {
                console.error('Error al completar la orden:', error);
                // Manejar los errores, por ejemplo, mostrar una notificación
            }
        }
    };
    

    if (!orden) {
        return <div>Cargando la orden...</div>;
    }

    // Extraer la primera entrada para obtener la información del cliente
    const clienteInfo = orden.length > 0 ? orden[0] : {};

    const montoEnDolares = convertirColonesADolares(calcularTotalConIVA(calcularSubtotal(orden), calcularIVA(calcularSubtotal(orden))));

    return (
        <PayPalScriptProvider options={{ "client-id": "AbSktME0vnGzzPFiL3sgZyE1Xr812DjU3dfqPCVWE3OAmBuoIzZmKYJxdBKgSTawzqrsmJYEN-QQrQR0" }}>
            <div className="checkout-container">
                <h2>Resumen de tu Orden</h2>

                {/* Sección para mostrar la dirección y el teléfono del cliente */}
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
                    {!pagoCompletado && (
                        <PayPalButtons
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [{
                                        amount: {
                                            value: montoEnDolares.toFixed(2), // Convertir a dólares y redondear a 2 decimales
                                        },
                                    }],
                                });
                            }}
                            onApprove={(data, actions) => {
                                return actions.order.capture().then((details) => {
                                    alert("Transacción completada por " + details.payer.name.given_name);
                                    handleConfirmarPago(details); // Llamar a la función para guardar la transacción y completar la orden
                                });
                            }}
                            onError={(err) => {
                                console.error('Error en la transacción:', err);
                                // Mostrar un mensaje de error al usuario
                            }}
                        />
                    )}
                    {pagoCompletado && (
                        <p>Pago completado exitosamente. Redirigiendo...</p>
                    )}
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
        </PayPalScriptProvider>
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
