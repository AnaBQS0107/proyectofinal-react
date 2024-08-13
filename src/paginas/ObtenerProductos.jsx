import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog'; 
import { Button } from 'primereact/button'; // Import Dialog component from PrimeReact
import { useNavigate } from 'react-router-dom';
import '../css/ObtenerProductos.css';
import { ObtenerProductos } from '../api/producto.api';

function MostrarProductos() {
    const [productos, setProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProducto, setSelectedProducto] = useState(null);  // To store the selected product for the modal
    const [visible, setVisible] = useState(false);  // To control the visibility of the modal
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const productosData = await ObtenerProductos();
                setProductos(productosData);
            } catch (error) {
                console.error('Error al cargar productos:', error);
            }
        };

        fetchProductos();
    }, []);

    const obtenerRutaImagen = (imagen) => {
        return `http://localhost:4001/uploads/${imagen}`;
    };

    const verDetallesProducto = (producto) => {
        setSelectedProducto(producto);  // Set the selected product for the modal
        setVisible(true);  // Show the modal
    };

    const redirigirADetalles = (idProducto) => {
        navigate(`/productos/${idProducto}`);
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CR', {
            style: 'currency',
            currency: 'CRC'
        }).format(value);
    };

    const productosFiltrados = productos.filter(producto =>
        producto.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
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
                            <div 
                                key={producto.idProducto} 
                                className="producto-item"
                            >
                                <img 
                                    src={obtenerRutaImagen(producto.Imagen)} 
                                    alt={producto.Nombre} 
                                    className="producto-imagen" 
                                    onClick={() => verDetallesProducto(producto.i)}  
                                />
                                <h3>{producto.Nombre}</h3>
                                <p>Precio: {formatCurrency(producto.Precio)}</p>
                                <p>Precio con IVA: {formatCurrency(producto.PrecioIVA)}</p>
                                <p>Cantidad disponible: {producto.Stock}</p>
                                <Button 
                                    label="Ver Más Detalles" 
                                    onClick={() => redirigirADetalles(producto.idProducto)} 
                                    className="p-button-info"
                                    style={{ marginTop: '10px' }} 
                                />
                            </div>
                        ))
                    ) : (
                        <p>No hay productos disponibles.</p>
                    )}
                </div>

                {/* Modal Dialog */}
                <Dialog 
                    visible={visible} 
                    style={{ width: 'auto', maxWidth: '100vw' }}  // Allows the dialog to extend to full width
                    onHide={() => setVisible(false)} 
                    header={null} 
                    closable={true}  // Keep the close button for usability
                    className="image-dialog"  // Custom class to control the image overflow
                >
                    {selectedProducto && (
                        <div className="image-container">
                            <img 
                                src={obtenerRutaImagen(selectedProducto.Imagen)} 
                                alt={selectedProducto.Nombre} 
                                className="full-image"
                            />
                        </div>
                    )}
                </Dialog>
            </div>
        </>
    );
}

export default MostrarProductos;
