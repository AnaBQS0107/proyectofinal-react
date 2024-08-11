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

export const fetchUsers = async () => {
  try {
      const response = await axios.get(`http://localhost:4000/insertarCliente`);
      return response.data;
  } catch (error) {
      console.error('Error al cargar usuarios:', error);
      if (error.response) {
          // La solicitud se hizo y el servidor respondió con un estado diferente a 2xx
          console.error('Datos de error del servidor:', error.response.data);
          console.error('Estado de error:', error.response.status);
          console.error('Encabezados de error:', error.response.headers);
      } else if (error.request) {
          // La solicitud se hizo pero no se recibió respuesta
          console.error('No se recibió respuesta del servidor:', error.request);
      } else {
          // Algo ocurrió al configurar la solicitud
          console.error('Error al configurar la solicitud:', error.message);
      }
      throw error;
  }
};


