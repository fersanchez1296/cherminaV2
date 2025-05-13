import api from "@/lib/axios";

export const getProfileInfo = async () => {
  return await api.get("tickets/perfil");
};
