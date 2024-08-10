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

export const eliminarCliente = async (idCedula) => {
  try {
      const response = await axios.delete(`http://localhost:4000/eliminarCliente/${idCedula}`);
      return response.data;
  } catch (error) {
      if (error.response) {
          console.error('Error al eliminar cliente:', error.response.data);
      } else if (error.request) {
          console.error('No se recibió respuesta del servidor:', error.request);
      } else {
          console.error('Error al configurar la solicitud:', error.message);
      }
      throw error;
  }
};

export const actualizarCliente = async (clienteActualizado) => {
  try {
      const response = await axios.put('http://localhost:4000/actualizarCliente', clienteActualizado, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      return response.data;
  } catch (error) {
      if (error.response) {
          console.error('Error al actualizar cliente:', error.response.data);
      } else if (error.request) {
          console.error('No se recibió respuesta del servidor:', error.request);
      } else {
          console.error('Error al configurar la solicitud:', error.message);
      }
      throw error; // Re-lanza el error para que pueda ser manejado por el llamador
  }
};