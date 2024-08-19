import axios from "axios";

export const insertarCliente = async (clienteNuevo) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/insertarCliente",
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

// Función para actualizar un cliente existente
export const actualizarCliente = async (Cedula, clienteActualizado) => {
  try {
    const { Nombre, Apellido1, Apellido2 } = clienteActualizado;
    const response = await axios.put(
      `http://localhost:4000/actualizarCliente/${Cedula}`,
      {
        Nombre,
        Apellido1,
        Apellido2,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
    throw error;
  }
};

// Función para obtener un cliente por ID
export const obtenerClientePorId = async (Cedula) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/obtenerCliente/${Cedula}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente por ID:", error);
    throw error;
  }
};

// Función para eliminar un cliente
export const eliminarCliente = async (Cedula) => {
  try {
    await axios.delete(`http://localhost:4000/eliminarCliente/${Cedula}`);
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    throw error;
  }
};
export const obtenerClientes = async () => {
  try {
    const response = await axios.get("http://localhost:4000/obtenerClientes");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    throw error;
  }
};
