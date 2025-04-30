"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Form from "../Form";
import Label from "../Label";
import Input from "../input/InputField";
import TextArea from "../input/TextArea";
import Button from "../../ui/button/Button";
import DropzoneComponent from "../form-elements/DropZone";

export default function FormularioRechazar() {
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
    <ComponentCard title="Rechazar Resolución">
      <Form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="col-span-2">
            <Label htmlFor="subject">Resolutor</Label>
            <Input type="text" id="subject" disabled/>
          </div>
          <div className="col-span-2 sm:col-span-2">
            <Label htmlFor="firstName">Fecha de Resolución</Label>
            <Input type="text" id="firstName" disabled/>
          </div>
          <div className="col-span-2">
            <Label htmlFor="email">Retroalimentación al resolutor</Label>
            <TextArea
              placeholder="Ingresa el texto aquí"
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
              Guardar Ticket
            </Button>
          </div>
        </div>
      </Form>
    </ComponentCard>
  );
}
