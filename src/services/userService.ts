import api from "@/lib/axios";

// obtener todos los usuarios
export const getUsers = async () => {
  return await api.get("users/");
};

// actualizar el estado de un usuario <activo/inactivo>
export const updateEstadoUsuario = async (estado: boolean, userId: string) => {
  return await api.put(`users/${userId}`, { estado });
};

export const getInfoSelectsUsuario = async () => {
  const res = await api.get("users/usuarios/roles");

  const areas = (res.data?.areas ?? []).map((item: any) => ({
    value: item._id,
    label: item.Area,
  }));

  const roles = (res.data?.roles ?? []).map((item: any) => ({
    value: item._id,
    label: item.Rol,
  }));

  return { areas, roles };
};

export const updateUsuario = async (userId: string, data: any) => {
  const formatedData = {
    ...data,
    Area: [data?.Area[0]?.value],
    Rol: data?.Rol?.value,
    Direccion: {
      Pais: data?.Pais,
      Ciudad: data?.Ciudad,
      codigoPostal: data?.codigoPostal,
    },
  };
  return await api.put(`users/editar/${userId}`, formatedData);
};
