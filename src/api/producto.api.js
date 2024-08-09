import axios from 'axios';

export const insertarProducto = async (ProductoNuevo) => {
    try {
        const response = await axios.post('http://localhost:4000/insertarProducto', ProductoNuevo);
        return response.data; 
    } catch (error) {
        console.error('Error al insertar cliente:', error);
        throw error; 
    }
};
