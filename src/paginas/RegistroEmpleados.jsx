import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ingresarEmpleado } from '../api/empleados.api'; 
import '../css/RegistroC.styles.css';

function RegistroEmpleados() {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido1, setApellido1] = useState('');
  const [apellido2, setApellido2] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  const toast = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const empleadoNuevo = {
      idCedula: cedula,
      nombre,
      apellido1,
      apellido2,
      direccion,
      telefono,
      correoElectronico,
      contraseñaHash: contrasena
    };

    try {
      await ingresarEmpleado(empleadoNuevo);
      toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Empleado registrado correctamente', life: 3000 });
      setCedula('');
      setNombre('');
      setApellido1('');
      setApellido2('');
      setDireccion('');
      setTelefono('');
      setCorreoElectronico('');
      setContrasena('');
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo registrar el empleado', life: 3000 });
    }
  };

  return (
    <div className="register-form p-grid p-dir-col p-align-center">
      <Toast ref={toast} />
      <div className="p-col">
        <h2 className="register-form__title">Registro de Empleados</h2>
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
            <label htmlFor="apellido1" className="register-form__label">Primer Apellido</label>
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
            <label htmlFor="apellido2" className="register-form__label">Segundo Apellido</label>
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
            <label htmlFor="correoElectronico" className="register-form__label">Correo Electrónico</label>
            <InputText
              id="correoElectronico"
              value={correoElectronico}
              onChange={(e) => setCorreoElectronico(e.target.value)}
              placeholder="Ingrese su correo electrónico"
              className="register-form__input"
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="contrasena" className="register-form__label">Contraseña</label>
            <InputText
              id="contrasena"
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="Ingrese su contraseña"
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

export default RegistroEmpleados;
