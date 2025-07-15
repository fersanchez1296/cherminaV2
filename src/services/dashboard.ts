import getApi from "@/lib/axios";

export const busquedaAvanzada = async (criterio: string, termino: string) => {
  const api = await getApi();
  const result = await api.get(`tickets/${criterio}?termino=${termino}&criterio=${criterio}`);
  return result
};

export const dashboardCelulas = async () => {
  const api = await getApi();
  return await api.get(`dashboard/celulas/`);
};
