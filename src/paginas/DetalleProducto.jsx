import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { obtenerProductoPorId } from '../api/producto.api'; // Asegúrate de que el nombre del archivo y la ruta coincidan
import '../css/DetalleProducto.css';
import { crearOrden, agregarProductoACarrito } from '../api/ordenes.api';

function DetalleProducto() {
    const { idProducto } = useParams();  // Obtén el ID del producto desde la URL
    const [producto, setProducto] = useState(null);
    const [cantidad, setCantidad] = useState(1);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const productoData = await obtenerProductoPorId(idProducto);  // Llama a la API para obtener el producto por ID
                console.log("Datos del producto:", productoData); // Para depuración
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
        return localStorage.getItem('clienteId') || null;  // Reemplaza esto según tu lógica de autenticación
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
            const clienteId = obtenerClienteId(); // Obtén el ID del cliente
            let idOrdenCliente = localStorage.getItem('idOrdenCliente');

            if (!idOrdenCliente) {
                idOrdenCliente = await crearOrden(clienteId);
                localStorage.setItem('idOrdenCliente', idOrdenCliente);
            }

            await agregarProductoACarrito(idOrdenCliente, producto.idProducto, cantidad);
            alert(`${producto.Nombre} se agregó al carrito con una cantidad de ${cantidad}`);
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
        }
    };

    if (!producto) {
        return <div>Cargando...</div>;
    }

    const obtenerRutaImagen = (imagen) => {
        // Asegúrate de que la ruta de la imagen sea la correcta
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
