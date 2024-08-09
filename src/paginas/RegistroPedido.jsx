import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import '../css/RegistroC.styles.css';
import { insertarProducto } from '../api/producto.api'; 

function RegistroPedidos() {
  const [nombreProducto, setNombreProducto] = useState('');
  const [cantidadStock, setCantidadStock] = useState('');
  const [precioSinIVA, setPrecioSinIVA] = useState('');
  const [precioConIVA, setPrecioConIVA] = useState('');
  const [estante, setEstante] = useState('');
  const [imagen, setImagen] = useState(''); // Almacena solo el nombre del archivo
  const toast = useRef(null);

  const estantes = [
    { label: 'Estante 1', value: 'estante1' },
    { label: 'Estante 2', value: 'estante2' },
    { label: 'Estante 3', value: 'estante3' }
  ];

  // Función para calcular el precio con IVA
  const calcularPrecioConIVA = (precioSinIVA) => {
    const iva = 0.13; // Ejemplo: IVA del 13%
    return (parseFloat(precioSinIVA) * (1 + iva)).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear el objeto de datos del producto
    const productoData = {
      nombre: nombreProducto,
      stock: cantidadStock,
      precio: precioSinIVA,
      precioIVA: precioConIVA,
      catalogoEstantesId: estante,
      imagen: imagen, // Envía solo el nombre del archivo
    };

    try {
      await insertarProducto(productoData);
      toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Producto registrado correctamente', life: 3000 });
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo registrar el producto', life: 3000 });
    }
  };

  const handlePrecioSinIVAChange = (e) => {
    const precio = e.target.value;
    setPrecioSinIVA(precio);
    // Calcula y actualiza el precio con IVA
    if (precio) {
      setPrecioConIVA(calcularPrecioConIVA(precio));
    } else {
      setPrecioConIVA('');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file.name); // Almacena solo el nombre del archivo
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
              onChange={handlePrecioSinIVAChange}
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
                <p>Imagen seleccionada: {imagen}</p>
              </div>
            )}
          </div>
          <Button label="Registrar" type="submit" className="register-form__button p-mt-2" />
        </form>
      </div>
    </div>
  );
}

export default RegistroPedidos;