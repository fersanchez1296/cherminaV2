"use client";
import React, { useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal/index";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import DropzoneComponent from "@/components/form/form-elements/DropZone";
import Button from "@/components/ui/button/Button";
import { useForm, Controller } from "react-hook-form";
import { putContactoCliente } from "@/services/ticketService";
import { PaperPlaneIcon } from "../../../icons";
import ComponentCard from "../../common/ComponentCard";
import Form from "@/components/form/Form";
import Input from "@/components/form/input/InputField";
import { getCorreosCliente } from "@/services/ticketService";
import { useNotification } from "@/context/NotificationProvider";
import { useLoadingStore } from "@/stores/loadingStore";
interface Open {
  open: boolean;
  handleToggleModalState: (modal: string, boolState: boolean) => void;
  id?: string;
  uuid?: string;
  nombreCliente?: string;
}

const ModalContacto = ({
  open,
  handleToggleModalState,
  id,
  uuid,
  nombreCliente,
}: Open) => {
  const setLoading = useLoadingStore((state) => state.setLoading);
  const { showNotification } = useNotification();
  const { isOpen, closeModal, setOpen } = useModal();
  const [cliente, setCliente] = useState<string>("");
  const form = useForm();
  const { handleSubmit, control, reset } = form;
  const callbackClose = () => {
    closeModal();
    handleToggleModalState("contacto", false);
  };

  const handleSave = async (data: any) => {
    setLoading(true);
    try {
      console.log("DATA", data);
      const result = await putContactoCliente(data, uuid);

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
        className="max-w-[700px] m-4 z-[z-9999]"
      >
        <div className="no-scrollbar relative w-full z-[z-9999] max-w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-4">
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
                <div className="col-span-2 sm:col-span-2">
                  <Label htmlFor="emailsExtra">Otros destinatarios</Label>
                  <Controller
                    name="emailsExtra"
                    control={control}
                    defaultValue={
                      Array.isArray(form.watch("emailsExtra"))
                        ? form.watch("emailsExtra").join(", ")
                        : ""
                    }
                    render={({ field, fieldState }) => (
                      <Input
                        type="text"
                        id="emailsExtra"
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
                          form.setValue("emailsExtra", emails);
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
                    defaultValue={`Seguimiento al numero de ticket #${id}`}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="cuerpoCorreo">Mensaje</Label>
                  <Controller
                    name="cuerpoCorreo"
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

export default ModalContacto;
