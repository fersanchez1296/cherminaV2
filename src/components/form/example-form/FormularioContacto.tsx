"use client";
import React, { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Form from "../Form";
import Label from "../Label";
import Input from "../input/InputField";
import TextArea from "../input/TextArea";
import Button from "../../ui/button/Button";
import { PaperPlaneIcon } from "../../../icons";
import DropzoneComponent from "../form-elements/DropZone";
import { useForm, Controller } from "react-hook-form";
import {
  getCorreosCliente,
  putContactoCliente,
} from "@/services/ticketService";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal/index";
interface Open {
  open: boolean;
  handleToggleModalState: (modal: string, boolState: boolean) => void;
  ticketId: string;
  ticketNumericId: string;
  nombreCliente: string;
}

export default function FormularioContacto({
  open,
  ticketId,
  ticketNumericId,
  nombreCliente,
  handleToggleModalState,
}: Open) {
  const { isOpen, closeModal, setOpen } = useModal();
  const [cliente, setCliente] = useState<string>("");
  const form = useForm();
  const { handleSubmit, control, reset } = form;
  const clearFiles = () => {
    reset();
  };
  useEffect(() => {
    setOpen(open);
  });
  useEffect(() => {
    if (ticketId) {
      getCorreosCliente(ticketId).then((c) => {
        setCliente(c.data);
      });
    }
  }, []);

  const handleContactoCliente = async (data) => {
    const result = await putContactoCliente(data, ticketId);
    // result.status = 201
    clearFiles();
  };
  const callbackClose = () => {
    closeModal();
    handleToggleModalState("contacto", false);
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={callbackClose}
      className="max-w-[700px] m-4"
    >
      <div className="no-scrollbar relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-4">
        {" "}
        <ComponentCard title="Contactar cliente">
          <Form onSubmit={handleSubmit(handleContactoCliente)}>
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
              <div className="col-span-2 sm:col-span-2">
                <Label htmlFor="Otros_correos">Otros destinatarios</Label>
                <Controller
                  name="Otros_correos"
                  control={control}
                  defaultValue={
                    Array.isArray(form.watch("Otros_correos"))
                      ? form.watch("Otros_correos").join(", ")
                      : ""
                  }
                  render={({ field, fieldState }) => (
                    <Input
                      type="text"
                      id="Otros_correos"
                      placeholder="Ingresa los destinatarios separados por una coma..."
                      {...field}
                      error={!!fieldState.error}
                      hint={fieldState.error?.message}
                      onChange={(e) => {
                        const value = e.target.value;
                        const emails = value
                          .split(",")
                          .map((email) => email.trim())
                          .filter((email) => email.length > 0);
                        form.setValue("Otros_correos", emails);
                        field.onChange(value);
                      }}
                    />
                  )}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="subject">Asunto</Label>
                <Input
                  type="text"
                  id="subject"
                  disabled
                  defaultValue={`Seguimiento al numero de ticket #${ticketNumericId}`}
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
  );
}
