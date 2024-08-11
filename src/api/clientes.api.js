import axios from "axios";

export const insertarCliente = async (clienteNuevo) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/insertarCliente",
      clienteNuevo
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error al insertar cliente:", error.response.data);
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor:", error.request);
    } else {
      console.error("Error al configurar la solicitud:", error.message);
    }
    throw error;
  }
};
