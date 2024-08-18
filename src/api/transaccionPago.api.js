// src/api/transaccion.api.js
import axios from "axios";

export const guardarTransaccion = async (transaccionData) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/guardarTransaccion",
      transaccionData
    );
    return response.data;
  } catch (error) {
    console.error("Error al guardar la transacción:", error);
    throw error;
  }
};
