import axios from "axios";

export const inicioSesion = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:3001/IniciarS", {
      idUsuario: username,
      contrasena: password,
    });
    return response;
  } catch (error) {
    console.error("Error en la solicitud de inicio de sesión:", error);
    throw error;
  }
};
