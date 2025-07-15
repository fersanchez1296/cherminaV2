import getApi from "@/lib/axios";

export const getLogs = async () => {
    const api = await getApi();
    return await api.get(`logs/`);
};

