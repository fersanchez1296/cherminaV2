import getApi from "@/lib/axios";

export const getNotificaciones = async (leido: string, userId: string) => {
    const api = await getApi();
    const result = await api.get(`notificaciones/?leido=${leido}&userId=${userId}`);
    return result
};

export const marcarLeida = async (ticketId: string) => {
    const api = await getApi();
    const result = await api.put(`notificaciones/${ticketId}`);
    return result
};
