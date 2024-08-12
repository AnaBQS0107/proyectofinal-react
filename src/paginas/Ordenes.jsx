import React, { useState, useEffect } from 'react';
import { insertarOrden } from '../api/insertarOrden';
import { obtenerDetallesOrden } from '../api/obtenerDetalleOrden';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import '../css/Ordenes.css';

const Ordenes = () => {
    const [clienteId, setClienteId] = useState('');
    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [cantidad, setCantidad] = useState('');
    const [ordenId, setOrdenId] = useState(null);
    const [detallesOrden, setDetallesOrden] = useState([]);
    const [productosDisponibles, setProductosDisponibles] = useState([]);

    useEffect(() => {
        // Aquí simulo la carga de productos desde una API o fuente de datos
        setProductosDisponibles([
            { id: 1, name: 'Producto 1' },
            { id: 2, name: 'Producto 2' },
            { id: 3, name: 'Producto 3' }
        ]);
    }, []);

    useEffect(() => {
        if (ordenId) {
            obtenerDetallesOrden(ordenId)
                .then(data => setDetallesOrden(data))
                .catch(error => console.error('Error al obtener los detalles de la orden:', error));
        }
    }, [ordenId]);

    const agregarProducto = () => {
        if (productoSeleccionado && cantidad) {
            setProductos([...productos, { productoId: productoSeleccionado.id, cantidad: parseInt(cantidad) }]);
            setProductoSeleccionado(null);
            setCantidad('');
        }
    };

    const manejarInsertarOrden = async () => {
        try {
            const nuevaOrden = { clienteId, productos };
            const response = await insertarOrden(nuevaOrden);
            setOrdenId(response.ordenId);
            alert('Orden insertada correctamente');
        } catch (error) {
            console.error('Error al insertar la orden:', error.message);
        }
    };

    return (
        <div className="ordenes-container">
            <h1>Gestión de Órdenes</h1>
            <div className="form-section">
                <div className="p-field">
                    <label htmlFor="clienteId">ID del Cliente</label>
                    <InputText id="clienteId" value={clienteId} onChange={(e) => setClienteId(e.target.value)} />
                </div>

                <div className="p-field">
                    <label htmlFor="producto">Producto</label>
                    <Dropdown
                        id="producto"
                        value={productoSeleccionado}
                        options={productosDisponibles}
                        onChange={(e) => setProductoSeleccionado(e.value)}
                        placeholder="Seleccione un producto"
                        optionLabel="name"
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="cantidad">Cantidad</label>
                    <InputText id="cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                </div>

                <Button label="Agregar Producto" icon="pi pi-plus" onClick={agregarProducto} />
                <Button label="Insertar Orden" icon="pi pi-check" className="p-button-success" onClick={manejarInsertarOrden} />
            </div>

            <div className="orden-detalles">
                <h2>Detalles de la Orden {ordenId}</h2>
                <ul>
                    {detallesOrden.map((detalle, index) => (
                        <li key={index}>
                            {detalle.productoNombre} - Cantidad: {detalle.Cantidad} - Total: {detalle.total} colones
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Ordenes;
