import api from "@/lib/axios";

export const getNotificaciones = async (leido: string, userId: string) => {
    const result = await api.get(`notificaciones/?leido=${leido}&userId=${userId}`);
    return result
};

export const marcarLeida = async (ticketId: string) => {
    const result = await api.put(`notificaciones/${ticketId}`);
    return result
};
