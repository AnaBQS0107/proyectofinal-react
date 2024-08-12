import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Button } from 'primereact/button';
import { obtenerProductoPorId } from '../api/producto.api';
import '../css/DetalleProducto.css';
import { crearOrden, agregarProductoACarrito } from '../api/ordenes.api';

function DetalleProducto() {
    const { idProducto } = useParams();
    const [producto, setProducto] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const productoData = await obtenerProductoPorId(idProducto);
                if (productoData) {
                    setProducto(productoData);
                } else {
                    console.error("El producto no se encontró o hubo un problema con la API.");
                }
            } catch (error) {
                console.error('Error al cargar el producto:', error);
            }
        };

        fetchProducto();
    }, [idProducto]);

    const obtenerClienteId = () => {
        return localStorage.getItem('clienteId') || null;
    };

    const aumentarCantidad = () => {
        if (cantidad < producto.Stock) {
            setCantidad(cantidad + 1);
        }
    };

    const disminuirCantidad = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };

    const manejarAgregarAlCarrito = async () => {
        try {
            const clienteId = obtenerClienteId();
            let idOrdenCliente = localStorage.getItem('idOrdenCliente');

            if (!idOrdenCliente) {
                idOrdenCliente = await crearOrden(clienteId);
                localStorage.setItem('idOrdenCliente', idOrdenCliente);
            }

            await agregarProductoACarrito(idOrdenCliente, producto.idProducto, cantidad);
            alert(`${producto.Nombre} se agregó al carrito con una cantidad de ${cantidad}`);
            
            // Redirect to cart page
            navigate('/carrito');
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
        }
    };

    if (!producto) {
        return <div>Cargando...</div>;
    }

    const obtenerRutaImagen = (imagen) => {
        return `http://localhost:4001/uploads/${imagen}`;
    };

    return (
        <div className="detalle-producto-container">
            <h2>{producto.Nombre}</h2>
            <img src={obtenerRutaImagen(producto.Imagen)} alt={producto.Nombre} className="detalle-producto-imagen" />
            <p>Precio: {formatCurrency(producto.Precio)}</p>
            <p>Stock disponible: {producto.Stock}</p>
            <p>{producto.Descripcion || 'Descripción no disponible'}</p>
            <div className="detalle-producto-cantidad">
                <label>Cantidad:</label>
                <div className="cantidad-control">
                    <Button icon="pi pi-minus" onClick={disminuirCantidad} className="p-button-rounded p-button-text" />
                    <input 
                        type="text" 
                        value={cantidad} 
                        readOnly 
                        className="cantidad-input" 
                    />
                    <Button icon="pi pi-plus" onClick={aumentarCantidad} className="p-button-rounded p-button-text" />
                </div>
            </div>
            <Button label="Agregar al Carrito" onClick={manejarAgregarAlCarrito} className="p-button-success" />
        </div>
    );
}

const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CR', {
        style: 'currency',
        currency: 'CRC'
    }).format(value);
};

export default DetalleProducto;
