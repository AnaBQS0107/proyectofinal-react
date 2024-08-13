import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { actualizarCliente } from '../api/clientes.api'; // Ajusta la importación si es necesario

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
        <Dialog header="Editar Cliente" visible={visible} style={{ width: '50vw' }} modal onHide={onHide}>
            {clienteData ? (
                <div>
                    <div className="p-field">
                        <label htmlFor="nombre">Nombre</label>
                        <InputText
                            id="nombre"
                            value={clienteData.Nombre || ''}
                            onChange={(e) => setClienteData({ ...clienteData, Nombre: e.target.value })}
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="apellido1">Primer Apellido</label>
                        <InputText
                            id="apellido1"
                            value={clienteData.Apellido1 || ''}
                            onChange={(e) => setClienteData({ ...clienteData, Apellido1: e.target.value })}
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="apellido2">Segundo Apellido</label>
                        <InputText
                            id="apellido2"
                            value={clienteData.Apellido2 || ''}
                            onChange={(e) => setClienteData({ ...clienteData, Apellido2: e.target.value })}
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="correo">Correo Electrónico</label>
                        <InputText
                            id="correo"
                            value={clienteData.CorreoElectronico || ''}
                            onChange={(e) => setClienteData({ ...clienteData, CorreoElectronico: e.target.value })}
                        />
                    </div>
                    <Button label="Guardar Cambios" icon="pi pi-save" onClick={guardarCambios} />
                </div>
            ) : (
                <p>No se encontró información del cliente.</p>
            )}
        </Dialog>
    );
};

export default EditarCliente;
