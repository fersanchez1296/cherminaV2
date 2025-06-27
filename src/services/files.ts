import api from "@/lib/axios";

export const downloadFile = async (filename: string) => {
    try {
        const response = await api.get(`files/uploads/${filename}`, {
            responseType: 'blob',
        });

        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();

        // limpieza
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error al descargar el archivo:", error);
    }
};
