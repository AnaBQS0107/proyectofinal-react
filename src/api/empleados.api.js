import axios from "axios";

export const ingresarEmpleado = async (empleadoNuevo) =>
  await axios.post("http://localhost:3001/insertarEmpleado", empleadoNuevo);
