import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import '../css/RegistroE.styles.css'

function RegistroEmpleados() {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [contrasena, setContrasena] = useState('');
  const toast = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Empleado registrado correctamente', life: 3000 });
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
