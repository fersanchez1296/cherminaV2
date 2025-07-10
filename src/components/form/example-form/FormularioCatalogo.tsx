"use client";
import React, { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Form from "../Form";
import Label from "../Label";
import Input from "../input/InputField";
import Button from "../../ui/button/Button";
import {
  getInfoSelectsClientes,
  postCrearCliente,
  updateCliente,
} from "@/services/clientService";
import { useForm, Controller } from "react-hook-form";
import { useNotification } from "@/context/NotificationProvider";
import { useLoadingStore } from "@/stores/loadingStore";
interface catalogo {
  singleItem?: {
    _id: string;
    Subcategoria: string;
    "Categoría": string;
    Servicio: string;
    Tipo: string;
    Descripcion_prioridad: string;
    Prioridad: number;
    Area: { _id: string; Direccion_General: string };
  };
  disabled?: boolean;
  isEdit?: boolean;
  isCreate?: boolean;
  onSuccess?: () => void;
  closeModal?: () => void;
  handleReturnClientId?: () => void;
}
interface SelectsData {
  dareas: Array<{ _id: string; Direccion_General: string }>;
  dgenerales: Array<{ _id: string; direccion_area: string }>;
}

interface Option {
  value: string;
  label: string;
}

interface GroupedOption {
  label: string;
  options: Option[];
}

export default function FormularioCatalogo({
  catalogo,
  disabled,
  isEdit,
  isCreate,
  onSuccess,
  closeModal,
}: catalogo) {
  const [selectsData, setSelectsData] = useState<SelectsData>();
  const { handleSubmit, control, setValue } = useForm();
  const [clientId, setClientId] = useState("");
  const [dGenerales, setDGenerales] = useState<Option[]>([]);
  const [dAreas, setDAreas] = useState<Option[]>([]);
  const [nuevaDireccionGeneral, setNuevaDireccionGeneral] = useState(false);
  const [nuevaDireccionArea, setNuevaDireccionArea] = useState(false);
  const { showNotification } = useNotification();
  const setLoading = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    setClientId(catalogo?._id);
    getInfoSelectsClientes().then((res) => {
      setSelectsData(res);
      setDGenerales(res.dgenerales);
      setDAreas(res.dareas);
    });
  }, []);

  useEffect(() => {
    if (catalogo?.Direccion_General) {
      const values = {
        value: catalogo.Direccion_General._id,
        label: catalogo.Direccion_General.Direccion_General,
      };
      setValue("Direccion_General", values);
    }

    if (catalogo?.direccion_area) {
      const values = {
        value: catalogo.direccion_area._id,
        label: catalogo.direccion_area.direccion_area,
      };
      setValue("direccion_area", values);
    }
  }, [catalogo, setValue]);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      if (isCreate) {
        const result = await postCrearCliente(data);
        console.log(result);
        onSuccess?.();
        closeModal?.();
        showNotification(
          "Éxito",
          result.data?.message || "Operación exitosa",
          "success"
        );
      }
      if (isEdit) {
        const result = await updateCliente(clientId, data);
        if (result.status === 200) {
          onSuccess?.();
          closeModal?.();
          showNotification(
            "Éxito",
            result.data?.message || "Operación exitosa",
            "success"
          );
        } else {
          showNotification(
            "Aviso",
            result.data?.desc || "Respuesta inesperada del servidor",
            "warning"
          );
        }
      }
    } catch (error) {
      console.log(error);
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
          ? "Crear Catálogo"
          : isEdit
          ? "Editar Catálogo"
          : catalogo?.Subcategoria || "Catálogo"
      }
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Subcategoria */}
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="subcategoria">Subcategoría</Label>
            <Controller
              name="subcategoria"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              defaultValue={catalogo?.Subcategoria || ""}
              render={({ field, fieldState }) => (
                <Input
                  id="subcategoria"
                  type="text"
                  placeholder="Ingresa la subcategoría"
                  disabled={disabled}
                  defaultValue={catalogo?.Subcategoria || ""}
                  {...field}
                  error={!!fieldState.error}
                  hint={fieldState.error?.message}
                />
              )}
            />
          </div>
          {/* Categoria */}
          <div className="col-span-1">
            <Label htmlFor="categoria">Categoría</Label>
            <Controller
              name="categoria"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              defaultValue={catalogo?.["Categoría"] || ""}
              render={({ field, fieldState }) => (
                <Input
                  id="categoria"
                  type="text"
                  placeholder="Ingresa la categoría"
                  disabled={disabled}
                  defaultValue={catalogo?.["Categoría"] || ""}
                  {...field}
                  error={!!fieldState.error}
                  hint={fieldState.error?.message}
                />
              )}
            />
          </div>
          {/* Servicio */}
          <div className="col-span-1">
            <Label htmlFor="servicio">Servicio</Label>
            <Controller
              name="servicio"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              defaultValue={catalogo?.Servicio || ""}
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  id="servicio"
                  placeholder="Ingresa el servicio"
                  disabled={disabled}
                  defaultValue={catalogo?.Servicio || ""}
                  {...field}
                  error={!!fieldState.error}
                  hint={fieldState.error?.message}
                />
              )}
            />
          </div>
          {/* Tipo de incidencia */}
          <div className="col-span-1">
            <Label htmlFor="tipo_incidencia">Tipo de incidencia</Label>
            <Controller
              name="tipo_incidencia"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              defaultValue={catalogo?.Tipo || ""}
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  id="tipo_incidencia"
                  placeholder="Ingresa el Tipo de Incidencia"
                  disabled={disabled}
                  defaultValue={catalogo?.Tipo}
                  {...field}
                  error={!!fieldState.error}
                  hint={fieldState.error?.message}
                />
              )}
            />
          </div>
          {/* Area */}
            {/* <div className="col-span-1">
              <Label htmlFor="Direccion_General">Área</Label>
              <Controller
                name="Direccion_General"
                control={control}
                rules={{ required: "Este campo es obligatorio" }}
                render={({ field, fieldState }) => (
                  <div>
                    <Select<Option, false, GroupedOption>
                      placeholder="Selecciona la Dirección General"
                      {...field}
                      value={dGenerales?.find(
                        (option) => option.value === field.value?.value
                      )}
                      onChange={(selected) => field.onChange(selected)}
                      options={dGenerales}
                      isDisabled={disabled}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                    {fieldState.error && (
                      <span style={{ color: "red", fontSize: "0.875rem" }}>
                        {fieldState.error.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div> */}
            {/* Descripcion prioridad */}
          <div className="col-span-1">
            <Label htmlFor="descripcion">Descripción prioridad</Label>
            <Controller
              name="descripcion"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              defaultValue={catalogo?.Descripcion_prioridad || ""}
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  id="descripcion"
                  placeholder="Ingresa la descripción de la prioridad"
                  disabled={disabled}
                  defaultValue={catalogo?.Descripcion_prioridad}
                  {...field}
                  error={!!fieldState.error}
                  hint={fieldState.error?.message}
                />
              )}
            />
          </div>
          {/* Tiempo */}
          <div className="col-span-1">
            <Label htmlFor="tiempo">Tiempo de resolución en horas</Label>
            <Controller
              name="tiempo"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              defaultValue={catalogo?.Prioridad || ""}
              render={({ field, fieldState }) => (
                <Input
                  type="number"
                  id="tiempo"
                  placeholder="Ingresa el tiempo de resolución en horas"
                  disabled={disabled}
                  defaultValue={catalogo?.Prioridad}
                  {...field}
                  error={!!fieldState.error}
                  hint={fieldState.error?.message}
                />
              )}
            />
          </div>
          {/* Boton de guardar */}
          {(isEdit || isCreate) && (
            <div className="col-span-2">
              <Button size="sm" className="w-full" type="submit">
                Guardar Catálogo
              </Button>
            </div>
          )}
        </div>
      </Form>
    </ComponentCard>
  );
}
