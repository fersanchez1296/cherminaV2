'use client'

import React, { useEffect } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal/index";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import DropzoneComponent from "@/components/form/form-elements/DropZone";
import Button from "@/components/ui/button/Button";
import { useForm, Controller } from "react-hook-form";
import { putRegresarMesa } from "@/services/ticketService";
interface Open {
  open: boolean;
  handleToggleModalState: (modal: string, boolState: boolean) => void;
  id?: string;
  uuid?: string;
}

const ModalRegresarMesa = ({
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
    handleToggleModalState("regresarMesa", false);
  };

  const clearFiles = () => {
    reset();
  };

  const handleRegresarTicket = async (data) => {
    const result = await putRegresarMesa(data, uuid);
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
              Regresar Ticket a Mesa de Servicio
            </h4>
          </div>
          <form
            className="flex flex-col"
            onSubmit={handleSubmit(handleRegresarTicket)}
          >
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2">
                    <Label>Descripcion de retorno</Label>
                    <Controller
                      name="descripcion_retorno"
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
              <Button size="sm" type="submit">
                Guardar Ticket
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ModalRegresarMesa;
