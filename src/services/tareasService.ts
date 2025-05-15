import api from "@/lib/axios";

export const getTareas = async (estado: string) => {
  let estadoTarea = "";
  switch (estado) {
    case "curso":
      estadoTarea = "ABIERTOS";
      break;
    case "nuevo":
      estadoTarea = "NUEVOS";
      break;
    case "resuelto":
      estadoTarea = "RESUELTOS";
      break;
    default:
      break;
  }
  return await api.get(`tareas/${estadoTarea}`);
};
