import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import '../css/RegistroC.styles.css';
import { Toast } from 'primereact/toast';

function RegistroClientes() {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const toast = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Cliente registrado correctamente', life: 3000 });
  };

  return (
    <div className="register-form p-grid p-dir-col p-align-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Toast ref={toast} />
      <div className="p-col">
        <h2>Registro de Cliente</h2>
        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="p-field">
            <label htmlFor="cedula">Cédula</label>
            <InputText
              id="cedula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              placeholder="Ingrese su cédula"
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="nombre">Nombre</label>
            <InputText
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingrese su nombre"
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="direccion">Dirección</label>
            <InputText
              id="direccion"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              placeholder="Ingrese su dirección"
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="telefono">Teléfono</label>
            <InputText
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Ingrese su teléfono"
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="correo">Correo Electrónico</label>
            <InputText
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="Ingrese su correo electrónico"
              required
            />
          </div>
          <Button label="Registrar" type="submit" className="p-mt-2" />
        </form>
      </div>
    </div>
  );
}

export default RegistroClientes;