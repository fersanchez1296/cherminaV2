import getApi from "@/lib/axios";

interface userProps {
  Ubicacion: string;
  Direccion: { Pais: string; Ciudad: string; codigoPostal: string };
  Nombre: string;
  Telefono: string;
  Extension: string;
  Celula?: { value: string; label: string }[];
  Area?: { value: string; label: string }[];
  Rol?: { value: string; label: string };
  Puesto?: { value: string; label: string };
  Direccion_General?: { label: string; value: string };
}

interface userFormatedProps {
  Ubicacion: string;
  Direccion: { Pais: string; Ciudad: string; codigoPostal: string };
  Nombre: string;
  Telefono: string;
  Extension: string;
  Celula?: string[];
  Area?: string[];
  Rol?: string;
  Puesto?: string;
  Direccion_General?: string;
}


// obtener todos los usuarios
export const getUsers = async () => {
  const api = await getApi();
  return await api.get("users/");
};

export const getUsersCelulas = async () => {
  const api = await getApi();
  return await api.get("users/celulas");
};

// actualizar el estado de un usuario <activo/inactivo>
export const updateEstadoUsuario = async (estado: boolean, userId: string) => {
  const api = await getApi();
  return await api.patch(`users/estado/${userId}`, { estado });
};

export const getInfoSelectsUsuario = async () => {
  const api = await getApi();
  return await api.get("users/getInfoSelectsUsuarios");
};

export const updateUsuario = async (userId: string, data: userProps) => {
  const api = await getApi();
  const formatedData: userFormatedProps = {
    Ubicacion: data.Ubicacion,
    Direccion: data.Direccion,
    Nombre: data.Nombre,
    Telefono: data.Telefono,
    Extension: data.Extension,
  };
  
  if (data.Celula) {
    formatedData.Celula = data.Celula.map((c) => c.value);
  }
  if (data.Area) {
    formatedData.Area = data.Area.map((c) => c.value);
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

  return await api.patch(`users/editar/${userId}`, formatedData);
};


export const postUsuario = async (data: userProps) => {
  const api = await getApi();
  const formatedData: userFormatedProps = {
    Ubicacion: data.Ubicacion,
    Direccion: data.Direccion,
    Nombre: data.Nombre,
    Telefono: data.Telefono,
    Extension: data.Extension,
  };

  if (data.Celula) {
    formatedData.Celula = data.Celula.map((c) => c.value);
  }
  if (data.Area) {
    formatedData.Area = data.Area.map((a) => a.value);
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


export const changePassword = async (userId: string, data: { Password: string, newPassword: string }) => {
  const api = await getApi();
  return await api.patch(`users/changepassword/${userId}`, { Password: data.Password, newPassword: data.newPassword })
}