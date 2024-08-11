import axios from 'axios';

export const insertarProducto = async (ProductoNuevo) => {
    try {
        const response = await axios.post('http://localhost:4000/insertarProducto', ProductoNuevo, {
            headers: {
                'Content-Type': 'multipart/form-data' // Asegúrate de enviar el contenido como 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error al insertar producto:', error.response.data);
            throw new Error(`Error: ${error.response.data.error || 'Error desconocido'}\nDetalles: ${error.response.data.details || 'No hay detalles disponibles'}`);
        } else if (error.request) {
            console.error('No se recibió respuesta del servidor:', error.request);
        } else {
            console.error('Error al configurar la solicitud:', error.message);
        }
        throw error;
    }
};
