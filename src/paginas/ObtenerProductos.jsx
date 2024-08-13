import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import '../css/ObtenerProductos.css';
import { obtenerProductos as fetchProductosFromAPI } from '../api/obtenerProductos.api';

function MostrarProductos() {
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); 

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const productosData = await fetchProductosFromAPI();  
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

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CR', {
            style: 'currency',
            currency: 'CRC'
        }).format(value);
    };

    const obtenerRutaImagen = (imagen) => {
        return `http://localhost:4001/uploads/${imagen}`;
    };

 
    const productosFiltrados = productos.filter(producto =>
        producto.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <br /><br /><br /> <br /> <br />
            <div className="productos-container">
                <div className="header-section">
                    <div className="header-content">
                        <h1>Encuentra el vestido de tus sueños</h1>
                        <input
                            type="text"
                            placeholder="Buscar producto por nombre"
                            className="search-bar"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} 
                        />
                    </div>
                    <div className="header-image">
                    </div>
                </div>

                <h2>Productos Disponibles</h2>
                <div className="productos-list">
                    {productosFiltrados.length > 0 ? (
                        productosFiltrados.map((producto) => (
                            <div key={producto.idProducto} className="producto-item">
                                <img src={obtenerRutaImagen(producto.Imagen)} alt={producto.Nombre} className="producto-imagen" />
                                <h3>{producto.Nombre}</h3>
                                <p>Precio: {formatCurrency(producto.Precio)}</p>
                                <p>Precio con IVA: {formatCurrency(producto.PrecioIVA)}</p>
                                <p>Cantidad disponible: {producto.Stock}</p>
                                <Button label="Agregar al Carrito" onClick={() => agregarAlCarrito(producto)} className="p-button-carrito" />
                            </div>
                        ))
                    ) : (
                        <p>No hay productos disponibles.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default MostrarProductos;
