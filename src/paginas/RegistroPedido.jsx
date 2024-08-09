import React, { useState, useRef, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import '../css/RegistroC.styles.css';
import { insertarProducto } from '../api/producto.api'; // Importación de la función

function RegistroProducto() {
  const [nombreProducto, setNombreProducto] = useState('');
  const [cantidadStock, setCantidadStock] = useState('');
  const [precioSinIVA, setPrecioSinIVA] = useState('');
  const [precioConIVA, setPrecioConIVA] = useState('');
  const [estante, setEstante] = useState('');
  const [imagen, setImagen] = useState(null);
  const toast = useRef(null);

  const estantes = [
    { label: 'Estante 1', value: '1' },
    { label: 'Estante 2', value: '2' },
    { label: 'Estante 3', value: '3' }
  ];

  const calcularPrecioConIVA = (precio) => {
    const IVA = 0.13; // Asumiendo que el IVA es del 13%
    return precio * (1 + IVA);
  };

  useEffect(() => {
    const precioSinIVA_Numero = parseFloat(precioSinIVA);
    if (!isNaN(precioSinIVA_Numero)) {
      const precioConIVA_Numero = calcularPrecioConIVA(precioSinIVA_Numero);
      setPrecioConIVA(precioConIVA_Numero.toFixed(2));
    } else {
      setPrecioConIVA('');
    }
  }, [precioSinIVA]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const precioSinIVA_Numero = parseFloat(precioSinIVA);
    const cantidadStock_Numero = parseInt(cantidadStock);

    if (isNaN(precioSinIVA_Numero)) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'El precio sin IVA no es válido', life: 3000 });
      return;
    }

    if (isNaN(cantidadStock_Numero)) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'La cantidad en stock no es válida', life: 3000 });
      return;
    }

    try {
      await insertarProducto({
        nombre: nombreProducto,
        cantidadStock: cantidadStock_Numero,
        precioSinIVA: precioSinIVA_Numero,
        precioConIVA: parseFloat(precioConIVA),
        estante: estante,
        imagen: imagen // Aquí deberías manejar la carga de la imagen según tu API
      });
      toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Producto registrado correctamente', life: 3000 });
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo registrar el producto', life: 3000 });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(URL.createObjectURL(file));
    }
  };

  return (
    <div className="register-form p-grid p-dir-col p-align-center">
      <Toast ref={toast} />
      <div className="p-col">
        <h2 className="register-form__title">Registro de Productos</h2>
        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="p-field">
            <label htmlFor="nombreProducto" className="register-form__label">Nombre del producto</label>
            <InputText
              id="nombreProducto"
              value={nombreProducto}
              onChange={(e) => setNombreProducto(e.target.value)}
              placeholder="Ingrese el nombre del producto"
              className="register-form__input"
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="cantidadStock" className="register-form__label">Cantidad en Stock</label>
            <InputText
              id="cantidadStock"
              value={cantidadStock}
              onChange={(e) => setCantidadStock(e.target.value)}
              placeholder="Ingrese la cantidad en stock"
              className="register-form__input"
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="precioSinIVA" className="register-form__label">Precio sin IVA</label>
            <InputText
              id="precioSinIVA"
              value={precioSinIVA}
              onChange={(e) => setPrecioSinIVA(e.target.value)}
              placeholder="Ingrese el precio sin IVA"
              className="register-form__input"
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="precioConIVA" className="register-form__label">Precio con IVA</label>
            <InputText
              id="precioConIVA"
              value={precioConIVA}
              placeholder="Precio calculado automáticamente"
              className="register-form__input"
              disabled // Deshabilita el campo de texto
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="estante" className="register-form__label">Estante en el que se encuentra</label>
            <Dropdown
              id="estante"
              value={estante}
              options={estantes}
              onChange={(e) => setEstante(e.value)}
              placeholder="Seleccione el estante"
              className="register-form__input"
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="imagen" className="register-form__label">Imagen del producto</label>
            <input
              id="imagen"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="register-form__input"
            />
            {imagen && (
              <div className="register-form__image-preview">
                <img src={imagen} alt="Vista previa" className="register-form__image" />
              </div>
            )}
          </div>
          <Button label="Registrar" type="submit" className="register-form__button p-mt-2" />
        </form>
      </div>
    </div>
  );
}

export default RegistroProducto;
