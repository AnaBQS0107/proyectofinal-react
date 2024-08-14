import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import '../css/ControlInventario.css';

import { ObtenerProductos } from '../api/producto.api';


function ControlInventarios() {
    const [inventario, setInventario] = useState([]);
    const [imagenVistaPrevia, setImagenVistaPrevia] = useState(null);
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

    const obtenerRutaImagen = (imagen) => {
        return `http://localhost:4001/uploads/${imagen}`;
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CR', {
            style: 'currency',
            currency: 'CRC'
        }).format(value);
    };

    const handleAddToCart = (producto) => {
        alert(`${producto.Nombre} se agregó al carrito`);
    };

    const mostrarImagenVistaPrevia = (imagen) => {
        setImagenVistaPrevia(obtenerRutaImagen(imagen));
        setMostrarDialogo(true);
    };

    const ocultarImagenVistaPrevia = () => {
        setMostrarDialogo(false);
        setImagenVistaPrevia(null);
    };

    const imagenBodyTemplate = (rowData) => {
        return (
            <Button label="Ver Imagen" icon="pi pi-image" onClick={() => mostrarImagenVistaPrevia(rowData.Imagen)} />
        );
    };

    const costoBodyTemplate = (rowData) => {
        return formatCurrency(rowData.Precio);
    };

    const costoIVA_bodyTemplate = (rowData) => {
        return formatCurrency(rowData.PrecioIVA);
    };

    const estanteBodyTemplate = (rowData) => {
        return `Estante ${rowData.CatalogoEstantes_idCatalogoEstantes}`;
    };


    const codigoBodyTemplate = (rowData) => {
        return rowData.idProducto;
    };

    return (
        <div className="control-inventarios">
            <h1>Control de Inventarios</h1>
            <DataTable value={inventario} className="p-datatable-customers">
            <Column field="idProducto" header="Código del producto" body={codigoBodyTemplate} />
                <Column field="Nombre" header="Nombre del producto" />
                <Column field="Stock" header="Cantidad en inventario" />
                <Column field="Precio" header="Costo del producto" body={costoBodyTemplate} />
                <Column field="PrecioIVA" header="Costo con IVA" body={costoIVA_bodyTemplate} />
                <Column field="CatalogoEstantes_idCatalogoEstantes" header="Ubicación en la bodega" body={estanteBodyTemplate} />
                <Column header="Fotografía del producto" body={imagenBodyTemplate} />
               
            </DataTable>

            <Dialog header="Vista Previa de Imagen" visible={mostrarDialogo} style={{ width: '50vw' }} onHide={ocultarImagenVistaPrevia}>
                {imagenVistaPrevia && (
                    <Image src={imagenVistaPrevia} alt="Vista Previa" className="imagen-vista-previa" />
                )}
            </Dialog>
        </div>
    );
}

export default ControlInventarios;
