import api from "@/lib/axios";

export const getUsers = async () => {
  return await api.get("users/");
};
