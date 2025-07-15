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
import {  createDAreas, updateDAreas } from "@/services/ticketService";
import { AxiosError } from "axios";
interface userProps {
  darea: {value: string, label: string};
  disabled: boolean;
  isEdit?: boolean;
  isCreate?: boolean;
  onSuccess?: () => void;
  closeModal?: () => void;
}

export default function FormularioDAreas({
  darea,
  disabled,
  isEdit,
  isCreate,
  onSuccess,
  closeModal,
}: userProps) {
  const [areaId, setAreaId] = useState("");
  const { handleSubmit, control } = useForm<{darea: string}>();
  const { showNotification } = useNotification();
  const setLoading = useLoadingStore((state) => state.setLoading);

    useEffect(() => {
        if(darea) setAreaId(darea.value)
    },[])

  const onSubmit = async (data: {darea: string}) => {
    try {
      setLoading(true);
      if (isCreate) {
        const result = await createDAreas(data);
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
        const result = await updateDAreas(areaId, data);
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
          ? "Crear Dirección de Área"
          : isEdit
          ? "Editar Dirección de Área"
          : darea?.label || "Dirección de Área"
      }
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2">
          {/* nombre */}
          <div className="col-span-2 sm:col-span-2">
            <Label htmlFor="darea">Dirección de Área</Label>
            <Controller
              name="darea"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              defaultValue={darea?.label || ""}
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  placeholder="Ingresa la dirección de área a registrar"
                  id="darea"
                  disabled={disabled}
                  defaultValue={darea?.label || ""}
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
                Guardar Dirección de Área
              </Button>
            </div>
          )}
        </div>
      </Form>
    </ComponentCard>
  );
}
