import api from "@/lib/axios";

export const getTickets = async (estado: string) => {
  console.log(estado);
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
