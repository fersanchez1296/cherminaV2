"use client";
import Button from "@/components/ui/button/Button";
import { useNotification } from "@/context/NotificationProvider";
import { downloadExcel } from "@/services/files";
import { useLoadingStore } from "@/stores/loadingStore";
import React from "react";

export default function SidebarWidget() {
    const setLoading = useLoadingStore((state) => state.setLoading);
const { showNotification } = useNotification();
    const fetchExcel = async () => {
      try {
        setLoading(true)
        const result = await downloadExcel();
        if (result) {
          showNotification("Éxito", "Excel descargado correctamente", "success");
        } else {
          showNotification("Error", "Ocurrió un error al generar el Excel", "error");
        }
      } catch (error) {
        showNotification("Error", "Ocurrio un error al general el excel", "error");
      }finally{
        setLoading(false)
      }
    }
  return (
    <div
      className="
        mx-auto mb-20 xl:mb-10 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]"
    >
      <Button size="sm" onClick={() => fetchExcel()}>
          Descargar Excel
        </Button>
    </div>
  );
}
