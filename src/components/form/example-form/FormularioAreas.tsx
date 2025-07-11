"use client";
import React, { useState, useEffect } from "react";
import ComponentCard from "../../common/ComponentCard";
import Form from "../Form";
import Label from "../Label";
import Input from "../input/InputField";
import Button from "../../ui/button/Button";
import { useForm, Controller } from "react-hook-form";
import { useNotification } from "@/context/NotificationProvider";
import { useLoadingStore } from "@/stores/loadingStore";
import { createAreas, updateAreas } from "@/services/ticketService";
import { AxiosError } from "axios";
interface userProps {
  area: { value: string; label: string };
  disabled: boolean;
  isEdit?: boolean;
  isCreate?: boolean;
  onSuccess?: () => void;
  closeModal?: () => void;
}

export default function FormularioAreas({
  area,
  disabled,
  isEdit,
  isCreate,
  onSuccess,
  closeModal,
}: userProps) {
  const [areaId, setAreaId] = useState("");
  const { handleSubmit, control } = useForm<{ area: string }>();
  const { showNotification } = useNotification();
  const setLoading = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    if (area) setAreaId(area.value);
  }, []);

  const onSubmit = async (data: { area: string; }) => {
    try {
      setLoading(true);
      if (isCreate) {
        const result = await createAreas(data);
        if (result.status === 201) {
          onSuccess?.();
          closeModal?.();
          showNotification(
            "Éxito",
            result.data?.message || "Operación exitosa",
            "success"
          );
          //reset();
        } else {
          showNotification(
            "Aviso",
            result.data?.desc || "Respuesta inesperada del servidor",
            "warning"
          );
        }
        onSuccess?.();
        closeModal?.();
      }
      if (isEdit) {
        const result = await updateAreas(areaId, data);
        if (result.status === 200) {
          onSuccess?.();
          closeModal?.();
          showNotification(
            "Éxito",
            result.data?.message || "Operación exitosa",
            "success"
          );
          //reset();
        } else {
          showNotification(
            "Aviso",
            result.data?.desc || "Respuesta inesperada del servidor",
            "warning"
          );
        }
      }
    } catch (error: unknown) {
      let message = "Ocurrió un error inesperado.";
      if (error instanceof AxiosError && error.response?.data?.desc) {
        message = error.response.data.desc;
      }
      showNotification("Error", message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ComponentCard
      title={
        isCreate ? "Crear Área" : isEdit ? "Editar Área" : area?.label || "Área"
      }
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2">
          {/* nombre */}
          <div className="col-span-2 sm:col-span-2">
            <Label htmlFor="area">Área</Label>
            <Controller
              name="area"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              defaultValue={area?.label || ""}
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  placeholder="Ingresa el área a registrar"
                  id="area"
                  disabled={disabled}
                  defaultValue={area?.label || ""}
                  {...field}
                  error={!!fieldState.error}
                  hint={fieldState.error?.message}
                />
              )}
            />
          </div>
          {(isEdit || isCreate) && (
            <div className="col-span-2">
              <Button size="sm" className="w-full" type="submit">
                Guardar Área
              </Button>
            </div>
          )}
        </div>
      </Form>
    </ComponentCard>
  );
}
