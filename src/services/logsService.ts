import api from "@/lib/axios";

export const getLogs = async () => {
    return await api.get(`logs/`);
};

