"use client";
import React, { CSSProperties, useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal/index";
import Label from "@/components/form/Label";
import DropzoneComponent from "@/components/form/form-elements/DropZone";
import Button from "@/components/ui/button/Button";
import { useForm, Controller } from "react-hook-form";
import {
  getMedios,
  putEditar,
  putNota,
  putOficio,
  putReabrir,
} from "@/services/ticketService";
import Input from "@/components/form/input/InputField";
import { useNotification } from "@/context/NotificationProvider";
import Select from "react-select";
import { Option } from "lucide-react";
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

const ModalEditar = ({ open, handleToggleModalState, ticket, uuid }: Open) => {
  const setLoading = useLoadingStore((state) => state.setLoading);
  const [medios, setMedios] = useState<Option[]>([]);
  const { showNotification } = useNotification();
  const { isOpen, closeModal, setOpen } = useModal();
  const form = useForm();
  const { handleSubmit, control, reset } = form;
  const callbackClose = () => {
    closeModal();
    handleToggleModalState("editar", false);
  };
  useEffect(() => {
    const fetchMedios = async () => {
      try {
        const result = await getMedios();
        setMedios(result.data);
      } catch (error) {
        console.error("Error al obtener los medios:", error);
      }
    };
    fetchMedios(); // Llama a la función
  }, []);
  const handleSave = async (data: any) => {
    setLoading(true);
    try {
      console.log("DATA", data);
      const result = await putEditar(data, uuid);
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
              Editar ticket #{ticket.Id}
            </h4>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  {/* creado por */}
                  <div>
                    <Label htmlFor="firstName">Creado por:</Label>
                    <Input
                      type="text"
                      id="firstName"
                      disabled
                      defaultValue={ticket.Creado_por}
                    />
                  </div>
                  {/* estado */}
                  <div>
                    <Label htmlFor="firstName">Estado:</Label>
                    <Input
                      type="text"
                      id="firstName"
                      disabled
                      defaultValue={ticket.Estado.Estado}
                    />
                  </div>
                  {/* Fecha límite de resolución */}
                  <div>
                    <Label htmlFor="firstName">
                      Fecha límite de resolución:
                    </Label>
                    <Input
                      type="text"
                      id="firstName"
                      disabled
                      defaultValue={ticket.Fecha_limite_resolucion_SLA}
                    />
                  </div>
                  {/* medio de contacto */}
                  <div className="col-span-1">
                    <Label htmlFor="medio">Medio de Contacto</Label>
                    <Controller
                      name="Medio"
                      control={control}
                      render={({ field }) => (
                        <Select<Option, false, GroupedOption>
                          placeholder="Selecciona un medio de contacto"
                          {...field}
                          options={medios}
                          formatGroupLabel={formatGroupLabel}
                          onChange={(selectedOption) => {
                            field.onChange(selectedOption?.value);
                          }}
                          value={medios.find(
                            (medio) => medio.value === field.value
                          )}
                        />
                      )}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Oficio de recepción:</Label>
                    <Controller
                      name="NumeroRec_Oficio"
                      control={control}
                      //rules={{ required: "Este campo es obligatorio" }}
                      render={({ field, fieldState }) => (
                        <Input
                          {...field}
                          error={!!fieldState.error}
                          hint={fieldState.error?.message}
                          placeholder="Ingresa el nombre del oficio de recepción"
                        />
                      )}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Descripcion del ticket:</Label>
                    <Controller
                      name="Descripcion"
                      defaultValue={ticket.Descripcion}
                      control={control}
                      rules={{ required: "Este campo es obligatorio" }}
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

export default ModalEditar;
