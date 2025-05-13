import api from "@/lib/axios";

export const getCalendarEvents = async () => {
  return await api.get("tickets/calendario");
};
