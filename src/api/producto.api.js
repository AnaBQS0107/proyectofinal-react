import axios from "axios";

// Inserta un nuevo producto en la base de datos
export const insertarProducto = async (ProductoNuevo) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/insertarProducto",
      ProductoNuevo,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Se asegura de que el contenido se envíe como 'multipart/form-data'
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error al insertar producto:", error.response.data);
      throw new Error(
        `Error: ${
          error.response.data.error || "Error desconocido"
        }\nDetalles: ${
          error.response.data.details || "No hay detalles disponibles"
        }`
      );
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor:", error.request);
    } else {
      console.error("Error al configurar la solicitud:", error.message);
    }
    throw error;
  }
};

// Obtiene todos los productos desde la base de datos
export const obtenerProductos = async () => {
  try {
    const response = await axios.get("http://localhost:4000/obtenerProductos");
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

// Obtiene un producto específico por su ID
export const obtenerProductoPorId = async (idProducto) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/obtenerProductoPorId/${idProducto}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
    throw error;
  }
};
