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
import {  createDependencias, updateDependencias } from "@/services/ticketService";
interface userProps {
  dependencia: {value: string, label: string};
  disabled: boolean;
  isEdit?: boolean;
  isCreate?: boolean;
  onSuccess?: () => void;
  closeModal?: () => void;
}

export default function FormularioDependencias({
  dependencia,
  disabled,
  isEdit,
  isCreate,
  onSuccess,
  closeModal,
}: userProps) {
  const [areaId, setAreaId] = useState("");
  const { handleSubmit, control } = useForm();
  const { showNotification } = useNotification();
  const setLoading = useLoadingStore((state) => state.setLoading);

    useEffect(() => {
        if(dependencia) setAreaId(dependencia.value)
    },[])

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (isCreate) {
        const result = await createDependencias(data);
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
        const result = await updateDependencias(areaId, data);
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
      const message =
        error.response?.data?.desc || "Ocurrió un error inesperado.";
      showNotification("Error", message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ComponentCard
      title={
        isCreate
          ? "Crear Dependencia"
          : isEdit
          ? "Editar Dependencia"
          : dependencia?.label || "Dependencia"
      }
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2">
          {/* nombre */}
          <div className="col-span-2 sm:col-span-2">
            <Label htmlFor="dependencia">Dependencia</Label>
            <Controller
              name="dependencia"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              defaultValue={dependencia?.label || ""}
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  placeholder="Ingresa la dependencia a registrar"
                  id="dependencia"
                  disabled={disabled}
                  defaultValue={dependencia?.label || ""}
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
                Guardar Dependencia
              </Button>
            </div>
          )}
        </div>
      </Form>
    </ComponentCard>
  );
}
