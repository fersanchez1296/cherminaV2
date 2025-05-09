"use client";
import React, { useState, useEffect } from "react";
import ComponentCard from "../../common/ComponentCard";
import Form from "../Form";
import Label from "../Label";
import Input from "../input/InputField";
// import Select from "../Select";
import TextArea from "../input/TextArea";
import Button from "../../ui/button/Button";
import PhoneInput from "../group-input/PhoneInput";
import Select from "react-select";
import { getInfoSelectsUsuario, updateUsuario } from "@/services/userService";
import { useForm, Controller } from "react-hook-form";
interface singleItem {
  singleItem?: {
    Area: Array<{ _id: string; Area: string }>;
    Nombre: string;
    Correo: string;
    Rol: { _id: string; Rol: string };
    Tickets_resueltos: { a_tiempo: number; fuera_tiempo: number };
    Username: string;
    _id: string;
    isActive: boolean;
    Telefono?: string;
    Extension?: string;
    Puesto?: string;
    Dependencia?: { _id: string; Dependencia: string };
    Direccion_General?: { _id: string; Direccion_General: string };
    Ubicacion?: string;
    Direccion?: {
      Pais?: string;
      Ciudad?: string;
      codigoPostal?: string;
    };
  };
  disabled: boolean;
  isEdit?: boolean;
  isCreate?: boolean;
  onSuccess?: () => void;
  closeModal?: () => void;
}

export default function FormularioUsuarios({
  singleItem,
  disabled,
  isEdit,
  isCreate,
  onSuccess,
  closeModal,
}: singleItem) {
  const [dataSelects, setDataSelects] = useState<string[]>();
  const [userId, setUserId] = useState("");
  const { handleSubmit, control } = useForm();
  useEffect(() => {
    setUserId(singleItem?._id);
    getInfoSelectsUsuario().then((d) => setDataSelects(d));
  }, []);
  const countries = [
    { code: "IPEJAL", label: "333-208-0340" },
    { code: "Otro", label: "" },
  ];

  const onSubmit = async (data: any) => {
    // if (isCreate) {
    //   const result = await postCrearCliente(data);
    //   onSuccess?.();
    //   closeModal?.();
    //   console.log("Resultado del query:", result);
    // }
    console.log(data);
    if (isEdit) {
      const result = await updateUsuario(userId, data);
      onSuccess?.();
      closeModal?.();
      console.log("Resultado del query:", result);
    }
  };

  return (
    <ComponentCard
      title={
        isCreate
          ? "Crear Usuario"
          : isEdit
          ? "Editar Usuario"
          : singleItem?.Nombre || "Cliente"
      }
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="nombre">Nombre</Label>
            <Controller
              name="Nombre"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              defaultValue={singleItem?.Nombre || ""}
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  placeholder="Ingresa el nombre completo del usuario"
                  id="nombre"
                  disabled={disabled}
                  defaultValue={singleItem?.Nombre || ""}
                  {...field}
                  error={!!fieldState.error}
                  hint={fieldState.error?.message}
                />
              )}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="correo">Correo</Label>
            <Controller
              name="Correo"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  placeholder="Ingresa el correo electrónico del usuario"
                  id="correo"
                  defaultValue={singleItem?.Correo || ""}
                  disabled={disabled}
                  {...field}
                  error={!!fieldState.error}
                  hint={fieldState.error?.message}
                />
              )}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="telefono">Teléfono</Label>
            <Controller
              name="Telefono"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              render={({ field, fieldState }) => (
                <PhoneInput
                  id="telefono"
                  selectPosition="start"
                  countries={countries}
                  placeholder="Ingresa el telefóno del usuario"
                  disabled={disabled}
                  defaultValue={singleItem?.Telefono || ""}
                  {...field}
                  error={!!fieldState.error}
                  hint={fieldState.error?.message}
                />
              )}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="extension">Extensión</Label>
            <Controller
              name="Extension"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              defaultValue={singleItem?.Nombre || ""}
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  id="extension"
                  placeholder="Ingresa la extensión telefónica del usuario"
                  disabled={disabled}
                  defaultValue={singleItem?.Extension || ""}
                  {...field}
                  error={!!fieldState.error}
                  hint={fieldState.error?.message}
                />
              )}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="dependencia">Dependencia</Label>
            <Input
              type="text"
              id="dependencia"
              placeholder="Ingresa la dependencia del usuario"
              disabled
              defaultValue={singleItem?.Dependencia?.Dependencia || ""}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="direccion-general">Dirección General</Label>
            <Controller
              name="Direccion_General"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  id="direccion-general"
                  placeholder="Ingresa la dirección general del usuario"
                  disabled={disabled}
                  defaultValue={
                    singleItem?.Direccion_General?.Direccion_General || ""
                  }
                  {...field}
                  error={!!fieldState.error}
                  hint={fieldState.error?.message}
                />
              )}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="area">Área</Label>
            <Controller
              name="Area"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              render={({ field, fieldState }) => (
                <div>
                  <Select
                    isMulti
                    options={dataSelects?.areas}
                    isDisabled={disabled}
                    defaultValue={singleItem?.Area.map((v) => ({
                      value: v._id,
                      label: v.Area,
                    }))}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    {...field}
                  />
                  {fieldState.error && (
                    <span style={{ color: "red", fontSize: "0.875rem" }}>
                      {fieldState.error.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="puesto">Puesto</Label>
            <Controller
              name="Puesto"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  id="puesto"
                  placeholder="Ingresa el puesto del usuario"
                  disabled={disabled}
                  defaultValue={singleItem?.Puesto || ""}
                  {...field}
                  error={!!fieldState.error}
                  hint={fieldState.error?.message}
                />
              )}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="usuario">Nombre de Usuario</Label>
            <Input
              type="text"
              id="usuario"
              placeholder="Nombre de usuario"
              disabled
              defaultValue={singleItem?.Username || ""}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="activo">Activo</Label>
            <Input
              type="text"
              id="activo"
              placeholder="activo/inactivo"
              disabled
              defaultValue={JSON.stringify(singleItem?.isActive || "")}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="rol">Rol</Label>
            <Controller
              name="Rol"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              render={({ field, fieldState }) => (
                <div>
                  <Select
                    options={dataSelects?.roles}
                    isDisabled={disabled}
                    defaultValue={{
                      value: singleItem?.Rol._id,
                      label: singleItem?.Rol.Rol,
                    }}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    {...field}
                  />
                  {fieldState.error && (
                    <span style={{ color: "red", fontSize: "0.875rem" }}>
                      {fieldState.error.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="ubicacion">Ubicación</Label>
            <Controller
              name="Ubicacion"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              defaultValue={singleItem?.Ubicacion || ""}
              render={({ field, fieldState }) => (
                <TextArea
                  placeholder="Ingresa la ubicación del usuario..."
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
        </div>
        <div className="h-px mt-3 w-full bg-gray-200 dark:bg-gray-800 sm:w-[100%]"></div>
        <h3 className="font-medium text-gray-800 text-theme-xl dark:text-white/90">
          Dirección
        </h3>
        <div className="mt-3 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="pais">País</Label>
            <Controller
              name="Pais"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  placeholder="Ingresa el nombre del país del usuario"
                  id="pais"
                  disabled={disabled}
                  defaultValue={singleItem?.Direccion?.Pais || ""}
                  {...field}
                  error={!!fieldState.error}
                  hint={fieldState.error?.message}
                />
              )}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="ciudad">Ciudad/Estado</Label>
            <Controller
              name="Ciudad"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  placeholder="Ingresa el nombre de la ciudad del usuario"
                  id="ciudad"
                  disabled={disabled}
                  defaultValue={singleItem?.Direccion?.Ciudad || ""}
                  {...field}
                  error={!!fieldState.error}
                  hint={fieldState.error?.message}
                />
              )}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="codigo-postal">Código Postal</Label>
            <Controller
              name="codigoPostal"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  placeholder="Ingresa el código postal del usuario"
                  id="codigo-postal"
                  disabled={disabled}
                  defaultValue={singleItem?.Direccion?.codigoPostal || ""}
                  {...field}
                  error={!!fieldState.error}
                  hint={fieldState.error?.message}
                />
              )}
            />
          </div>
        </div>
        <div className="h-px mt-3 w-full bg-gray-200 dark:bg-gray-800 sm:w-[100%]"></div>
        <h3 className="font-medium text-gray-800 text-theme-xl dark:text-white/90">
          Tickets Resueltos
        </h3>
        <div className="mt-3 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="tickets-en-tiempo">En tiempo</Label>
            <Input
              type="text"
              placeholder="Tickets resueltos en tiempo"
              id="tickets-en-tiempo"
              disabled={true}
              defaultValue={singleItem?.Tickets_resueltos.a_tiempo}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="tickets-fuera-tiempo">Fuera de tiempo</Label>
            <Input
              type="text"
              placeholder="Tcikets resueltos fuera de tiempo"
              id="tickets-fuera-tiempo"
              disabled={true}
              defaultValue={singleItem?.Tickets_resueltos.fuera_tiempo}
            />
          </div>
          {(isEdit || isCreate) && (
            <div className="col-span-2">
              <Button size="sm" className="w-full" type="submit">
                Guardar Usuario
              </Button>
            </div>
          )}
        </div>
      </Form>
    </ComponentCard>
  );
}
