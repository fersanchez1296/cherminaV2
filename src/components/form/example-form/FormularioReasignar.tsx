"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Form from "../Form";
import Label from "../Label";
import Select from "../Select";
import TextArea from "../input/TextArea";
import Button from "../../ui/button/Button";
import Switch from "@/components/form/switch/Switch";

export default function FormularioReasignar() {
  const [message, setMessage] = useState<string>("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:");
  };
  const options = [
    { value: "marketing", label: "Option 1" },
    { value: "template", label: "Option 2" },
    { value: "development", label: "Option 3" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  const handleTextareaChange = (value: string) => {
    setMessage(value);
    console.log("Message:", value);
  };

  const handleSwitchChange = (checked: boolean) => {
    console.log("Switch is now:", checked ? "ON" : "OFF");
  };
  return (
    <ComponentCard title="Reasignar Ticket">
      <Form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="col-span-2">
            <Label htmlFor="subject">Resolutor</Label>
            <Select
              options={options}
              placeholder="Resolutor"
              onChange={handleSelectChange}
              defaultValue=""
              className="bg-gray-50 dark:bg-gray-800"
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="email">Nota</Label>
            <TextArea
              placeholder="Ingresa el texto de la nota-(opcional)."
              rows={6}
              value={message}
              onChange={handleTextareaChange}
              className=" bg-gray-50 dark:bg-gray-800"
            />
          </div>
          <div className="col-span-2">
            <Switch
              label="Visto Bueno"
              defaultChecked={false}
              onChange={handleSwitchChange}
            />
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
