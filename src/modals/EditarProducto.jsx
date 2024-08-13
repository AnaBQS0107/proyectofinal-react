import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { actualizarProducto } from '../api/producto.api';

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
        <Dialog header="Editar Producto" visible={visible} style={{ width: '50vw' }} modal onHide={onHide}>
            {producto ? (
                <div>
                    <div className="p-field">
                        <label htmlFor="nombre">Nombre</label>
                        <InputText
                            id="nombre"
                            value={producto.Nombre || ''}
                            onChange={(e) => setProducto({ ...producto, Nombre: e.target.value })}
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="imagen">Imagen URL</label>
                        <InputText
                            id="imagen"
                            value={producto.Imagen || ''}
                            onChange={(e) => setProducto({ ...producto, Imagen: e.target.value })}
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="stock">Stock</label>
                        <InputText
                            id="stock"
                            type="number"
                            value={producto.Stock || ''}
                            onChange={(e) => setProducto({ ...producto, Stock: e.target.value })}
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="precio">Precio</label>
                        <InputText
                            id="precio"
                            type="number"
                            value={producto.Precio || ''}
                            onChange={(e) => setProducto({ ...producto, Precio: e.target.value })}
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="precioIVA">Precio con IVA</label>
                        <InputText
                            id="precioIVA"
                            type="number"
                            value={producto.PrecioIVA || ''}
                            onChange={(e) => setProducto({ ...producto, PrecioIVA: e.target.value })}
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="catalogoEstantes">Catalogo Estantes</label>
                        <InputText
                            id="catalogoEstantes"
                            type="number"
                            value={producto.CatalogoEstantes_idCatalogoEstantes || ''}
                            onChange={(e) => setProducto({ ...producto, CatalogoEstantes_idCatalogoEstantes: e.target.value })}
                        />
                    </div>
                    <Button label="Guardar Cambios" icon="pi pi-save" onClick={guardarCambios} />
                </div>
            ) : (
                <p>No se encontró información del producto.</p>
            )}
        </Dialog>
    );
};

export default EditarProducto;
