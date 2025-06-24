import api from "@/lib/axios";

export const getClients = async () => {
  return await api.get("clients/");
};

export const getInfoSelectsClientes = async () => {
  const res = await api.get("clients/selectData");
  return res.data;
};

export const postCrearCliente = async (data: object) => {
  const formatedData = {
    ...data,
  }
  if (data.Direccion_General) {
    formatedData.Direccion_General = data.Direccion_General
  }
  if (data.direccion_area) {
    formatedData.direccion_area = data.direccion_area
  }
  if (data.nuevaDArea) {
    formatedData.nuevaDArea = data.nuevaDArea;
  }
  if (data.nuevaDGeneral) {
    formatedData.nuevaDGeneral = data.nuevaDGeneral;
  }
  return await api.post("clients/", formatedData);
};

export const updateCliente = async (clientId: string, data: object) => {
  const formatedData = {
    ...data,
    Direccion_General: data.Direccion_General.value,
    direccion_area: data.direccion_area.value,
  }
  if (data.nuevaDArea) {
    formatedData.nuevaDArea = data.nuevaDArea;
  }
  if (data.nuevaDGeneral) {
    formatedData.nuevaDGeneral = data.nuevaDGeneral;
  }
  return await api.put(`clients/${clientId}`, formatedData);
};

export const getBuscarCliente = async (data: string) => {
  return await api.get(`clients/${data}`)
}
