import { data } from "@/components/user-profile/intrface";
import getApi from "@/lib/axios";

export const getProfileInfo = async () => {
  const api = await getApi();
  return await api.get("users/perfil");
};

export const updateProfileInfo = async (id: string, data: Partial<data>) => {
  const api = await getApi();
  return await api.patch(`users/perfil/${id}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
