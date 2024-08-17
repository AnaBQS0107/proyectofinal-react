import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { obtenerProductoPorId } from '../api/producto.api';  // Importa obtenerProductoPorId desde la API de productos
import { agregarProductoACarrito } from '../api/ordenes.api';  // Asegúrate de importar el método correcto.
import '../css/DetalleProducto.css';

function DetalleProducto() {
    const { ProductoID } = useParams();
    const [producto, setProducto] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchProducto = async () => {
            console.log("ProductoID:", ProductoID);
            if (!ProductoID) {
                console.error("ProductoID no está definido");
                return;
            }
            try {
                const productoData = await obtenerProductoPorId(ProductoID);
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
    }, [ProductoID]);

    const obtenerClienteId = () => {
        const ClientesID = localStorage.getItem('ClientesID');
        if (!ClientesID) {
            console.warn('No se encontró clienteId en localStorage. Redireccionando a login.');
            navigate('/login');
            return null;
        }
        return ClientesID;
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
            const ClientesID = obtenerClienteId();
            if (!ClientesID) return;

            await agregarProductoACarrito(ClientesID, producto.ProductoID, cantidad);
            alert(`${producto.Nombre} se agregó al carrito con una cantidad de ${cantidad}`);
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
            <Button label="Agregar al Carrito" onClick={manejarAgregarAlCarrito} className="p-button-detalleC" />
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
