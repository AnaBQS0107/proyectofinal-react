import axios from 'axios';

export const insertarProducto = async (ProductoNuevo) => {
    try {
        const response = await axios.post('http://localhost:4000/insertarProducto', ProductoNuevo);
        return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Error al insertar producto:', error.response.data.error);
        throw new Error(error.response.data.error); 
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor:', error.request);
      } else {
        console.error('Error al configurar la solicitud:', error.message);
      }
      throw error; 
    }
  };