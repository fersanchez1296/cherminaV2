"use client";
import React, { useEffect } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal/index";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import DropzoneComponent from "@/components/form/form-elements/DropZone";
import Button from "@/components/ui/button/Button";
import { useForm, Controller } from "react-hook-form";
import { putRegresarResolutor } from "@/services/ticketService";
interface Open {
  open: boolean;
  handleToggleModalState: (modal: string, boolState: boolean) => void;
  uuid?: string;
  id?: string;
}

const ModalRegresarResolutor = ({
  open,
  handleToggleModalState,
  id,
  uuid,
}: Open) => {
  const { isOpen, closeModal, setOpen } = useModal();
  const form = useForm();
  const { handleSubmit, control, reset } = form;
  const callbackClose = () => {
    closeModal();
    handleToggleModalState("regresarResolutor", false);
  };

  const clearFiles = () => {
    reset();
  };

  const handlePutNota = async (data) => {
    const result = await putRegresarResolutor(data, uuid);
    // result.status = 201
    clearFiles();
  };

  useEffect(() => {
    setOpen(open);
  });
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
              Regresar Ticket a Resolutor
            </h4>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2">
                    <Label>Información proporcionada por el cliente</Label>
                    <Controller
                      name="Descripcion_respuesta_cliente"
                      control={control}
                      rules={{ required: "Este campo es obligatorio" }}
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
              <Button size="sm" onClick={handleSubmit(handlePutNota)}>
                Guardar Ticket
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ModalRegresarResolutor;
