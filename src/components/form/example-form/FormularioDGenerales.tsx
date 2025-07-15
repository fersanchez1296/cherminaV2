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
import { createDGenerales, updateDGenerales } from "@/services/ticketService";
import { AxiosError } from "axios";
interface userProps {
  dgeneral: { value: string; label: string };
  disabled: boolean;
  isEdit?: boolean;
  isCreate?: boolean;
  onSuccess?: () => void;
  closeModal?: () => void;
}

export default function FormularioDGenerales({
  dgeneral,
  disabled,
  isEdit,
  isCreate,
  onSuccess,
  closeModal,
}: userProps) {
  const [areaId, setAreaId] = useState("");
  const { handleSubmit, control } = useForm<{ dgeneral: string }>();
  const { showNotification } = useNotification();
  const setLoading = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    if (dgeneral) setAreaId(dgeneral.value);
  }, []);

  const onSubmit = async (data: { dgeneral: string }) => {
    try {
      setLoading(true);
      if (isCreate) {
        const result = await createDGenerales(data);
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
        const result = await updateDGenerales(areaId, data);
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
          ? "Crear Dirección General"
          : isEdit
            ? "Editar Dirección General"
            : dgeneral?.label || "Dirección General"
      }
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2">
          {/* nombre */}
          <div className="col-span-2 sm:col-span-2">
            <Label htmlFor="dgeneral">Dirección General</Label>
            <Controller
              name="dgeneral"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              defaultValue={dgeneral?.label || ""}
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  placeholder="Ingresa la dirección general a registrar"
                  id="dgeneral"
                  disabled={disabled}
                  defaultValue={dgeneral?.label || ""}
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
                Guardar Dirección General
              </Button>
            </div>
          )}
        </div>
      </Form>
    </ComponentCard>
  );
}
