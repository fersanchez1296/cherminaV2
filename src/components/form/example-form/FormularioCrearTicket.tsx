"use client";

import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import Form from "../Form";
import Button from "../../ui/button/Button";
import DropzoneComponent from "../form-elements/DropZone";
import TextArea from "../input/TextArea";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import FormularioCrearCliente from "./FormularioCrearCliente";

export default function FormularioCrearTicket() {
  const [message, setMessage] = useState<string>("");
  const { isOpen, openModal, closeModal } = useModal();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:");
  };

  const optionsGender = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Others" },
  ];
  const handleSelectGender = (value: string) => {
    console.log("Selected value:", value);
  };

  const handleTextareaChange = (value: string) => {
    setMessage(value);
    console.log("Message:", value);
  };

  return (
    <ComponentCard title="Crear Ticket">
      <Form onSubmit={handleSubmit}>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="col-span-2">
            <h4 className="pb-4 text-base font-medium text-gray-800 border-b border-gray-200 dark:border-gray-800 dark:text-white/90">
              Cliente
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end min-w-max">
            <div className="flex flex-col">
              <Label htmlFor="firstName">Cliente</Label>
              <Input
                type="text"
                id="firstName"
                placeholder="Ingresa el nombre completo o correo del cliente"
                className="w-full"
              />
            </div>
            <Button size="sm" className="w-full self-end">
              Buscar Cliente
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={openModal}
              className="w-full self-end"
            >
              Crear Cliente
            </Button>
          </div>

          <div className="col-span-2">
            <h4 className="pb-4 text-base font-medium text-gray-800 border-b border-gray-200 dark:border-gray-800 dark:text-white/90">
              Ticket
            </h4>
          </div>
          <div className="col-span-1">
            <Label htmlFor="email">Medio de Contacto</Label>
            <Select
              options={optionsGender}
              placeholder="Select an option"
              onChange={handleSelectGender}
              defaultValue=""
              className="bg-gray-50 dark:bg-gray-800"
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="email">Subcategoría</Label>
            <Select
              options={optionsGender}
              placeholder="Select an option"
              onChange={handleSelectGender}
              defaultValue=""
              className="bg-gray-50 dark:bg-gray-800"
            />
          </div>
          <div>
            <Label htmlFor="firstName">Categoría</Label>
            <Input type="text" id="firstName" disabled />
          </div>
          <div>
            <Label htmlFor="firstName">Servicio</Label>
            <Input type="text" id="firstName" disabled />
          </div>
          <div>
            <Label htmlFor="firstName">Tipo de Incidente</Label>
            <Input type="text" id="firstName" disabled />
          </div>
          <div>
            <Label htmlFor="firstName">Área</Label>
            <Input type="text" id="firstName" disabled />
          </div>
          <div>
            <Label htmlFor="firstName">Fecha de Resolución</Label>
            <Input type="text" id="firstName" disabled />
          </div>
          <div>
            <Label htmlFor="firstName">Prioridad</Label>
            <Input type="text" id="firstName" disabled />
          </div>
          <div className="col-span-2">
            <Label htmlFor="firstName">Oficio de Recepción</Label>
            <Input type="text" id="firstName" />
          </div>
          <div className="col-span-2">
            <Label htmlFor="email">Descripción</Label>
            <TextArea
              placeholder="Escribe la descripción del ticket..."
              rows={6}
              value={message}
              onChange={handleTextareaChange}
              className=" bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div className="col-span-2">
            <h4 className="pb-4 text-base font-medium text-gray-800 border-b border-gray-200 dark:border-gray-800 dark:text-white/90">
              Resolutor o Moderador
            </h4>
          </div>
          <div className="col-span-2">
            <Label htmlFor="email">Resolutor</Label>
            <Select
              options={optionsGender}
              placeholder="Select an option"
              onChange={handleSelectGender}
              defaultValue=""
              className="bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div className="col-span-2">
            <h4 className="pb-4 text-base font-medium text-gray-800 border-b border-gray-200 dark:border-gray-800 dark:text-white/90">
              Archivos
            </h4>
          </div>
          <div className="col-span-2">
            <DropzoneComponent />
          </div>

          <div className="flex gap-3">
            <Button size="sm" variant="outline">
              Borrar Formulario
            </Button>
            <Button size="sm">Guardar Ticket</Button>
          </div>
        </div>
      </Form>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-4">
          <FormularioCrearCliente />
        </div>
      </Modal>
    </ComponentCard>
  );
}
