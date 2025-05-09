import api from "@/lib/axios";

export const getClients = async () => {
  return await api.get("clients/");
};

export const getInfoSelectsClientes = async () => {
  const res = await api.get("clients/selectData");

  const dareas = (res.data?.dareas ?? []).map((item: any) => ({
    value: item._id,
    label: item.direccion_area,
  }));

  const dgenerales = (res.data?.dgenerales ?? []).map((item: any) => ({
    value: item._id,
    label: item.Direccion_General,
  }));

  return { dareas, dgenerales };
};

export const postCrearCliente = async (data: object) => {
  return await api.post("clients/", data);
};

export const updateCliente = async (clientId: string, data: object) => {
  return await api.put(`clients/${clientId}`, data);
};
