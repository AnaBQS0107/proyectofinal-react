import axios from "axios";

export const ingresarEmpleado = async (empleadoNuevo) =>

    await axios.post('http://localhost:4000/insertarEmpleado', empleadoNuevo);

export const actualizarEmpleado = async (idCedula, empleadoActualizado) => {
    try {
        const { Nombre, Apellido1, Apellido2, ContraseñaHash } = empleadoActualizado;
        const response = await axios.put(`http://localhost:4000/editarEmpleado/${idCedula}`, {
            Nombre,
            Apellido1,
            Apellido2,
            ContraseñaHash
        });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el empleado:", error);
        throw error; 
    }
};


export const obtenerEmpleadoporId = async (empleadosId) =>
    await axios.get('http://localhost:4000/editarEmpleado/${idCedula}', empleadosId);


export const ObtenerEmpleados = async () => {
    const response = await axios.get('http://localhost:4000/obtenerEmpleados');
    return response.data; 
};

export const EliminarEmpleado = async (cedula) => {
    try {
        await axios.delete(`http://localhost:4000/eliminarEmpleado/${cedula}`);
    } catch (error) {
        console.error("Error al eliminar el empleado:", error);
        throw error; 
    }
};

  await axios.post("http://localhost:4000/insertarEmpleado", empleadoNuevo);

