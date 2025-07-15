"use client";
import React, { CSSProperties, useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal/index";
import Label from "@/components/form/Label";
import DropzoneComponent from "@/components/form/form-elements/DropZone";
import Button from "@/components/ui/button/Button";
import { useForm, Controller } from "react-hook-form";
import {
  cambiarcelulaticket,
  getCelulas,
  getMedios,
  putEditar,
  putNota,
  putOficio,
  putReabrir,
} from "@/services/ticketService";
import Input from "@/components/form/input/InputField";
import { useNotification } from "@/context/NotificationProvider";
import Select from "react-select";
import { ArrowUpDownIcon, Option } from "lucide-react";
import TextArea from "@/components/form/input/TextArea";
import { da } from "date-fns/locale";
import { useLoadingStore } from "@/stores/loadingStore";
interface Open {
  open: boolean;
  handleToggleModalState: (modal: string, boolState: boolean) => void;
  uuid?: string;
  id?: string;
  ticket: any;
}
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

const ModalCambiarTicketCelula = ({
  open,
  handleToggleModalState,
  ticket,
  uuid,
}: Open) => {
  const setLoading = useLoadingStore((state) => state.setLoading);
  const [celulas, setCelulas] = useState<Option[]>([]);
  const { showNotification } = useNotification();
  const { isOpen, closeModal, setOpen } = useModal();
  const form = useForm();
  const { handleSubmit, control, reset, setValue } = form;
  const callbackClose = () => {
    closeModal();
    handleToggleModalState("cambiarCelula", false);
  };
  useEffect(() => {
    const fetchCelulas = async () => {
      try {
        const result = await getCelulas();
        setCelulas(result.data);
      } catch (error) {
        console.error("Error al obtener los medios:", error);
      }
    };
    fetchCelulas(); // Llama a la función
  }, []);

  useEffect(() => {
    if (ticket?.Celulas?.length && celulas.length) {
      const values = celulas.filter((celula) =>
        ticket.Celulas.includes(celula.value)
      );
      setValue("lastCelula", values);
    }
  }, [ticket, celulas, setValue]);

  const handleSave = async (data: any) => {
    setLoading(true);
    try {
      const result = await cambiarcelulaticket(uuid, data);
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
    setOpen(open);
  });
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={callbackClose}
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Cambiar de célula ticket #{ticket.Id}
            </h4>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  {/* celula anterior */}
                  <div className="col-span-2">
                    <Label htmlFor="medio">Célula anterior</Label>
                    <Controller
                      name="lastCelula"
                      control={control}
                      render={({ field }) => (
                        <Select<Option, false, GroupedOption>
                          {...field}
                          options={celulas}
                          formatGroupLabel={formatGroupLabel}
                          isDisabled={true}
                          value={celulas?.filter((option) =>
                            field.value?.some(
                              (v: any) => v.value === option.value
                            )
                          )}
                          onChange={(selected) => field.onChange(selected)}
                        />
                      )}
                    />
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <ArrowUpDownIcon />
                  </div>
                  {/* celula nueva */}
                  <div className="col-span-2">
                    <Label htmlFor="celula">Nueva Célula</Label>
                    <Controller
                      name="celula"
                      control={control}
                      render={({ field }) => (
                        <Select<Option, false, GroupedOption>
                          placeholder="Selecciona la nueva célula"
                          {...field}
                          options={celulas}
                          formatGroupLabel={formatGroupLabel}
                          value={celulas.find(option => field.value?.value === option.value) || null}
                          onChange={(selected) => field.onChange(selected)}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={callbackClose}>
                Cerrar
              </Button>
              <Button size="sm" onClick={handleSubmit(handleSave)}>
                Guardar
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ModalCambiarTicketCelula;
