import getApi from "@/lib/axios";
export const getCorreosPendientes = async (estado: string) => {
  const api = await getApi();
  try {
    const response = await api.get(`email/${estado}`);
    console.log("response", response);
    return response;
  } catch (error) {
    console.error("Error al obtener la fila de correos:", error);
    throw error;
  }
};

export const ReenviarCorreo = async (_id: string) => {
  const api = await getApi();
  try {
    const response = await api.post(`email/reenvio/${_id}`);
    console.log("response", response);
    return response;
  } catch (error) {
    console.error("Error al reenviar el correo:", error);
    return false;
  }
};

export const ReenviarTodo = async () => {
  const api = await getApi();
  try {
    const response = await api.post(`email/reenvio`);
    console.log("response", response);
    return response;
  } catch (error) {
    console.error("Error al reenviar los correos:", error);
    return false;
  }
};