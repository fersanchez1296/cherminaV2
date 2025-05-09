"use client";
import React, { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Form from "../Form";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import TextArea from "../input/TextArea";
import Button from "../../ui/button/Button";
import PhoneInput from "../group-input/PhoneInput";
import Switch from "../switch/Switch";
import {
  getInfoSelectsClientes,
  postCrearCliente,
  updateCliente,
} from "@/services/clientService";
import { useForm, Controller } from "react-hook-form";
interface singleItem {
  singleItem?: {
    _id: string;
    Nombre: string;
    Correo: string;
    Extension: string;
    Telefono: string;
    Ubicacion: string;
    Direccion_General: { _id: string; Direccion_General: string };
    Dependencia: { _id: string; Dependencia: string };
    direccion_area: { _id: string; direccion_area: string };
  };
  disabled: boolean;
  isEdit?: boolean;
  isCreate?: boolean;
  onSuccess?: () => void;
  closeModal?: () => void;
}
interface SelectsData {
  dareas: Array<{ _id: string; Direccion_General: string }>;
  dgenerales: Array<{ _id: string; direccion_area: string }>;
}
export default function FormularioCrearCliente({
  singleItem,
  disabled,
  isEdit,
  isCreate,
  onSuccess,
  closeModal,
}: singleItem) {
  const [selectsData, setSelectsData] = useState<SelectsData>();
  const { handleSubmit, control } = useForm();
  const [clientId, setClientId] = useState("");
  const [nuevaDireccionGeneral, setNuevaDireccionGeneral] = useState(false);
  const [nuevaDireccionArea, setNuevaDireccionArea] = useState(false);

  useEffect(() => {
    setClientId(singleItem?._id);
    getInfoSelectsClientes().then((res) => setSelectsData(res));
  }, []);
  const countries = [
    { code: "IPEJAL", label: "333-208-0340" },
    { code: "Otro", label: "" },
  ];

  const onSubmit = async (data: any) => {
    if (isCreate) {
      const result = await postCrearCliente(data);
      onSuccess?.();
      closeModal?.();
      console.log("Resultado del query:", result);
    }
    if (isEdit) {
      const result = await updateCliente(clientId, data);
      onSuccess?.();
      closeModal?.();
      console.log("Resultado del query:", result);
    }
  };
  return (
    <ComponentCard
      title={
        isCreate
          ? "Crear Cliente"
          : isEdit
          ? "Editar Cliente"
          : singleItem?.Nombre || "Cliente"
      }
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Nombre */}
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="nombre">Nombre</Label>
            <Controller
              name="Nombre"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              defaultValue={singleItem?.Nombre || ""}
              render={({ field, fieldState }) => (
                <Input
                  id="Nombre"
                  type="text"
                  placeholder="Ingresa el nombre completo del cliente"
                  disabled={disabled}
                  defaultValue={singleItem?.Nombre || ""}
                  {...field}
                  error={!!fieldState.error}
                  hint={fieldState.error?.message}
                />
              )}
            />
          </div>
          {/* Correo */}
          <div className="col-span-1">
            <Label htmlFor="correo">Correo</Label>
            <Controller
              name="Correo"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              defaultValue={singleItem?.Correo || ""}
              render={({ field, fieldState }) => (
                <Input
                  id="Correo"
                  type="text"
                  placeholder="Ingresa el correo electrónico del cliente"
                  disabled={disabled}
                  defaultValue={singleItem?.Correo || ""}
                  {...field}
                  error={!!fieldState.error}
                  hint={fieldState.error?.message}
                />
              )}
            />
          </div>
          {/* Telefono */}
          <div className="col-span-1">
            <Label htmlFor="telefono">Teléfono</Label>
            <Controller
              name="Telefono"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              defaultValue={singleItem?.Telefono || ""}
              render={({ field, fieldState }) => (
                <PhoneInput
                  selectPosition="start"
                  countries={countries}
                  disabled={disabled}
                  defaultValue={singleItem?.Telefono || ""}
                  onChange={field.onChange}
                  error={!!fieldState.error}
                  hint={fieldState.error?.message}
                />
              )}
            />
          </div>
          {/* Extension */}
          <div className="col-span-1">
            <Label htmlFor="extension">Extensión</Label>
            <Controller
              name="Extension"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              defaultValue={singleItem?.Extension || ""}
              render={({ field, fieldState }) => (
                <Input
                  type="tel"
                  id="extension"
                  disabled={disabled}
                  defaultValue={singleItem?.Extension}
                  {...field}
                  error={!!fieldState.error}
                  hint={fieldState.error?.message}
                />
              )}
            />
          </div>
          {/* Direccion General */}
          {!nuevaDireccionGeneral && (
            <div className="col-span-1">
              <Label htmlFor="Direccion_General">Dirección General</Label>
              <Controller
                name="Direccion_General"
                control={control}
                rules={{ required: "Este campo es obligatorio" }}
                defaultValue={singleItem?.Direccion_General?._id || ""}
                render={({ field, fieldState }) => (
                  <Select
                    options={selectsData?.dgenerales ?? []}
                    placeholder="Selecciona una opción"
                    defaultValue={singleItem?.Direccion_General?._id}
                    disabled={disabled}
                    className="bg-gray-50 dark:bg-gray-800"
                    {...field}
                    error={!!fieldState.error}
                    hint={fieldState.error?.message}
                  />
                )}
              />
            </div>
          )}
          {/* nueva direccion general */}
          {nuevaDireccionGeneral && (
            <div className="col-span-1">
              <Label htmlFor="direccion_general">Nueva Dirección General</Label>
              <Controller
                name="nuevaDGeneral"
                control={control}
                rules={{ required: "Este campo es obligatorio" }}
                render={({ field, fieldState }) => (
                  <Input
                    id="direccion_general"
                    type="text"
                    placeholder="Ingresa la dirección general"
                    disabled={disabled}
                    {...field}
                    error={!!fieldState.error}
                    hint={fieldState.error?.message}
                  />
                )}
              />
            </div>
          )}
          {/* switch direccion general */}
          {(isCreate || isEdit) && (
            <div className="col-span-1 flex align-center justify-center mt-5">
              <Switch
                label="Nueva Direccion General"
                defaultChecked={nuevaDireccionGeneral}
                onChange={() => setNuevaDireccionGeneral((prev) => !prev)}
              />
            </div>
          )}
          {/* Direccion de area */}
          {!nuevaDireccionArea && (
            <div className="col-span-1">
              <Label htmlFor="direccion_area">Dirección Área</Label>
              <Controller
                name="direccion_area"
                control={control}
                rules={{ required: "Este campo es obligatorio" }}
                defaultValue={singleItem?.direccion_area?._id || ""}
                render={({ field, fieldState }) => (
                  <Select
                    options={selectsData?.dareas ?? []}
                    placeholder="Selecciona una opción"
                    defaultValue={singleItem?.direccion_area?._id}
                    disabled={disabled}
                    className="bg-gray-50 dark:bg-gray-800"
                    {...field}
                    error={!!fieldState.error}
                    hint={fieldState.error?.message}
                  />
                )}
              />
            </div>
          )}
          {/* Nueva direccion de area */}
          {nuevaDireccionArea && (
            <div className="col-span-1">
              <Label htmlFor="direccion_area">Nueva Dirección de Área</Label>
              <Controller
                name="nuevaDArea"
                control={control}
                rules={{ required: "Este campo es obligatorio" }}
                render={({ field, fieldState }) => (
                  <Input
                    id="direccion_area"
                    type="text"
                    placeholder="Ingresa la dirección de área"
                    disabled={disabled}
                    {...field}
                    error={!!fieldState.error}
                    hint={fieldState.error?.message}
                  />
                )}
              />
            </div>
          )}
          {/* switch direccion de area */}
          {(isCreate || isEdit) && (
            <div className="col-span-1 flex align-center justify-center mt-5">
              <Switch
                label="Nueva Direccion de Área"
                defaultChecked={nuevaDireccionArea}
                onChange={() => setNuevaDireccionArea((prev) => !prev)}
              />
            </div>
          )}
          {/* Ubicacion */}
          <div className="col-span-2">
            <Label htmlFor="ubicacion">Ubicación</Label>
            <Controller
              name="Ubicacion"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              defaultValue={singleItem?.Ubicacion || ""}
              render={({ field, fieldState }) => (
                <TextArea
                  placeholder="Ingresa la ubicación del cliente..."
                  rows={6}
                  disabled={disabled}
                  className=" bg-gray-50 dark:bg-gray-800"
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
                Guardar Cliente
              </Button>
            </div>
          )}
        </div>
      </Form>
    </ComponentCard>
  );
}
