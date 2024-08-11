import axios from "axios";

export const obtenerDetallesOrden = async (ordenId) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/detalleOrden/${ordenId}`
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
