import api from "@/lib/axios";

export const getClients = async () => {
  return await api.get("clients/");
};

export const getInfoSelectsClientes = async () => {
  const res = await api.get("clients/selectData");
  return res.data;
};

export const postCrearCliente = async (data: object) => {
  return await api.post("clients/", data);
};

export const updateCliente = async (clientId: string, data: object) => {
  return await api.put(`clients/${clientId}`, data);
};

export const getBuscarCliente = async (data: string) => {
  return await api.get(`clients/${data}`)
}
