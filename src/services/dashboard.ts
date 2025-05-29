import api from "@/lib/axios";

export const busquedaAvanzada = async (criterio: string, termino: string) => {
  return await api.get(`tickets/${criterio}?termino=${termino}`);
};
