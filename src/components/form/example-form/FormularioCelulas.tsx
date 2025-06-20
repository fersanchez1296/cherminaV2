"use client";
import React, { useState, useEffect } from "react";
import ComponentCard from "../../common/ComponentCard";
import Form from "../Form";
import Label from "../Label";
import Input from "../input/InputField";
// import Select from "../Select";
import TextArea from "../input/TextArea";
import Button from "../../ui/button/Button";
import Select from "react-select";
import { getInfoSelectsUsuario, updateUsuario } from "@/services/userService";
import { useForm, Controller } from "react-hook-form";
import { postCrearCliente } from "@/services/clientService";
import { Usuario } from "@/common/interfaces/user.interface";
import { useNotification } from "@/context/NotificationProvider";
import { useLoadingStore } from "@/stores/loadingStore";
interface userProps extends Usuario {
  disabled: boolean;
  isEdit?: boolean;
  isCreate?: boolean;
  onSuccess?: () => void;
  closeModal?: () => void;
}

type Option = { value: string; label: string };

type DataSelects = {
  celulas: Option[];
  roles: Option[];
  areas: Option[];
  puestos: Option[];
};

export default function FormularioCelulas({
  usuario,
  disabled,
  isEdit,
  isCreate,
  onSuccess,
  closeModal,
}: userProps) {
  const [dataSelects, setDataSelects] = useState<DataSelects>({
    celulas: [],
    roles: [],
    areas: [],
    puestos: [],
  });
  const [userId, setUserId] = useState<string>("");
  const { handleSubmit, control, setValue } = useForm();
  const { showNotification } = useNotification();
  const setLoading = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    setUserId(usuario?._id);
    getInfoSelectsUsuario().then((d) => setDataSelects(d.data));
  }, []);

  useEffect(() => {
    if (usuario?.Celula?.length) {
      const values = usuario.Celula.map((v) => ({
        value: v._id,
        label: v.Celula,
      }));
      setValue("Celula", values);
    }

    if (usuario?.Puesto) {
      const values = {
        value: usuario.Puesto._id,
        label: usuario.Puesto.Puesto,
      };
      setValue("Puesto", values);
    }
  }, [usuario, setValue]);

  const onSubmit = async (data: Partial<Usuario>) => {
    try {
      setLoading(true);
      if (isCreate) {
        const result = await postCrearCliente(data);
        onSuccess?.();
        closeModal?.();
      }
      if (isEdit) {
        setLoading(true);
        const result = await updateUsuario(userId, data);
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
          ? "Crear Usuario"
          : isEdit
          ? "Editar Usuario"
          : usuario?.Nombre || "Cliente"
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
              defaultValue={usuario?.Nombre || ""}
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  placeholder="Ingresa el nombre completo del usuario"
                  id="nombre"
                  disabled={disabled}
                  defaultValue={usuario?.Nombre || ""}
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
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  placeholder="Ingresa el correo electrónico del usuario"
                  id="correo"
                  defaultValue={usuario?.Correo || ""}
                  disabled={true}
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
              defaultValue={usuario?.Telefono || ""}
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  id="telefono"
                  placeholder="Ingresa el teléfono del usuario"
                  disabled={disabled}
                  defaultValue={usuario?.Telefono || ""}
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
              defaultValue={usuario?.Extension || ""}
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  id="extension"
                  placeholder="Ingresa la extensión telefónica del usuario"
                  disabled={disabled}
                  defaultValue={usuario?.Extension || ""}
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
              defaultValue={usuario?.Dependencia?.Dependencia || ""}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="direccion-general">Dirección General</Label>
            <Controller
              name="Direccion_General"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  id="direccion-general"
                  placeholder="Direccion General del Usuario"
                  defaultValue={
                    usuario?.Direccion_General?.Direccion_General || ""
                  }
                  disabled={true}
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
              render={({ field, fieldState }) => (
                <div>
                  <Select
                    isMulti
                    options={dataSelects?.areas}
                    isDisabled={true}
                    defaultValue={usuario?.Area.map((v) => ({
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
            <Label htmlFor="Celula">Célula</Label>
            <Controller
              name="Celula"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              render={({ field, fieldState }) => (
                <div>
                  <Select
                    isMulti
                    options={dataSelects?.celulas}
                    isDisabled={disabled}
                    value={dataSelects?.celulas?.filter((option) =>
                      field.value?.some((v: any) => v.value === option.value)
                    )}
                    onChange={(selected) => field.onChange(selected)}
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
          </div>
          <div className="col-span-1">
            <Label htmlFor="puesto">Puesto</Label>
            <Controller
              name="Puesto"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              render={({ field, fieldState }) => (
                <div>
                  <Select
                    options={dataSelects?.puestos}
                    isDisabled={disabled}
                    value={dataSelects?.puestos?.find(
                      (option) => option.value === field.value?.value
                    )}
                    onChange={(selected) => field.onChange(selected)}
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
          </div>
          <div className="col-span-1">
            <Label htmlFor="usuario">Nombre de Usuario</Label>
            <Input
              type="text"
              id="usuario"
              placeholder="Nombre de usuario"
              disabled
              defaultValue={usuario?.Username || ""}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="activo">Activo</Label>
            <Input
              type="text"
              id="activo"
              placeholder="activo/inactivo"
              disabled
              defaultValue={JSON.stringify(usuario?.isActive || "")}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="rol">Rol</Label>
            <Controller
              name="Rol"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <Select
                    options={dataSelects?.roles}
                    isDisabled={true}
                    defaultValue={{
                      value: usuario?.Rol._id,
                      label: usuario?.Rol.Rol,
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
              defaultValue={usuario?.Ubicacion || ""}
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
              name="Direccion.Pais"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  placeholder="Ingresa el nombre del país del usuario"
                  id="pais"
                  disabled={true}
                  defaultValue={usuario?.Direccion?.Pais || ""}
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
              name="Direccion.Ciudad"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  placeholder="Ingresa el nombre de la ciudad del usuario"
                  id="ciudad"
                  disabled={true}
                  defaultValue={usuario?.Direccion?.Ciudad || ""}
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
              name="Direccion.codigoPostal"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  placeholder="Ingresa el código postal del usuario"
                  id="codigo-postal"
                  disabled={true}
                  defaultValue={usuario?.Direccion?.codigoPostal || ""}
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
              defaultValue={usuario?.Tickets_resueltos.a_tiempo}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="tickets-fuera-tiempo">Fuera de tiempo</Label>
            <Input
              type="text"
              placeholder="Tcikets resueltos fuera de tiempo"
              id="tickets-fuera-tiempo"
              disabled={true}
              defaultValue={usuario?.Tickets_resueltos.fuera_tiempo}
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
