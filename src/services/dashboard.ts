import api from "@/lib/axios";

export const busquedaAvanzada = async (criterio: string, termino: string) => {
  const result = await api.get(`tickets/${criterio}?termino=${termino}&criterio=${criterio}`);
  return result
};
