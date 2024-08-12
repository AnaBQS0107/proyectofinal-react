import axios from "axios";

export const obtenerProductos = async () => {
  try {
    const response = await axios.get("http://localhost:4000/obtenerProductos");
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};
