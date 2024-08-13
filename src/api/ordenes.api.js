import axios from "axios";

// Crear una nueva orden para el cliente
export const crearOrden = async (clienteId) => {
  const response = await axios.post("http://localhost:4000/crearOrden", {
    clienteId,
  });
  return response.data.idOrdenCliente;
};

// Agregar un producto al carrito (crea orden si no existe)
export const agregarProductoACarrito = async (
  clienteId,
  idProducto,
  cantidad
) => {
  await axios.post("http://localhost:4000/agregarProducto", {
    clienteId,
    idProducto,
    cantidad,
  });
};

// Obtener los productos en el carrito (órdenes en proceso)
export const obtenerCarrito = async (clienteId) => {
  const response = await axios.get(
    `http://localhost:4000/carrito/${clienteId}`
  );
  return response.data;
};

// Obtener los detalles de una orden específica
export const obtenerDetallesOrden = async (ordenId) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/detalleOrden/${ordenId}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Error al obtener detalles de la orden:",
        error.response.data.error
      );
      throw new Error(error.response.data.error);
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor:", error.request);
    } else {
      console.error("Error al configurar la solicitud:", error.message);
    }
    throw error;
  }
};

// Eliminar una orden completa
export const eliminarOrdenCompleta = async (ordenClienteId) => {
  try {
    await axios.delete(`http://localhost:4000/eliminarOrden/${ordenClienteId}`);
  } catch (error) {
    console.error("Error al eliminar la orden completa:", error);
    throw error;
  }
};

// Eliminar un producto específico de la orden
export const eliminarDetalleOrden = async (ordenClienteId, productoId) => {
  try {
    await axios.delete(
      `http://localhost:4000/eliminarDetalle/${ordenClienteId}/${productoId}`
    );
  } catch (error) {
    console.error("Error al eliminar el detalle de la orden:", error);
    throw error;
  }
};

// Cambiar el estado de una orden a "Checkout"
export const cambiarEstadoACheckout = async (ordenClienteId) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/cambiarEstadoACheckout",
      {
        ordenClienteId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al cambiar estado a Checkout:", error);
    throw error;
  }
};

// Cambiar el estado de una orden a "En Proceso"
export const cambiarEstadoAEnProceso = async (ordenClienteId) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/cambiarEstadoAEnProceso",
      {
        ordenClienteId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al cambiar estado a En Proceso:", error);
    throw error;
  }
};

// Obtener las órdenes en estado "Checkout"
export const obtenerOrdenesCheckout = async (clienteId) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/ordenesCheckout/${clienteId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener órdenes en estado Checkout:", error);
    throw error;
  }
};

// Obtener las órdenes en estado "En Proceso"
export const obtenerOrdenesEnProceso = async (clienteId) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/ordenesEnProceso/${clienteId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener órdenes en proceso:", error);
    throw error;
  }
};

//******************************************ordenes **********/

// Obtener las órdenes en estado "Completado"
export const obtenerOrdenesCompletadas = async (clienteId) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/ordenesCompletadas/${clienteId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener órdenes completadas:", error);
    throw error;
  }
};
