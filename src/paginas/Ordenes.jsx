import React, { useState, useEffect } from 'react';
import { obtenerOrdenesCompletadas } from '../api/ordenes.api';
import { Button } from 'primereact/button';

import '../css/Ordenes.css';

const Ordenes = () => {
    const [ordenesCompletadas, setOrdenesCompletadas] = useState([]);
    const [ordenesDesplegadas, setOrdenesDesplegadas] = useState({});
    const ClientesID = localStorage.getItem('ClientesID');

    useEffect(() => {
        const fetchOrdenesCompletadas = async () => {
            try {
                const ordenesData = await obtenerOrdenesCompletadas(ClientesID);
                setOrdenesCompletadas(ordenesData);
            } catch (error) {
                console.error('Error al obtener las órdenes completadas:', error);
            }
        };

        if (ClientesID) {
            fetchOrdenesCompletadas();
        }
    }, [ClientesID]);

    const toggleDetalleOrden = (ordenId) => {
        setOrdenesDesplegadas(prevState => ({
            ...prevState,
            [ordenId]: !prevState[ordenId]
        }));
    };

    return (
        <div className="ordenes-container">
            <h1 class="h1-Ordenes">Órdenes Completadas</h1>
            {ordenesCompletadas.length === 0 ? (
                <div>No tienes órdenes completadas.</div>
            ) : (
                ordenesCompletadas.map((orden) => (
                    <div key={orden.OrdenClienteID} className="orden-card">
                        <h3>Orden ID: {orden.OrdenClienteID}</h3>
                        <p>Cliente: {orden.NombreCliente}</p>
                        <p>Fecha: {new Date(orden.Fecha).toLocaleDateString()}</p>
                        <p>Total: {formatCurrency(orden.TotalOrden)}</p>
                        <Button 
                            label={ordenesDesplegadas[orden.OrdenClienteID] ? "Ocultar Productos" : "Mostrar Productos"} 
                            onClick={() => toggleDetalleOrden(orden.OrdenClienteID)} 
                            className="p-button-text"
                        />
                        {ordenesDesplegadas[orden.OrdenClienteID] && (
                            <ul className="detalle-orden">
                                <li>
                                    <img src={`http://localhost:4001/uploads/${orden.Imagen}`} alt={orden.NombreProducto} style={{ width: '100px', marginRight: '10px' }} />
                                    {orden.NombreProducto} - Cantidad: {orden.Cantidad} - Subtotal: {formatCurrency(orden.Subtotal)}
                                </li>
                            </ul>
                        )}
                    </div>
                ))
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

export default Ordenes;
