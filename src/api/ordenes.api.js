import axios from "axios";

const BASE_URL = "http://localhost:4000";

// Crear una nueva orden para el cliente
export const crearOrden = async (ClientesID) => {
  const response = await axios.post(`${BASE_URL}/crearOrden`, {
    ClientesID,
  });
  return response.data.OrdenClienteID;
};

// Agregar un producto al carrito (crea orden si no existe)
export const agregarProductoACarrito = async (
  ClientesID,
  ProductoID,
  Cantidad
) => {
  await axios.post(`${BASE_URL}/agregarProducto`, {
    ClientesID,
    ProductoID,
    Cantidad,
  });
};

// Obtener los productos en el carrito (órdenes en proceso)
export const obtenerCarrito = async (ClientesID) => {
  const response = await axios.get(`${BASE_URL}/carrito/${ClientesID}`);
  return response.data;
};

// Obtener los detalles de una orden específica
export const obtenerDetallesOrden = async (ordenId) => {
  try {
    const response = await axios.get(`${BASE_URL}/detalleOrden/${ordenId}`);
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
export const eliminarOrdenCompleta = async (OrdenClienteID) => {
  try {
    await axios.delete(`${BASE_URL}/eliminarOrden/${OrdenClienteID}`);
  } catch (error) {
    console.error("Error al eliminar la orden completa:", error);
    throw error;
  }
};

// Eliminar un producto específico de la orden
export const eliminarDetalleOrden = async (OrdenClienteID, ProductoID) => {
  try {
    await axios.delete(
      `${BASE_URL}/eliminarDetalle/${OrdenClienteID}/${ProductoID}`
    );
  } catch (error) {
    console.error("Error al eliminar el detalle de la orden:", error);
    throw error;
  }
};

// Cambiar el estado de una orden a "Checkout"
export const cambiarEstadoACheckout = async (OrdenClienteID) => {
  try {
    const response = await axios.post(`${BASE_URL}/cambiarEstadoACheckout`, {
      OrdenClienteID,
    });
    return response.data;
  } catch (error) {
    console.error("Error al cambiar estado a Checkout:", error);
    throw error;
  }
};
// Complete an order (change status to "Completada" and reduce stock)
export const cambiarEstadoACompletada = async (OrdenClienteID) => {
  try {
    const response = await axios.post(`${BASE_URL}/completarOrden`, {
      OrdenClienteID,
    });
    return response.data;
  } catch (error) {
    console.error("Error al completar la orden:", error);
    throw error;
  }
};
// Cambiar el estado de una orden a "En Proceso"
export const cambiarEstadoAEnProceso = async (OrdenClienteID) => {
  try {
    const response = await axios.post(`${BASE_URL}/cambiarEstadoAEnProceso`, {
      OrdenClienteID,
    });
    return response.data;
  } catch (error) {
    console.error("Error al cambiar estado a En Proceso:", error);
    throw error;
  }
};

// Obtener las órdenes en estado "Checkout"
export const obtenerOrdenesCheckout = async (ClientesID) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/ordenesCheckout/${ClientesID}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener órdenes en estado Checkout:", error);
    throw error;
  }
};

// Obtener las órdenes en estado "En Proceso"
export const obtenerOrdenesEnProceso = async (ClientesID) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/ordenesEnProceso/${ClientesID}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener órdenes en proceso:", error);
    throw error;
  }
};

// Obtener las órdenes en estado "Completado"
export const obtenerOrdenesCompletadas = async (ClientesID) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/ordenesCompletadas/${ClientesID}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener órdenes completadas:", error);
    throw error;
  }
};

export const actualizarCantidadProducto = async (
  OrdenClienteID,
  ProductoID,
  NuevaCantidad
) => {
  try {
    await axios.post(`${BASE_URL}/actualizarCantidad`, {
      OrdenClienteID,
      ProductoID,
      NuevaCantidad,
    });
  } catch (error) {
    console.error("Error al actualizar la cantidad del producto:", error);
    throw error;
  }
};
