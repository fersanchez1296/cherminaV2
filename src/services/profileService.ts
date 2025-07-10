import { data } from "@/components/user-profile/intrface";
import api from "@/lib/axios";

export const getProfileInfo = async () => {
  return await api.get("users/perfil");
};

export const updateProfileInfo = async (id: string, data: Partial<data>) => {
  return await api.patch(`users/perfil/${id}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
