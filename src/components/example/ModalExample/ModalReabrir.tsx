"use client";
import React, { useEffect, useState, CSSProperties } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal/index";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import DropzoneComponent from "@/components/form/form-elements/DropZone";
import Button from "@/components/ui/button/Button";
import { useForm, Controller } from "react-hook-form";
import { putReabrir, getResolutores } from "@/services/ticketService";
import ComponentCard from "../../common/ComponentCard";
import Form from "@/components/form/Form";
import Input from "@/components/form/input/InputField";
import Select from "react-select";
// Interfaces para React Select
interface Option {
  value: string;
  label: string;
}

interface GroupedOption {
  label: string;
  options: Option[];
}

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const groupBadgeStyles: CSSProperties = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};

const formatGroupLabel = (data: GroupedOption) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

interface Open {
  open: boolean;
  handleToggleModalState: (modal: string, boolState: boolean) => void;
  id?: string;
  uuid?: string;
  fechaResolucion?: string;
}

const ModalReabrir = ({
  open,
  handleToggleModalState,
  id,
  uuid,
  fechaResolucion,
}: Open) => {
  const { isOpen, closeModal, setOpen } = useModal();
  const form = useForm();
  const { handleSubmit, control, reset } = form;

  const [resolutores, setResolutores] = useState<GroupedOption[]>([]);

  const callbackClose = () => {
    closeModal();
    handleToggleModalState("reabrir", false);
  };

  const clearFiles = () => {
    reset();
  };

  const handleSave = async (data: any) => {
    await putReabrir(data, uuid);
    clearFiles();
  };

  useEffect(() => {
    setOpen(open);
  }, [open, setOpen]);

  useEffect(() => {
    const fetchData = async () => {
      const options = await getResolutores();
      setResolutores(options);
    };
    fetchData();
  }, []);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={callbackClose}
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-4">
          <ComponentCard title="Reabrir Ticket">
            <Form onSubmit={handleSubmit(handleSave)}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="col-span-2">
                  <Label htmlFor="resolutor">Resolutor</Label>
                  <Controller
                    name="Asignado_a"
                    control={control}
                    render={({ field }) => (
                      <Select<Option, false, GroupedOption>
                        placeholder="Selecciona un resolutor"
                        {...field}
                        options={resolutores}
                        formatGroupLabel={formatGroupLabel}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption);
                        }}
                        value={field.value}
                      />
                    )}
                  />
                </div>

                <div className="col-span-2 sm:col-span-2">
                  <Label htmlFor="firstName">fechaResolucion de Resolución</Label>
                  <Input
                    type="text"
                    id="firstName"
                    disabled
                    defaultValue={fechaResolucion}
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="nota">Nota (opcional)</Label>
                  <Controller
                    name="Nota"
                    control={control}
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

                <div className="col-span-2">
                  <Button size="sm" className="w-full" type="submit">
                    Guardar Ticket
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

export default ModalReabrir;
