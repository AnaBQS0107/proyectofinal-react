import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerCarrito } from '../api/ordenes.api';
import { Button } from 'primereact/button';
import '../css/Carrito.css';

const Carrito = () => {
    const [carrito, setCarrito] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const clienteId = localStorage.getItem('ClienteId');

    useEffect(() => {
        if (clienteId) {
            const fetchCarrito = async () => {
                try {
                    const carritoData = await obtenerCarrito(clienteId);
                    setCarrito(carritoData);
                    setLoading(false);
                } catch (error) {
                    console.error('Error al cargar el carrito:', error);
                    setLoading(false);
                }
            };

            fetchCarrito();
        } else {
            setLoading(false);
        }
    }, [clienteId]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="carrito-container">
            <h2>Tu Carrito</h2>
            {!clienteId ? (
                <div>Por favor, inicia sesión para ver tu carrito.</div>
            ) : (
                <>
                    {carrito.length === 0 ? (
                        <div>Tu carrito está vacío.</div>
                    ) : (
                        <>
                            <ul className="carrito-list">
                                {carrito.map((item, index) => (
                                    <li key={index} className="carrito-item">
                                        <img src={`http://localhost:4001/uploads/${item.Imagen}`} alt={item.Nombre} style={{ width: '100px', marginRight: '10px' }} />
                                        {item.Nombre} - Cantidad: {item.Cantidad} - Precio: {formatCurrency(item.Precio)}
                                    </li>
                                ))}
                            </ul>
                            <Button label="Proceder al Checkout" icon="pi pi-check" className="p-button-success" onClick={() => navigate('/checkout')} />
                        </>
                    )}
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
