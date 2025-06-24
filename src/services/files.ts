import api from "@/lib/axios";

export const downloadFile = async (filename: string) => {
    return await api.get(`files/uploads/${filename}`);
};
