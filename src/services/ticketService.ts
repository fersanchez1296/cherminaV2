import api from "@/lib/axios";
import { da } from "date-fns/locale";

interface Categorizacion {
  _id: string;
  Servicio: string;
  Categoría: string;
  Subcategoria: string;
  Tipo: string;
  Prioridad: string;
  Equipo: {
    _id: string;
    Area: string;
    Tipo_de_incidencia: string;
  };
}

interface SelectsCrearTicket {
  resolutores: GroupedOption[];
  medios: Option[];
  subcategorias: Categorizacion[];
}

interface Option {
  value: string;
  label: string;
}

interface GroupedOption {
  label: string;
  options: Option[];
}

export const getTickets = async (estado: string) => {
  let estadoTicket = "";
  switch (estado) {
    case "curso":
      estadoTicket = "ABIERTOS";
      break;
    case "nuevo":
      estadoTicket = "NUEVOS";
      break;
    case "reabierto":
      estadoTicket = "REABIERTOS";
      break;
    case "pendiente":
      estadoTicket = "PENDIENTES";
      break;
    case "revision":
      estadoTicket = "REVISION";
      break;
    case "mesaServicio":
      estadoTicket = "STANDBY";
      break;
    case "resuelto":
      estadoTicket = "RESUELTOS";
      break;
    case "cerrado":
      estadoTicket = "CERRADOS";
      break;
    default:
      break;
  }
  return await api.get(`tickets/estado/${estadoTicket}`);
};

export const getTicket = async (id: string) => {
  return await api.get(`tickets/${id}`);
};

export const putNota = async (
  data: { Descripcion: string; Files?: File[] },
  ticketId?: string
) => {
  const formData = new FormData();
  const auxData = {
    Nota: data.Descripcion,
  };

  Object.entries(auxData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  if (data.Files) {
    Object.entries(data).forEach(([key, value]) => {
      if (key === "Files" && Array.isArray(value)) {
        value.forEach((file) => {
          if (file instanceof File) {
            formData.append("files", file);
          } else {
            console.error(`El archivo no es válido:`, file);
          }
        });
      }
    });
  };
  // formData.forEach((value, key) => {
  //   console.log(`${key}:`, value);
  // });
  return await api.put(`tickets/nota/${ticketId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const putResolverTicket = async (
  data: { Respuesta_cierre_reasignado: string; Files?: File[] },
  ticketId?: string,
  vistoBueno?: string
) => {
  const formData = new FormData();
  const auxData = {
    Respuesta_cierre_reasignado: data.Respuesta_cierre_reasignado,
    Files: data.Files,
    vistoBueno: vistoBueno,
  };

  Object.entries(auxData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  if (data.Files) {
    Object.entries(data).forEach(([key, value]) => {
      if (key === "Files" && Array.isArray(value)) {
        value.forEach((file) => {
          if (file instanceof File) {
            formData.append("files", file);
          } else {
            console.error(`El archivo no es válido:`, file);
          }
        });
      }
    });
  };
  formData.forEach((value, key) => {
    console.log(`${key}:`, value);
  });
  return await api.put(`tickets/resolver/${ticketId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const putContactoCliente = async (
  data: { cuerpoCorreo: string; Files?: File[]; emailsExtra: string },
  ticketId: string
) => {
  const { cuerpoCorreo, emailsExtra } = data;

  const emailsArray = emailsExtra
    .split(",")
    .map(email => email.trim())
    .filter(email => email !== "");

  const formData = new FormData();
  formData.append("cuerpoCorreo", cuerpoCorreo);

  emailsArray.forEach(email => {
    formData.append("emailsExtra", email);
  });

  if (data.Files) {
    data.Files.forEach((file) => {
      if (file instanceof File) {
        formData.append("files", file);
      } else {
        console.error("El archivo no es válido:", file);
      }
    });
  }

  return await api.put(`tickets/contactoCliente/${ticketId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getCorreosCliente = async (ticketId: string) => {
  return await api.get(`tickets/correos/${ticketId}`);
};

export const putCerrarTicket = async (
  data: { Descripcion_cierre: string; Files?: File[] },
  ticketId?: string
) => {
  const formData = new FormData();
  const auxData = {
    Descripcion_cierre: data.Descripcion_cierre,
  };

  Object.entries(auxData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  if (data.Files) {
    data.Files.forEach((file) => {
      if (file instanceof File) {
        formData.append("files", file);
      } else {
        console.error(`El archivo no es válido:`, file);
      }
    });
  };

  formData.forEach((value, key) => {
    console.log(`${key}:`, value);
  });
  return await api.put(`tickets/cerrar/${ticketId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const putRazonPendiente = async (
  data: { PendingReason: string },
  ticketId: string
) => {
  const queryData = { PendingReason: data.PendingReason };
  return await api.put(`tickets/PendingReason/${ticketId}`, queryData);
};

export const putRegresarMesa = async (
  data: { descripcion_retorno: string; Files?: File[] },
  ticketId?: string
) => {
  const formData = new FormData();
  const auxData = {
    descripcion_retorno: data.descripcion_retorno,
  };

  Object.entries(auxData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  if (data.Files) {
    Object.entries(data).forEach(([key, value]) => {
      if (key === "Files" && Array.isArray(value)) {
        value.forEach((file) => {
          if (file instanceof File) {
            formData.append("files", file);
          } else {
            console.error(`El archivo no es válido:`, file);
          }
        });
      }
    });
  };
  return await api.put(`tickets/retornoMesa/${ticketId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const putRegresarModerador = async (
  data: { descripcion_retorno: string; Files?: File[] },
  ticketId?: string
) => {
  const formData = new FormData();
  const auxData = {
    descripcion_retorno: data.descripcion_retorno,
  };

  Object.entries(auxData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  if (data.Files) {
    Object.entries(data).forEach(([key, value]) => {
      if (key === "Files" && Array.isArray(value)) {
        value.forEach((file) => {
          if (file instanceof File) {
            formData.append("files", file);
          } else {
            console.error(`El archivo no es válido:`, file);
          }
        });
      }
    });
  };
  return await api.put(`tickets/retornoModerador/${ticketId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const putAceptarResolucion = async (
  data: { Nombre: string },
  ticketId?: string
) => {
  const Nombre = data.Nombre;
  return await api.put(`tickets/resolver/aceptar/${ticketId}`, { Nombre });
};

export const putRechazarResolucion = async (
  data: { feedback: string; Nombre: string; Files?: File[] },
  ticketId?: string
) => {
  const formData = new FormData();
  const auxData = {
    feedback: data.feedback,
    Nombre: data.Nombre,
  };

  Object.entries(auxData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  if (data.Files) {
    Object.entries(data).forEach(([key, value]) => {
      if (key === "Files" && Array.isArray(value)) {
        value.forEach((file) => {
          if (file instanceof File) {
            formData.append("files", file);
          } else {
            console.error(`El archivo no es válido:`, file);
          }
        });
      }
    });
  };
  return await api.put(`tickets/resolver/rechazar/${ticketId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const putRegresarResolutor = async (
  data: { Descripcion_respuesta_cliente: string; Files?: File[]; },
  ticketId?: string
) => {
  const formData = new FormData();
  const auxData = {
    Descripcion_respuesta_cliente: data.Descripcion_respuesta_cliente,
  };

  Object.entries(auxData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  if (data.Files) {
    data.Files.forEach((file) => {
      if (file instanceof File) {
        formData.append("files", file);
      } else {
        console.error(`El archivo no es válido:`, file);
      }
    });
  };

  formData.forEach((value, key) => {
    console.log(`${key}:`, value);
  });
  return await api.put(`tickets/regresar/${ticketId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const putTicketPendiente = async (
  data: { cuerpoCorreo: string; Files?: File[]; emailsExtra: string },
  ticketId: string
) => {
  const { cuerpoCorreo, emailsExtra } = data;

  const emailsArray = emailsExtra
    .split(",")
    .map(email => email.trim())
    .filter(email => email !== "");

  const formData = new FormData();
  formData.append("cuerpoCorreo", cuerpoCorreo);

  emailsArray.forEach(email => {
    formData.append("emailsExtra", email);
  });

  if (data.Files) {
    data.Files.forEach((file) => {
      if (file instanceof File) {
        formData.append("files", file);
      } else {
        console.error("El archivo no es válido:", file);
      }
    });
  }

  return await api.put(`tickets/pendiente/${ticketId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getResolutores = async (): Promise<GroupedOption[]> => {
  try {
    const response = await api.get("tickets/reabrir/fields");
    const moderadores = response.data.moderadores;

    const groupedOptions: GroupedOption[] = moderadores.map((mod: any) => ({
      label: mod.area.area,
      options: mod.resolutores.map((res: any) => ({
        value: res._id,
        label: res.Nombre,
      })),
    }));

    return groupedOptions;
  } catch (error) {
    console.error("Error al obtener los resolutores:", error);
    return [];
  }
};

export const putAsignar = async (
  data: {
    Asignado_a: { label: string; value: string };
    Nota?: string[];
    Files?: File[];
    Cliente?: any;
  },
  ticketId?: string
) => {
  const formData = new FormData();
  const auxData = {
    Asignado_a: data.Asignado_a?.value,
    Nota: data.Nota,
    Cliente: data.Cliente._id,
  };

  Object.entries(auxData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  if (data.Files) {
    Object.entries(data).forEach(([key, value]) => {
      if (key === "Files" && Array.isArray(value)) {
        value.forEach((file) => {
          if (file instanceof File) {
            formData.append("files", file);
          } else {
            console.error(`El archivo no es válido:`, file);
          }
        });
      }
    });
  };
  formData.forEach((value, key) => {
    console.log(`${key}:`, value);
  });
  return await api.put(`tickets/asignar/${ticketId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const putReasignar = async (
  data: {
    Reasignado_a: { label: string; value: string };
    vistoBueno: boolean;
    Nota?: string[];
    Files?: File[];
  },
  ticketId?: string
) => {
  const formData = new FormData();
  const auxData = {
    Reasignado_a: data.Reasignado_a?.value,
    Nota: data.Nota,
    vistoBueno: data.vistoBueno,
  };

  Object.entries(auxData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  if (data.Files) {
    Object.entries(data).forEach(([key, value]) => {
      if (key === "Files" && Array.isArray(value)) {
        value.forEach((file) => {
          if (file instanceof File) {
            formData.append("files", file);
          } else {
            console.error(`El archivo no es válido:`, file);
          }
        });
      }
    });
  };

  return await api.put(`tickets/reasignar/${ticketId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const putReabrir = async (
  data: {
    Asignado_a: { label: string; value: string };
    Nota?: string[];
    Files?: File[];
  },
  ticketId?: string
) => {
  const formData = new FormData();
  const auxData = {
    Asignado_a: data.Asignado_a?.value,
    Nota: data.Nota,
  };

  Object.entries(auxData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  if (data.Files) {
    Object.entries(data).forEach(([key, value]) => {
      if (key === "Files" && Array.isArray(value)) {
        value.forEach((file) => {
          if (file instanceof File) {
            formData.append("files", file);
          } else {
            console.error(`El archivo no es válido:`, file);
          }
        });
      }
    });
  };
  return await api.put(`tickets/reabrir/${ticketId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getSelectsCrearTicket = async (): Promise<SelectsCrearTicket> => {
  try {
    const response = await api.get("tickets/crear/getInfoSelects");
    const groupedOptions: GroupedOption[] = response.data.resolutores;

    return {
      resolutores: groupedOptions,
      medios: response.data.medios,
      subcategorias: response.data.categorizacion,
    };
  } catch (error) {
    console.error("Error al obtener los resolutores:", error);
    return {
      resolutores: [],
      medios: [],
      subcategorias: [],
    };
  }
};

export const postCrearTicket = async (data: {
  Asignado_a: { label: string; value: string };
  Cliente: string;
  Descripcion: string;
  Medio: { value: string; label: string };
  NumeroRec_Oficio: string;
  Subcategoria: { _id: string };
  tiempo: number;
  Files?: File[];
}) => {
  const formData = new FormData();
  const auxData = {
    Asignado_a: data.Asignado_a?.value,
    Medio: data.Medio?.value,
    Subcategoria: data.Subcategoria._id,
    Tiempo: data.tiempo,
    Cliente: data.Cliente,
    Descripcion: data.Descripcion,
    NumeroRec_Oficio: data.NumeroRec_Oficio,
  };

  Object.entries(auxData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  if (data.Files) {
    Object.entries(data).forEach(([key, value]) => {
      if (key === "Files" && Array.isArray(value)) {
        value.forEach((file) => {
          if (file instanceof File) {
            formData.append("files", file);
          } else {
            console.error(`El archivo no es válido:`, file);
          }
        });
      }
    });
  }
  return await api.post(`tickets/crear/ticket`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getTicketByParameter = async (parameter: string) => {
  return await api.post(`tickets/buscar/${parameter}`);
};
