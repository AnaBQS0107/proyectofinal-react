import axios from "axios";

export const ingresarEmpleado = async (empleadoNuevo) => {
  return await axios.post(
    "http://localhost:4000/insertarEmpleado",
    empleadoNuevo
  );
};

export const actualizarEmpleado = async (Cedula, empleadoActualizado) => {
  try {
    const { Nombre, Apellido1, Apellido2, ContraseñaHash } =
      empleadoActualizado;
    console.log("Data being sent for update:", {
      Nombre,
      Apellido1,
      Apellido2,
      ContraseñaHash,
    });
    const response = await axios.put(
      `http://localhost:4000/editarEmpleado/${Cedula}`,
      {
        Nombre,
        Apellido1,
        Apellido2,
        ContraseñaHash,
      }
    );
    console.log("API response:", response.data); // Log the actual API response
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el empleado:", error);
    throw error;
  }
};

export const obtenerEmpleadoporId = async (Cedula) => {
  return await axios.get(`http://localhost:4000/editarEmpleado/${Cedula}`);
};

export const ObtenerEmpleados = async () => {
  const response = await axios.get("http://localhost:4000/obtenerEmpleados");
  return response.data;
};

export const EliminarEmpleado = async (Cedula) => {
  try {
    await axios.delete(`http://localhost:4000/eliminarEmpleado/${Cedula}`);
  } catch (error) {
    console.error("Error al eliminar el empleado:", error);
    throw error;
  }
};
