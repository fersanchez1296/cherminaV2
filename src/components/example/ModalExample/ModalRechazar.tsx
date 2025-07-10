"use client";

import React, { useEffect } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal/index";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { useForm, Controller } from "react-hook-form";
import { putRechazarResolucion } from "@/services/ticketService";
import Input from "@/components/form/input/InputField";
import DropzoneComponent from "@/components/form/form-elements/DropZone";
import { useNotification } from "@/context/NotificationProvider";
import { useLoadingStore } from "@/stores/loadingStore";
interface Open {
  open: boolean;
  handleToggleModalState: (modal: string, boolState: boolean) => void;
  id?: string;
  uuid?: string;
  resolutor?: string;
  fechaResolucion?: string;
  Nombre?: string;
  reasignado?: string;
}

const ModalRechazar = ({
  open,
  handleToggleModalState,
  id,
  uuid,
  resolutor,
  fechaResolucion,
  Nombre,
  reasignado,
}: Open) => {
  const setLoading = useLoadingStore((state) => state.setLoading);
  const { isOpen, closeModal, setOpen } = useModal();
  const form = useForm();
  const { showNotification } = useNotification();
  const { handleSubmit, control, reset } = form;
  const callbackClose = () => {
    closeModal();
    handleToggleModalState("rechazar", false);
  };

  const handleSave = async (data: any) => {
    const dataWithNombre = {
      ...data,
      Nombre: Nombre,
    };
    setLoading(true);
    try {
      const result = await putRechazarResolucion(dataWithNombre, uuid, reasignado);

      if (result.status === 200) {
        showNotification(
          "Exito",
          result.data?.message || "Operación exitosa",
          "success"
        );
        reset();
        callbackClose();
      } else {
        showNotification(
          "Aviso",
          result.data?.desc || "Respuesta inesperada del servidor",
          "warning"
        );
      }
    } catch (error) {
      const err = error as { response?: { data?: { desc?: string } } };
      const message =
        err.response?.data?.desc || "Ocurrió un error inesperado.";
      showNotification("Error", message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setOpen(open);
    reset({
      Files: [],
    });
  }, [setOpen, open]);

  useEffect(() => {
    if (open) {
      reset({
        Nombre: resolutor,
        feedback: "",
        Files: undefined,
      });
    }
  }, [open, resolutor, reset]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={callbackClose}
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Rechazar resolución
            </h4>
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit(handleSave)}>
            <div className="custom-scrollbar h-[550px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2">
                    <Label>Resolutor</Label>
                    <Controller
                      name="resolutor"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Input
                          defaultValue={Nombre}
                          disabled
                          {...field}
                          error={!!fieldState.error}
                          hint={fieldState.error?.message}
                        />
                      )}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Fecha de resolución</Label>
                    <Input defaultValue={fechaResolucion} disabled />
                  </div>
                  <div className="col-span-2">
                    <Label>Feedback</Label>
                    <Controller
                      name="feedback"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextArea
                          rows={10}
                          {...field}
                          error={!!fieldState.error}
                          hint={fieldState.error?.message}
                        />
                      )}
                    />
                  </div>
                  <div className="col-span-2 mt-5">
                    <DropzoneComponent form={form} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={callbackClose}>
                Cerrar
              </Button>
              <Button size="sm" type="submit">
                Guardar ticket
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ModalRechazar;
