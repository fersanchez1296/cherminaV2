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
import { createPuestos, updatePuestos } from "@/services/ticketService";
import { AxiosError } from "axios";
interface userProps {
  puesto: { value: string; label: string };
  disabled: boolean;
  isEdit?: boolean;
  isCreate?: boolean;
  onSuccess?: () => void;
  closeModal?: () => void;
}

export default function FormularioPuestos({
  puesto,
  disabled,
  isEdit,
  isCreate,
  onSuccess,
  closeModal,
}: userProps) {
  const [areaId, setAreaId] = useState("");
  const { handleSubmit, control } = useForm<{ puesto: string }>();
  const { showNotification } = useNotification();
  const setLoading = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    if (puesto) setAreaId(puesto.value);
  }, []);

  const onSubmit = async (data: { puesto: string }) => {
    try {
      setLoading(true);
      if (isCreate) {
        const result = await createPuestos(data);
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
        const result = await updatePuestos(areaId, data);
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
    } catch (error) {
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
        isCreate
          ? "Crear Puesto de Trabajo"
          : isEdit
            ? "Editar Puesto de Trabajo"
            : puesto?.label || "Puesto de Trabajo"
      }
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2">
          {/* nombre */}
          <div className="col-span-2 sm:col-span-2">
            <Label htmlFor="puesto">Puesto de Trabajo</Label>
            <Controller
              name="puesto"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              defaultValue={puesto?.label || ""}
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  placeholder="Ingresa el puesto de trabajo"
                  id="puesto"
                  disabled={disabled}
                  defaultValue={puesto?.label || ""}
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
                Guardar Puesto de Trabajo
              </Button>
            </div>
          )}
        </div>
      </Form>
    </ComponentCard>
  );
}
