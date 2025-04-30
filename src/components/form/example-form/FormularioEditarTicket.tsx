"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Form from "../Form";
import Label from "../Label";
import Input from "../input/InputField";
import TextArea from "../input/TextArea";
import Button from "../../ui/button/Button";
import { PaperPlaneIcon } from "../../../icons";
import DropzoneComponent from "../form-elements/DropZone";
import Select from "../Select";

export default function FormularioEditar() {
  const [message, setMessage] = useState<string>("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:");
  };
  const handleTextareaChange = (value: string) => {
    setMessage(value);
    console.log("Message:", value);
  };

  const options = [
    { value: "marketing", label: "Option 1" },
    { value: "template", label: "Option 2" },
    { value: "development", label: "Option 3" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };
  return (
    <ComponentCard title="Editar Ticket">
      <Form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="firstName">Creado Por</Label>
            <Input type="text" id="firstName" disabled />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="email">Id</Label>
            <Input type="text" id="email" disabled />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="email">Estado</Label>
            <Input type="text" id="email" disabled />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="email">Fecha límite de resolución</Label>
            <Input type="text" id="email" disabled />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="email">Subcategoría</Label>
            <Input type="text" id="email" disabled />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="destinatarios">Oficio de Recepción</Label>
            <Input
              type="text"
              id="destinatarios"
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="subject">Medio de contacto</Label>
            <Select
              options={options}
              onChange={handleSelectChange}
              defaultValue=""
              className="bg-gray-50 dark:bg-gray-800"
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="email">Descripción del ticket</Label>
            <TextArea
              rows={6}
              value={message}
              onChange={handleTextareaChange}
              className=" bg-gray-50 dark:bg-gray-800"
            />
          </div>
          <div className="col-span-2">
            <DropzoneComponent />
          </div>
          <div className="col-span-2">
            <Button size="sm" className="w-full">
              Enviar correo
              <PaperPlaneIcon />
            </Button>
          </div>
        </div>
      </Form>
    </ComponentCard>
  );
}
