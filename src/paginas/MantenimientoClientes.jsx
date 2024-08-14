import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { obtenerClientes, eliminarCliente } from '../api/clientes.api';
import EditarCliente from '../modals/EditarCliente';
import '../css/MantenimientoC.styles.css'; 

const MantenimientoC = () => {
    const [clientes, setClientes] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCliente, setSelectedCliente] = useState(null);

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        try {
            const data = await obtenerClientes();
            setClientes(data);
        } catch (error) {
            console.error('Error al cargar clientes:', error);
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
                onClick={() => editCliente(rowData)} 
            />
            <Button 
                icon="pi pi-trash" 
                className=" p-button-danger" 
                onClick={() => deleteCliente(rowData.idCedula)} 
            />
        </React.Fragment>
    );

    const editCliente = (cliente) => {
        setSelectedCliente(cliente);
        setIsModalVisible(true);
    };

    const deleteCliente = async (idCedula) => {
        try {
            await eliminarCliente(idCedula);
            setClientes(clientes.filter(cliente => cliente.idCedula !== idCedula));
            showSuccessToast('Cliente eliminado con éxito.');
        } catch (error) {
            showErrorToast('Error al eliminar cliente.');
            console.error('Error al eliminar cliente:', error);
        }
    };

    const handleUpdate = () => {
        fetchClientes();  
    };

    return (
        <div className="crud-table-container">
            <Toast ref={(el) => (window.toast = el)} />
            <h2 className="crud-table-title">Mantenimiento de Clientes</h2>
            <DataTable value={clientes}>
                <Column field="Nombre" header="Nombre" />
                <Column field="Apellido1" header="Primer Apellido" />
                <Column field="Apellido2" header="Segundo Apellido" />
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }} />
            </DataTable>

            {isModalVisible && (
                <EditarCliente 
                    cliente={selectedCliente} 
                    visible={isModalVisible} 
                    onHide={() => setIsModalVisible(false)} 
                    onUpdate={handleUpdate}  
                />
            )}
        </div>
    );
};

export default MantenimientoC;
