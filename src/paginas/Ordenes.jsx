// components/Ordenes.js

import React, { useState, useEffect } from 'react';
import { obtenerOrdenesCompletadas } from '../api/ordenes.api';
import '../css/Ordenes.css';

const Ordenes = () => {
    const [ordenesCompletadas, setOrdenesCompletadas] = useState([]);
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

    return (
        <div className="ordenes-container">
            <h1>Órdenes Completadas</h1>
            {ordenesCompletadas.length === 0 ? (
                <div>No tienes órdenes completadas.</div>
            ) : (
                ordenesCompletadas.map((orden) => (
                    <div key={orden.OrdenClienteID} className="orden-card">
                        <h3>Orden ID: {orden.OrdenClienteID}</h3>
                        <p>Fecha: {new Date(orden.Fecha).toLocaleDateString()}</p>
                        <p>Total: {formatCurrency(orden.Total)}</p>
                        {/* Add more details as needed */}
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
