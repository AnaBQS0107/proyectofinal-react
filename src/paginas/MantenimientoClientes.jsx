import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import '../css/MantenimientoC.styles.css';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newUser, setNewUser] = useState({
        idCedula: "",
        Nombre: "",
        Apellido1: "",
        Apellido2: "",
        Direccion: "",
        Telefono: "",
        CorreoElectronico: "",
        Contraseña: ""
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/persona');
                console.log('Usuarios cargados:', response.data);
                setUsers(response.data);
            } catch (error) {
                console.error('Error al cargar usuarios:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleAddUser = async () => {
        try {
            await axios.post('http://localhost:4000/insertarCliente', newUser);
            setUsers([...users, newUser]);
            resetDialog();
        } catch (error) {
            console.error('Error al agregar usuario:', error);
        }
    };

    const handleEditUser = async () => {
        try {
            await axios.put('http://localhost:4000/actualizarCliente', newUser);
            setUsers(users.map(user => (user.Persona_idCedula === newUser.idCedula ? newUser : user)));
            resetDialog();
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
        }
    };

    const handleDeleteUser = async (idCedula) => {
        try {
            await axios.delete(`http://localhost:4000/eliminarCliente/${idCedula}`);
            setUsers(users.filter(user => user.Persona_idCedula !== idCedula));
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
        }
    };

    const resetDialog = () => {
        setDisplayDialog(false);
        setIsEditing(false);
        setNewUser({
            idCedula: "",
            Nombre: "",
            Apellido1: "",
            Apellido2: "",
            Direccion: "",
            Telefono: "",
            CorreoElectronico: "",
            Contraseña: ""
        });
    };

    const openDialogForEditing = (user) => {
        setIsEditing(true);
        setNewUser(user);
        setDisplayDialog(true);
    };

    const actionTemplate = (rowData) => {
        return (
            <div className="action-buttons">
                <Button
                    icon="pi pi-pencil"
                    label="Editar"
                    className="p-button-rounded p-button-success p-mr-2"
                    onClick={() => openDialogForEditing(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    label="Eliminar"
                    className="p-button-rounded p-button-danger"
                    onClick={() => handleDeleteUser(rowData.Persona_idCedula)}
                />
            </div>
        );
    };

    return (
        <div className="users-list">
            <h1>Lista de Usuarios</h1>
            <Button
                label="Agregar Usuario"
                icon="pi pi-plus"
                onClick={() => setDisplayDialog(true)}
                className="p-button-success add-user-btn"
            />
            <DataTable value={users} className="p-datatable-sm">
                <Column field="idCedula" header="Cédula" />
                <Column field="Nombre" header="Nombre" />
                <Column field="Apellido1" header="Primer Apellido" />
                <Column field="Apellido2" header="Segundo Apellido" />
                <Column field="Direccion" header="Dirección" />
                <Column field="Telefono" header="Teléfono" />
                <Column field="CorreoElectronico" header="Correo Electrónico" />
                <Column body={actionTemplate} header="Acciones" />
            </DataTable>

            <Dialog header={isEditing ? "Editar Usuario" : "Agregar Usuario"} visible={displayDialog} onHide={resetDialog}>
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="idCedula">Cédula</label>
                        <InputText
                            id="idCedula"
                            value={newUser.idCedula}
                            onChange={(e) => setNewUser({ ...newUser, idCedula: e.target.value })}
                            disabled={isEditing}
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="Nombre">Nombre</label>
                        <InputText
                            id="Nombre"
                            value={newUser.Nombre}
                            onChange={(e) => setNewUser({ ...newUser, Nombre: e.target.value })}
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="Apellido1">Primer Apellido</label>
                        <InputText
                            id="Apellido1"
                            value={newUser.Apellido1}
                            onChange={(e) => setNewUser({ ...newUser, Apellido1: e.target.value })}
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="Apellido2">Segundo Apellido</label>
                        <InputText
                            id="Apellido2"
                            value={newUser.Apellido2}
                            onChange={(e) => setNewUser({ ...newUser, Apellido2: e.target.value })}
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="Direccion">Dirección</label>
                        <InputText
                            id="Direccion"
                            value={newUser.Direccion}
                            onChange={(e) => setNewUser({ ...newUser, Direccion: e.target.value })}
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="Telefono">Teléfono</label>
                        <InputText
                            id="Telefono"
                            value={newUser.Telefono}
                            onChange={(e) => setNewUser({ ...newUser, Telefono: e.target.value })}
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="CorreoElectronico">Correo Electrónico</label>
                        <InputText
                            id="CorreoElectronico"
                            value={newUser.CorreoElectronico}
                            onChange={(e) => setNewUser({ ...newUser, CorreoElectronico: e.target.value })}
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="Contraseña">Contraseña</label>
                        <Password
                            id="Contraseña"
                            value={newUser.Contraseña}
                            onChange={(e) => setNewUser({ ...newUser, Contraseña: e.target.value })}
                            feedback={false}
                        />
                    </div>
                </div>
                <Button
                    label={isEditing ? "Actualizar" : "Agregar"}
                    icon="pi pi-check"
                    onClick={isEditing ? handleEditUser : handleAddUser}
                />
            </Dialog>
        </div>
    );
};

export default UsersList;
