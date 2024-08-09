import axios from 'axios';

export const insertarCliente = async (clienteNuevo) => {
    try {
        const response = await axios.post('http://localhost:4000/insetarCliente', clienteNuevo);
        return response.data; 
    } catch (error) {
        console.error('Error al insertar cliente:', error);
        throw error; 
    }
};
