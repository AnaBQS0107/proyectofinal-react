import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { actualizarCliente } from '../api/clientes.api'; 
import '../css/modalClientes.styles.css'; 

const EditarCliente = ({ cliente, visible, onHide, onUpdate }) => {
    const [clienteData, setClienteData] = useState({});

    useEffect(() => {
        if (cliente) {
            setClienteData(cliente);
        }
    }, [cliente]);

    const guardarCambios = async () => {
        try {
            const { idCedula, Nombre, Apellido1, Apellido2, CorreoElectronico } = clienteData;

            if (!Nombre || !Apellido1 || !Apellido2 || !CorreoElectronico) {
                window.toast.show({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor complete todos los campos.' });
                return;
            }

            await actualizarCliente(idCedula, { Nombre, Apellido1, Apellido2, CorreoElectronico });
            window.toast.show({ severity: 'success', summary: 'Éxito', detail: 'Cliente actualizado con éxito.' });
            onUpdate();
            onHide();
        } catch (error) {
            window.toast.show({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el cliente.' });
            console.error('Error al actualizar el cliente:', error);
        }
    };

    return (
        <Dialog header="Editar Cliente" visible={visible} className="editar-cliente-dialog" modal onHide={onHide}>
            {clienteData ? (
                <div className="editar-cliente-content">
                    <div className="editar-cliente-field">
                        <label htmlFor="nombre" className="editar-cliente-label">Nombre</label>
                        <InputText
                            id="nombre"
                            className="editar-cliente-input"
                            value={clienteData.Nombre || ''}
                            onChange={(e) => setClienteData({ ...clienteData, Nombre: e.target.value })}
                        />
                    </div>
                    <div className="editar-cliente-field">
                        <label htmlFor="apellido1" className="editar-cliente-label">Primer Apellido</label>
                        <InputText
                            id="apellido1"
                            className="editar-cliente-input"
                            value={clienteData.Apellido1 || ''}
                            onChange={(e) => setClienteData({ ...clienteData, Apellido1: e.target.value })}
                        />
                    </div>
                    <div className="editar-cliente-field">
                        <label htmlFor="apellido2" className="editar-cliente-label">Segundo Apellido</label>
                        <InputText
                            id="apellido2"
                            className="editar-cliente-input"
                            value={clienteData.Apellido2 || ''}
                            onChange={(e) => setClienteData({ ...clienteData, Apellido2: e.target.value })}
                        />
                    </div>
                    <div className="editar-cliente-field">
                        <label htmlFor="correo" className="editar-cliente-label">Correo Electrónico</label>
                        <InputText
                            id="correo"
                            className="editar-cliente-input"
                            value={clienteData.CorreoElectronico || ''}
                            onChange={(e) => setClienteData({ ...clienteData, CorreoElectronico: e.target.value })}
                        />
                    </div>
                    <Button label="Guardar Cambios" icon="pi pi-save" className="editar-cliente-save-button" onClick={guardarCambios} />
                </div>
            ) : (
                <p className="editar-cliente-no-info">No se encontró información del cliente.</p>
            )}
        </Dialog>
    );
};

export default EditarCliente;
