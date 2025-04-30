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

export default function FormularioContacto() {
  const [message, setMessage] = useState<string>("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:");
  };
  const handleTextareaChange = (value: string) => {
    setMessage(value);
    console.log("Message:", value);
  };
  return (
    <ComponentCard title="Contactar cliente">
      <Form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="firstName">Nombre del cliente</Label>
            <Input type="text" id="firstName" disabled/>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="email">Email</Label>
            <Input type="text" id="email" disabled/>
          </div>
          <div className="col-span-2 sm:col-span-2">
            <Label htmlFor="destinatarios">Otros destinatarios</Label>
            <Input type="text" id="destinatarios" placeholder="Ingresa los destinatarios separados por una coma..."/>
          </div>
          <div className="col-span-2">
            <Label htmlFor="subject">Asunto</Label>
            <Input type="text"  id="subject" disabled/>
          </div>
          <div className="col-span-2">
            <Label htmlFor="email">Mensaje</Label>
            <TextArea
              placeholder="Escribe tu mensaje aqui..."
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
