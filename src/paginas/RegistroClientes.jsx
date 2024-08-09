import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import '../css/RegistroC.styles.css';
import { insertarCliente } from '../api/clientes.api'; 

function RegistroClientes() {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido1, setApellido1] = useState('');
  const [apellido2, setApellido2] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const toast = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();


    const idCedula = Number(cedula);


    if (isNaN(idCedula)) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'El número de cédula no es válido', life: 3000 });
      return;
    }

    try {
      await insertarCliente({
        idCedula: idCedula,
        nombre: nombre,
        apellido1: apellido1,
        apellido2: apellido2,
        direccion: direccion,
        telefono: telefono,
        correoElectronico: correo
      });
      toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Cliente registrado correctamente', life: 3000 });
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo registrar el cliente', life: 3000 });
    }
  };
  return (
    <div className="register-form p-grid p-dir-col p-align-center">
      <Toast ref={toast} />
      <div className="p-col">
        <h2 className="register-form__title">Registro de Clientes</h2>
        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="p-field">
            <label htmlFor="cedula" className="register-form__label">Cédula</label>
            <InputText
              id="cedula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              placeholder="Ingrese su cédula"
              className="register-form__input"
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="nombre" className="register-form__label">Nombre</label>
            <InputText
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingrese su nombre"
              className="register-form__input"
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="apellido1" className="register-form__label">Primer apellido</label>
            <InputText
              id="apellido1"
              value={apellido1}
              onChange={(e) => setApellido1(e.target.value)}
              placeholder="Ingrese su primer apellido"
              className="register-form__input"
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="apellido2" className="register-form__label">Segundo apellido</label>
            <InputText
              id="apellido2"
              value={apellido2}
              onChange={(e) => setApellido2(e.target.value)}
              placeholder="Ingrese su segundo apellido"
              className="register-form__input"
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="direccion" className="register-form__label">Dirección</label>
            <InputText
              id="direccion"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              placeholder="Ingrese su dirección"
              className="register-form__input"
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="telefono" className="register-form__label">Teléfono</label>
            <InputText
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Ingrese su teléfono"
              className="register-form__input"
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="correo" className="register-form__label">Correo Electrónico</label>
            <InputText
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="Ingrese su correo electrónico"
              className="register-form__input"
              required
            />
          </div>
          <Button label="Registrar" type="submit" className="register-form__button p-mt-2" />
        </form>
      </div>
    </div>
  );
}

export default RegistroClientes;
