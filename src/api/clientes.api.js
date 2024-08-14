import axios from 'axios';

export const insertarCliente = async (clienteNuevo) => {
    try {
        const response = await axios.post('http://localhost:4000/insertarCliente', clienteNuevo);
        return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error al insertar cliente:', error.response.data);
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor:', error.request);
    } else {
      console.error('Error al configurar la solicitud:', error.message);
    }
    throw error;
  }
};

// Función para actualizar un cliente existente
export const actualizarCliente = async (idCedula, clienteActualizado) => {
    try {
        const { Nombre, Apellido1, Apellido2 } = clienteActualizado;
        const response = await axios.put(`http://localhost:4000/actualizarCliente/${idCedula}`, {
            Nombre,
            Apellido1,
            Apellido2
        });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el cliente:", error);
        throw error;
    }
};

// Función para obtener un cliente por ID
export const obtenerClientePorId = async (idCedula) => {
    try {
        const response = await axios.get(`http://localhost:4000/obtenerCliente/${idCedula}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el cliente por ID:", error);
        throw error;
    }
};

// Función para obtener todos los clientes
export const obtenerClientes = async () => {
    try {
        const response = await axios.get('http://localhost:4000/persona');
        return response.data;
    } catch (error) {
        console.error("Error al obtener los clientes:", error);
        throw error;
    }
};

// Función para eliminar un cliente
export const eliminarCliente = async (idCedula) => {
    try {
        await axios.delete(`http://localhost:4000/eliminarCliente/${idCedula}`);
    } catch (error) {
        console.error("Error al eliminar el cliente:", error);
        throw error;
    }
};
