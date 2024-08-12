import axios from "axios";

export const crearOrden = async (clienteId) => {
  const response = await axios.post("http://localhost:4000/crearOrden", {
    clienteId,
  });
  return response.data.idOrdenCliente;
};

export const agregarProductoACarrito = async (
  idOrdenCliente,
  idProducto,
  cantidad
) => {
  await axios.post("http://localhost:4000/agregarProducto", {
    idOrdenCliente,
    idProducto,
    cantidad,
  });
};

export const obtenerCarrito = async (idOrdenCliente) => {
  const response = await axios.get(
    `http://localhost:4000/carrito/${idOrdenCliente}`
  );
  return response.data;
};
