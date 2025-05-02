import api from "@/lib/axios";

export const getClients = async () => {
  return await api.get("clients/");
};
