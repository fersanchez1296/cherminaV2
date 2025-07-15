import getApi from "@/lib/axios";

export const downloadFile = async (filename: string) => {
    const api = await getApi();
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

export const downloadExcel = async () => {
    const api = await getApi();
    try {
        const response = await api.get(`tickets/export/excel`, {
            responseType: 'blob',
        });

        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Excel-${Date.now()}.xlsx`);
        document.body.appendChild(link);
        link.click();

        // limpieza
        link.remove();
        window.URL.revokeObjectURL(url);

        return true;
    } catch (error) {
        return false
        console.error("Error al descargar el archivo:", error);
    }
};
