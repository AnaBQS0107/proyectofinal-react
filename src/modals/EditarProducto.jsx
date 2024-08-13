import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { actualizarProducto } from '../api/producto.api';
import '../css/modalProductos.styles.css'

const EditarProducto = ({ product, visible, onHide, onUpdate }) => {
    const [producto, setProducto] = useState({});

    useEffect(() => {
        if (product) {
            setProducto(product);
        }
    }, [product]);

    const guardarCambios = async () => {
        try {
            const { idProducto, Nombre, Imagen, Stock, Precio, PrecioIVA, CatalogoEstantes_idCatalogoEstantes } = producto;

            if (!Nombre || !Stock || !Precio || !PrecioIVA || !CatalogoEstantes_idCatalogoEstantes) {
                window.toast.show({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor complete todos los campos.' });
                return;
            }

            await actualizarProducto(idProducto, { Nombre, Imagen, Stock, Precio, PrecioIVA, CatalogoEstantes_idCatalogoEstantes });
            window.toast.show({ severity: 'success', summary: 'Éxito', detail: 'Producto actualizado con éxito.' });
            onUpdate();
            onHide();
        } catch (error) {
            window.toast.show({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el producto.' });
            console.error('Error al actualizar el producto:', error);
        }
    };

    return (
        <Dialog header="Editar Producto" visible={visible} className="editar-producto-dialog" modal onHide={onHide}>
            {producto ? (
                <div className="editar-producto-content">
                    <div className="editar-producto-field">
                        <label htmlFor="nombre" className="editar-producto-label">Nombre</label>
                        <InputText
                            id="nombre"
                            className="editar-producto-input"
                            value={producto.Nombre || ''}
                            onChange={(e) => setProducto({ ...producto, Nombre: e.target.value })}
                        />
                    </div>
                    <div className="editar-producto-field">
                        <label htmlFor="imagen" className="editar-producto-label">Imagen URL</label>
                        <InputText
                            id="imagen"
                            className="editar-producto-input"
                            value={producto.Imagen || ''}
                            onChange={(e) => setProducto({ ...producto, Imagen: e.target.value })}
                        />
                    </div>
                    <div className="editar-producto-field">
                        <label htmlFor="stock" className="editar-producto-label">Stock</label>
                        <InputText
                            id="stock"
                            className="editar-producto-input"
                            type="number"
                            value={producto.Stock || ''}
                            onChange={(e) => setProducto({ ...producto, Stock: e.target.value })}
                        />
                    </div>
                    <div className="editar-producto-field">
                        <label htmlFor="precio" className="editar-producto-label">Precio</label>
                        <InputText
                            id="precio"
                            className="editar-producto-input"
                            type="number"
                            value={producto.Precio || ''}
                            onChange={(e) => setProducto({ ...producto, Precio: e.target.value })}
                        />
                    </div>
                    <div className="editar-producto-field">
                        <label htmlFor="precioIVA" className="editar-producto-label">Precio con IVA</label>
                        <InputText
                            id="precioIVA"
                            className="editar-producto-input"
                            type="number"
                            value={producto.PrecioIVA || ''}
                            onChange={(e) => setProducto({ ...producto, PrecioIVA: e.target.value })}
                        />
                    </div>
                    <div className="editar-producto-field">
                        <label htmlFor="catalogoEstantes" className="editar-producto-label">Catalogo Estantes</label>
                        <InputText
                            id="catalogoEstantes"
                            className="editar-producto-input"
                            type="number"
                            value={producto.CatalogoEstantes_idCatalogoEstantes || ''}
                            onChange={(e) => setProducto({ ...producto, CatalogoEstantes_idCatalogoEstantes: e.target.value })}
                        />
                    </div>
                    <Button label="Guardar Cambios" icon="pi pi-save" className="editar-producto-save-button" onClick={guardarCambios} />
                </div>
            ) : (
                <p className="editar-producto-no-info">No se encontró información del producto.</p>
            )}
        </Dialog>
    );
};

export default EditarProducto;
