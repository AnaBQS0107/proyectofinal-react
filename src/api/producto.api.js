import axios from 'axios';
const BASE_URL = 'http://localhost:4000';

export const insertarProducto = async (ProductoNuevo) => {
    try {
        const response = await axios.post('http://localhost:4000/insertarProducto', ProductoNuevo, {
            headers: {
                'Content-Type': 'multipart/form-data'
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


export const actualizarProducto = async (idProducto, productoActualizado) => {
    try {
        const { Nombre, Imagen, Stock, Precio, PrecioIVA, CatalogoEstantes_idCatalogoEstantes } = productoActualizado;
        const response = await axios.put(`${BASE_URL}/editarProducto/${idProducto}`, {
            nombre: Nombre, 
            imagen: Imagen,
            stock: Stock,
            precio: Precio,
            precioIVA: PrecioIVA,
            catalogoEstantesId: CatalogoEstantes_idCatalogoEstantes
        });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el producto:', error.response?.data || error.message);
        throw error;
    }
};


export const obtenerProductoPorId = async (idProducto) => {
    try {
        const response = await axios.get(`${BASE_URL}/obtenerProducto/${idProducto}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        throw error;
    }
};


export const ObtenerProductos = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/obtenerProductos`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        throw error;
    }
};

export const EliminarProducto = async (idProducto) => {
    try {
        await axios.delete(`http://localhost:4000/eliminarProductos/${idProducto}`);
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        throw error;
    }
};
