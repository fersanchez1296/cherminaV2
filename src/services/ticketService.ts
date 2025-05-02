import api from "@/lib/axios";

export const getTickets = async (estado: string) => {
  return await api.get(`tickets/estado/${estado}`);
};
