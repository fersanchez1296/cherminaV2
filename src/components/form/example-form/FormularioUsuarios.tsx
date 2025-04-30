"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Form from "../Form";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import TextArea from "../input/TextArea";
import Button from "../../ui/button/Button";
import PhoneInput from "../group-input/PhoneInput";
import Switch from "../switch/Switch";

export default function FormularioUsuarios() {
  const [message, setMessage] = useState<string>("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:");
  };
  const countries = [
    { code: "IPEJAL", label: "333-208-0340" },
    { code: "Otro", label: "" },
  ];
  const handlePhoneNumberChange = (phoneNumber: string) => {
    console.log("Updated phone number:", phoneNumber);
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
    <ComponentCard title="Usuario">
      <Form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="firstName">Nombre</Label>
            <Input
              type="text"
              placeholder="Ingresa el nombre completo del cliente"
              id="firstName"
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="email">Correo</Label>
            <Input
              type="text"
              placeholder="Ingresa el correo electrónico del cliente"
              id="email"
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="email">Teléfono</Label>
            <PhoneInput
              selectPosition="start"
              countries={countries}
              placeholder="555-000-0000"
              onChange={handlePhoneNumberChange}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="email">Extensión</Label>
            <Input type="tel" id="test" />
          </div>
          <div className="col-span-1">
            <Label htmlFor="subject">Dirección General</Label>
            <Select
              options={options}
              placeholder="Select an option"
              onChange={handleSelectChange}
              defaultValue=""
              className="bg-gray-50 dark:bg-gray-800"
            />
          </div>
          <div className="col-span-1 flex align-center justify-center mt-5">
            <Switch
              label="Nueva Direccion General"
              defaultChecked={false}
              onChange={handleSwitchChange}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="subject">Dirección Área</Label>
            <Select
              options={options}
              placeholder="Select an option"
              onChange={handleSelectChange}
              defaultValue=""
              className="bg-gray-50 dark:bg-gray-800"
            />
          </div>
          <div className="col-span-1 flex align-center justify-center mt-5">
            <Switch
              label="Nueva Direccion de Área"
              defaultChecked={false}
              onChange={handleSwitchChange}
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="email">Ubicación</Label>
            <TextArea
              placeholder="Ingresa la ubicación del cliente..."
              rows={6}
              value={message}
              onChange={handleTextareaChange}
              className=" bg-gray-50 dark:bg-gray-800"
            />
          </div>
          <div className="col-span-2">
            <Button size="sm" className="w-full">
              Guardar Cliente
            </Button>
          </div>
        </div>
      </Form>
    </ComponentCard>
  );
}
