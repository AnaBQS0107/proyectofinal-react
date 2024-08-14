import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import '../css/CustomModal.css'; // Asegúrate de que esta ruta sea correcta

const CustomModal = ({ isVisible, onClose, product }) => {
    const obtenerRutaImagen = (imagen) => `http://localhost:4001/uploads/${imagen}`;

    const formatCurrency = (value) => new Intl.NumberFormat('es-CR', {
        style: 'currency',
        currency: 'CRC'
    }).format(value);

    const renderProductDetails = () => {
        if (!product) return null;

        return (
            <div className="product-details">
                <h2>{product.Nombre}</h2>
                <p><strong>Código:</strong> {product.idProducto}</p>
                <p><strong>Cantidad en inventario:</strong> {product.Stock}</p>
                <p><strong>Costo del producto:</strong> {formatCurrency(product.Precio)}</p>
                <p><strong>Costo con IVA:</strong> {formatCurrency(product.PrecioIVA)}</p>
                <p><strong>Ubicación en la bodega:</strong> Estante {product.CatalogoEstantes_idCatalogoEstantes}</p>
                <img src={obtenerRutaImagen(product.Imagen)} alt={product.Nombre} className="product-image" />
            </div>
        );
    };

    return (
        <Dialog header="Detalles del Producto" visible={isVisible} onHide={onClose} modal className="custom-modal">
            {renderProductDetails()}
            <div className="p-dialog-footer">
                <Button label="Cerrar" icon="pi pi-times" onClick={onClose} className="p-button-danger" />
            </div>
        </Dialog>
    );
};

export default CustomModal;
