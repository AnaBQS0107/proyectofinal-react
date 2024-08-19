import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { actualizarEmpleado } from '../api/empleados.api';
import '../css/modalEmpleados.styles.css';

const EditarEmpleado = ({ employee, visible, onHide, onUpdate }) => {
    const [empleado, setEmpleado] = useState({});

    useEffect(() => {
        if (employee) {
            setEmpleado(employee);
        }
    }, [employee]);

    const guardarCambios = async () => {
        try {
            const { Cedula, Nombre, Apellido1, Apellido2, ContraseñaHash } = empleado;

            if (!Nombre || !Apellido1 || !Apellido2 || !ContraseñaHash) {
                window.toast.show({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor complete todos los campos.' });
                return;
            }

            await actualizarEmpleado(Cedula, { Nombre, Apellido1, Apellido2, ContraseñaHash });
            window.toast.show({ severity: 'success', summary: 'Éxito', detail: 'Empleado actualizado con éxito.' });
            onUpdate(); 
            onHide();
        } catch (error) {
            window.toast.show({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el empleado.' });
            console.error('Error al actualizar el empleado:', error);
        }
    };

    return (
        <Dialog header="Editar Empleado" visible={visible} style={{ width: '50vw' }} modal onHide={onHide} className="editar-empleado-dialog">
            {empleado ? (
                <div className="editar-empleado-content">
                    <div className="p-field editar-empleado-field">
                        <label htmlFor="nombre" className="editar-empleado-label">Nombre</label>
                        <InputText
                            id="nombre"
                            value={empleado.Nombre || ''}
                            onChange={(e) => setEmpleado({ ...empleado, Nombre: e.target.value })}
                            className="editar-empleado-input"
                        />
                    </div>
                    <div className="p-field editar-empleado-field">
                        <label htmlFor="apellido1" className="editar-empleado-label">Primer Apellido</label>
                        <InputText
                            id="apellido1"
                            value={empleado.Apellido1 || ''}
                            onChange={(e) => setEmpleado({ ...empleado, Apellido1: e.target.value })}
                            className="editar-empleado-input"
                        />
                    </div>
                    <div className="p-field editar-empleado-field">
                        <label htmlFor="apellido2" className="editar-empleado-label">Segundo Apellido</label>
                        <InputText
                            id="apellido2"
                            value={empleado.Apellido2 || ''}
                            onChange={(e) => setEmpleado({ ...empleado, Apellido2: e.target.value })}
                            className="editar-empleado-input"
                        />
                    </div>
                    <div className="p-field editar-empleado-field">
                        <label htmlFor="contraseña" className="editar-empleado-label">Contraseña</label>
                        <InputText
                            id="contraseña"
                            type="password"
                            value={empleado.ContraseñaHash || ''}
                            onChange={(e) => setEmpleado({ ...empleado, ContraseñaHash: e.target.value })}
                            className="editar-empleado-input"
                        />
                    </div>
                    <Button 
                        label="Guardar Cambios" 
                        icon="pi pi-save" 
                        onClick={guardarCambios} 
                        className="editar-empleado-save-button"
                    />
                </div>
            ) : (
                <p className="editar-empleado-no-info">No se encontró información del empleado.</p>
            )}
        </Dialog>
    );
};

export default EditarEmpleado;
