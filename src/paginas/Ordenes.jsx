import React, { useState, useEffect } from 'react';
import { obtenerOrdenesCompletadas } from '../api/ordenes.api';
import { Button } from 'primereact/button';
import '../css/Ordenes.css';

const Ordenes = () => {
    const [ordenesCompletadas, setOrdenesCompletadas] = useState([]);
    const clienteId = localStorage.getItem('clienteId') || '';

    useEffect(() => {
        const fetchOrdenesCompletadas = async () => {
            try {
                const ordenesData = await obtenerOrdenesCompletadas(clienteId);
                setOrdenesCompletadas(ordenesData);
            } catch (error) {
                console.error('Error al obtener las órdenes completadas:', error);
            }
        };

        if (clienteId) {
            fetchOrdenesCompletadas();
        }
    }, [clienteId]);

    return (
        <div className="ordenes-container">
            <h1>Órdenes Completadas</h1>
            {ordenesCompletadas.length === 0 ? (
                <div>No tienes órdenes completadas.</div>
            ) : (
                <ul>
                    {ordenesCompletadas.map((orden) => (
                        <li key={orden.idOrdenCliente}>
                            Orden ID: {orden.idOrdenCliente} - Fecha: {new Date(orden.Fecha).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Ordenes;
