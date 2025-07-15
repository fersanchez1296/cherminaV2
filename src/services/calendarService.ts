import getApi from "@/lib/axios";
export const getCalendarEvents = async () => {
  const api = await getApi();
  return await api.get("tickets/calendario");
};
