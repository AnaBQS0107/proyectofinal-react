import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import '../css/ObtenerProductos.css';
import { obtenerProductos as fetchProductosFromAPI } from '../api/obtenerProductos.api';

function MostrarProductos() {  // Cambié el nombre de la función a MostrarProductos
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const productosData = await fetchProductosFromAPI();  // Llamo a la función importada
                setProductos(productosData);
            } catch (error) {
                console.error('Error al cargar productos:', error);
            }
        };

        fetchProductos();
    }, []);
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const productosData = await fetchProductosFromAPI();  // Llamo a la función importada
                console.log(productosData);  // Agrega esto para ver los datos en consola
                setProductos(productosData);
            } catch (error) {
                console.error('Error al cargar productos:', error);
            }
        };
    
        fetchProductos();
    }, []);
    const agregarAlCarrito = (producto) => {
        setCarrito([...carrito, producto]);
        alert(`${producto.Nombre} se agregó al carrito`);
    };

    return (
        <div className="productos-container">
            <h2>Productos Disponibles</h2>
            <div className="productos-list">
                {productos.map((producto) => (
                    <div key={producto.idProducto} className="producto-item">
                        <h3>{producto.Nombre}</h3>
                        <p>Precio: {producto.Precio} colones</p>
                        <Button label="Agregar al Carrito" onClick={() => agregarAlCarrito(producto)} className="p-button-success" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MostrarProductos;
