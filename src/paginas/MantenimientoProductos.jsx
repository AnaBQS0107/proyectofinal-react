import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ObtenerProductos, EliminarProducto } from '../api/producto.api';
import EditarProducto from '../modals/EditarProducto';
const MantenimientoP = () => {
    const [products, setProducts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await ObtenerProductos();
            setProducts(data);
        } catch (error) {
            console.error('Error al cargar productos:', error);
        }
    };

    const showSuccessToast = (message) => {
        window.toast.show({ severity: 'success', summary: 'Éxito', detail: message });
    };

    const showErrorToast = (message) => {
        window.toast.show({ severity: 'error', summary: 'Error', detail: message });
    };

    const actionBodyTemplate = (rowData) => (
        <React.Fragment>
            <Button 
                icon="pi pi-pencil" 
                className=" p-button-success p-mr-2" 
                onClick={() => editProduct(rowData)} 
            />
            <Button 
                icon="pi pi-trash" 
                className=" p-button-danger" 
                onClick={() => deleteProduct(rowData.idProducto)} 
            />
        </React.Fragment>
    );

    const editProduct = (product) => {
        setSelectedProduct(product);
        setIsModalVisible(true);
    };

    const deleteProduct = async (idProducto) => {
        try {
            await EliminarProducto(idProducto);
            setProducts(products.filter(prod => prod.idProducto !== idProducto));
            showSuccessToast('Producto eliminado con éxito.');
        } catch (error) {
            showErrorToast('Error al eliminar producto.');
            console.error('Error al eliminar producto:', error);
        }
    };

    const handleUpdate = () => {
        fetchProducts();  
    };

    return (
        <div className="crud-table-container">
            <Toast ref={(el) => (window.toast = el)} />
            <h2 className="crud-table-title">Mantenimiento de Productos</h2>
            <DataTable value={products}>
                <Column field="Nombre" header="Nombre" />
                <Column field="Stock" header="Stock" />
                <Column field="Precio" header="Precio" />
                <Column field="PrecioIVA" header="Precio con IVA" />
                <Column field="CatalogoEstantes_idCatalogoEstantes" header="Estante" />
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }} />
            </DataTable>

            {isModalVisible && (
                <EditarProducto 
                    product={selectedProduct} 
                    visible={isModalVisible} 
                    onHide={() => setIsModalVisible(false)} 
                    onUpdate={handleUpdate}  
                />
            )}
        </div>
    );
};

export default MantenimientoP;
