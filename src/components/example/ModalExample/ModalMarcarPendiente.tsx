"use client";
import React, { useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal/index";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import DropzoneComponent from "@/components/form/form-elements/DropZone";
import Button from "@/components/ui/button/Button";
import { useForm, Controller } from "react-hook-form";
import { putTicketPendiente } from "@/services/ticketService";
import { PaperPlaneIcon } from "../../../icons";
import ComponentCard from "../../common/ComponentCard";
import Form from "@/components/form/Form";
import Input from "@/components/form/input/InputField";
import { getCorreosCliente } from "@/services/ticketService";
interface Open {
  open: boolean;
  handleToggleModalState: (modal: string, boolState: boolean) => void;
  uuid?: string;
  id?: string;
  nombreCliente?: string;
}

const ModalMarcarPendiente = ({
  open,
  handleToggleModalState,
  uuid,
  id,
  nombreCliente,
}: Open) => {
  const { isOpen, closeModal, setOpen } = useModal();
  const [cliente, setCliente] = useState<string>("");
  const form = useForm();
  const { handleSubmit, control, reset } = form;
  const callbackClose = () => {
    closeModal();
    handleToggleModalState("pendiente", false);
  };

  const clearFiles = () => {
    reset();
  };

  const handleSave = async (data) => {
    await putTicketPendiente(data, uuid);
    // result.status = 201
    clearFiles();
  };
  useEffect(() => {
    if (open && uuid) {
      getCorreosCliente(uuid).then((c) => {
        setCliente(c.data);
      });
    }
  }, [open, uuid]);

  useEffect(() => {
    setOpen(open);
  }, [open, setOpen]);
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={callbackClose}
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-4">
          {" "}
          <ComponentCard title="Contactar cliente">
            <Form onSubmit={handleSubmit(handleSave)}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="col-span-2 sm:col-span-1">
                  <Label htmlFor="firstName">Nombre del cliente</Label>
                  <Input
                    type="text"
                    id="firstName"
                    disabled
                    defaultValue={nombreCliente}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Label htmlFor="email">Email cliente</Label>
                  <Input
                    type="text"
                    id="email"
                    disabled
                    defaultValue={cliente.correoCliente}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="subject">Asunto</Label>
                  <Input
                    type="text"
                    id="subject"
                    disabled
                    defaultValue={`Seguimiento al numero de ticket #${id}`}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="cuerpo">Mensaje</Label>
                  <Controller
                    name="cuerpo"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextArea
                        placeholder="Escribe tu mensaje aqui..."
                        rows={6}
                        className=" bg-gray-50 dark:bg-gray-800"
                        {...field}
                        error={!!fieldState.error}
                        hint={fieldState.error?.message}
                      />
                    )}
                  />
                </div>
                <div className="col-span-2">
                  <DropzoneComponent form={form} />
                </div>
                <div className="col-span-2">
                  <Button size="sm" className="w-full" type="submit">
                    Enviar correo
                    <PaperPlaneIcon />
                  </Button>
                </div>
              </div>
            </Form>
          </ComponentCard>
        </div>
      </Modal>
    </>
  );
};

export default ModalMarcarPendiente;
