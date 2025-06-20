import api from "@/lib/axios";

// obtener todos los usuarios
export const getUsers = async () => {
  return await api.get("users/");
};

export const getUsersCelulas = async () => {
  return await api.get("users/celulas");
};

// actualizar el estado de un usuario <activo/inactivo>
export const updateEstadoUsuario = async (estado: boolean, userId: string) => {
  return await api.patch(`users/estado/${userId}`, { estado });
};

export const getInfoSelectsUsuario = async () => {
  return await api.get("users/getInfoSelectsUsuarios");
};

export const updateUsuario = async (userId: string, data: any) => {
  const formatedData = {
    ...data,
  }
  if (data.Celula) {
    formatedData.Celula = data.Celula.map((c) => c.value)
  }
  if (data.Area) {
    formatedData.Area = data.Area.map((c) => c.value)
  }
  if (data.Rol) {
    formatedData.Rol = data.Rol.value;
  }
  if (data.Puesto) {
    formatedData.Puesto = data.Puesto.value;
  }
  if (data.Direccion_General) {
    formatedData.Direccion_General = data.Direccion_General.value;
  }

  console.log(formatedData)
  return await api.patch(`users/editar/${userId}`, formatedData);
};

export const postUsuario = async (data: any) => {
  const formatedData = {
    ...data,
  }
  if (data.Celula) {
    formatedData.Celula = data.Celula.map((c) => c.value)
  }
  if (data.Area) {
    formatedData.Area = data.Area.map((c) => c.value)
  }
  if (data.Rol) {
    formatedData.Rol = data.Rol.value;
  }
  if (data.Puesto) {
    formatedData.Puesto = data.Puesto.value;
  }
  if (data.Direccion_General) {
    formatedData.Direccion_General = data.Direccion_General.value;
  }

  return await api.post(`users/`, formatedData);
};