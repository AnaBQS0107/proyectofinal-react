import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import '../css/ControlInventario.css';
import CustomModal from '../modals/CustomModal'; // Asegúrate de que la ruta sea correcta
import { ObtenerProductos } from '../api/producto.api';


function ControlInventarios() {
    const [inventario, setInventario] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [mostrarDialogo, setMostrarDialogo] = useState(false);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const productosData = await ObtenerProductos();
                setInventario(productosData);
            } catch (error) {
                console.error('Error al cargar productos:', error);
            }
        };

        fetchProductos();
    }, []);

    const obtenerRutaImagen = (imagen) => `http://localhost:4001/uploads/${imagen}`;

    const formatCurrency = (value) => new Intl.NumberFormat('es-CR', {
        style: 'currency',
        currency: 'CRC'
    }).format(value);

    const mostrarDetallesProducto = (producto) => {
        setProductoSeleccionado(producto);
        setMostrarDialogo(true);
    };

    const imagenBodyTemplate = (rowData) => (
        <Button 
            label="" 
            icon="pi pi-info-circle" 
            onClick={() => mostrarDetallesProducto(rowData)} 
        />
    );

    const costoBodyTemplate = (rowData) => formatCurrency(rowData.Precio);

    const costoIVA_bodyTemplate = (rowData) => formatCurrency(rowData.PrecioIVA);

    const estanteBodyTemplate = (rowData) => `Estante ${rowData.CatalogoEstantesID}`;

    const codigoBodyTemplate = (rowData) => rowData.ProductoID

    return (
        <div className="control-inventarios">
            <br /><br /><br /> <br /> <br />
            <h1 className="h1-Nombre">Control de Inventarios</h1>
            <DataTable value={inventario} className="p-datatable-customers">
                <Column field="ProductoID" header="Código del producto" body={codigoBodyTemplate} />
                <Column field="Nombre" header="Nombre del producto" />
                <Column field="Stock" header="Cantidad en inventario" />
                <Column field="Precio" header="Costo del producto" body={costoBodyTemplate} />
                <Column field="PrecioIVA" header="Costo con IVA" body={costoIVA_bodyTemplate} />
                <Column field="CatalogoEstantesID" header="Ubicación en la bodega" body={estanteBodyTemplate} />
                <Column header="Detalles" body={imagenBodyTemplate} />
            </DataTable>
            <br />
            {productoSeleccionado && (
                <CustomModal 
                    isVisible={mostrarDialogo} 
                    onClose={() => setMostrarDialogo(false)} 
                    product={productoSeleccionado}
                />
            )}
        </div>
    );
}

export default ControlInventarios;
