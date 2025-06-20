"use client";

import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "react-select";
import Form from "../Form";
import Button from "../../ui/button/Button";
import DropzoneComponent from "../form-elements/DropZone";
import TextArea from "../input/TextArea";
import { useState, CSSProperties, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import FormularioCrearCliente from "./FormularioClientes";
import { useForm, Controller } from "react-hook-form";
import { calcularFechaLimite } from "@/app/utils/calcular-fecha-limite";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  getSelectsCrearTicket,
  postCrearTicket,
} from "@/services/ticketService";
import { getBuscarCliente } from "@/services/clientService";
import { useNotification } from "@/context/NotificationProvider";

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

export default function FormularioCrearTicket() {
  const { isOpen, openModal, closeModal } = useModal();
  const [Tipo_incidencia, setTipo_incidencia] = useState("");
  const [area, setArea] = useState("");
  const [servicio, setServicio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tiempo, setTiempo] = useState("");
  const form = useForm();
  const { handleSubmit, control, setValue, reset } = form;
  const [resolutores, setResolutores] = useState<GroupedOption[]>([]);
  const [medios, setMedios] = useState<Option[]>([]);
  const [subcategoria, setSubcategoria] = useState([]);
  const [clienteId, setClienteId] = useState();
  const [cliente, setCliente] = useState("");
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      const options = await getSelectsCrearTicket();
      setResolutores(options.resolutores);
      setMedios(options.medios);
      setSubcategoria(options.subcategorias);
    };
    fetchData();
  }, []);

  const handleSubcategoriaChange = (selectedOption: string) => {
    if (!selectedOption) return;
    const selectedSubcategoria = selectedOption._id;
    const catalogo = subcategoria.find((s) =>
      s._id.includes(selectedSubcategoria)
    );

    if (!catalogo) return;

    const tiempo = catalogo.Prioridad;
    setValue("tiempo", tiempo);
    setValue("Area", catalogo.Equipo._id);
    setDescripcion(catalogo.Descripcion_prioridad);
    setCategoria(catalogo["Categoría"]);
    setServicio(catalogo.Servicio);
    setTipo_incidencia(catalogo.Tipo);
    setArea(catalogo.Equipo.Area);

    if (tiempo) {
      const fechaLimite = calcularFechaLimite(tiempo);
      const fechaFormateada = format(
        fechaLimite,
        "d 'de' MMMM 'de' yyyy, h:mm a",
        {
          locale: es,
        }
      );
      setTiempo(fechaFormateada);
    }
  };

  const handleSave = async (data) => {
    try {
      const result = await postCrearTicket(data);
      if (result.status === 201) {
        showNotification(
          "Éxito",
          result.data?.desc || "Operación exitosa",
          "success"
        );
        reset();
      } else {
        showNotification(
          "Aviso",
          result.data?.desc || "Respuesta inesperada del servidor",
          "warning"
        );
      }
    } catch (error) {
      const message =
        error.response?.data?.desc || "Ocurrió un error inesperado.";
      showNotification("Error", message, "error");
    }
  };

  const handleBuscarCliente = async () => {
    try {
      const result = await getBuscarCliente(cliente);
      console.log(result.data);
      if (result?.status === 200 && result.data) {
        setClienteId(result.data);
        setValue("Cliente", result.data._id);
      } else {
        console.warn("Cliente no encontrado o respuesta inesperada:", result);
      }
    } catch (error) {
      console.error("Error al buscar cliente:", error);
    } finally {
      setCliente("");
    }
  };

  return (
    <ComponentCard title="Crear Ticket">
      <Form onSubmit={handleSubmit(handleSave)}>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="col-span-2">
            <h4 className="pb-4 text-base font-medium text-gray-800 border-b border-gray-200 dark:border-gray-800 dark:text-white/90">
              Cliente
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end min-w-max">
            <div className="flex flex-col">
              <Label htmlFor="firstName">Nombre o Correo del Cliente</Label>
              <Input
                type="text"
                id="firstName"
                placeholder="Ingresa el nombre completo o correo del cliente"
                className="w-full"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
              />
            </div>
            <Button
              size="sm"
              disabled={!cliente ? true : false}
              className="w-full self-end"
              onClick={handleBuscarCliente}
            >
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
            {clienteId && (
              <div>
                <h4 className="pb-4 text-base font-medium text-gray-800 border-b border-gray-200 dark:border-gray-800 dark:text-white/90">
                  Cliente Seleccionado:{" "}
                  <span className="text-violet-800">{clienteId.Nombre}</span>
                </h4>
              </div>
            )}
          </div>

          <div className="col-span-2">
            <h4 className="pb-4 text-base font-medium text-gray-800 border-b border-gray-200 dark:border-gray-800 dark:text-white/90">
              Ticket
            </h4>
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
                    field.onChange(selectedOption);
                  }}
                  value={field.value}
                />
              )}
            />
          </div>
          {/* subcategoria */}
          <div className="col-span-1">
            <Label htmlFor="email">Subcategoría</Label>
            <Controller
              name="Subcategoria"
              control={control}
              render={({ field }) => (
                <Select<Option, false, GroupedOption>
                  placeholder="Selecciona la subcategoría"
                  {...field}
                  options={subcategoria}
                  formatGroupLabel={formatGroupLabel}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption);
                    handleSubcategoriaChange(selectedOption);
                  }}
                  value={field.value}
                />
              )}
            />
          </div>
          {/* categoria */}
          <div>
            <Label htmlFor="firstName">Categoría</Label>
            <Input type="text" id="firstName" disabled defaultValue={categoria} />
          </div>
          {/* servicio */}
          <div>
            <Label htmlFor="firstName">Servicio</Label>
            <Input type="text" id="firstName" disabled defaultValue={servicio} />
          </div>
          {/* Tipo de incidente */}
          <div>
            <Label htmlFor="firstName">Tipo de Incidente</Label>
            <Input
              type="text"
              id="firstName"
              disabled
              defaultValue={Tipo_incidencia}
            />
          </div>
          {/* area */}
          <div>
            <Label htmlFor="firstName">Área</Label>
            <Input type="text" id="firstName" disabled defaultValue={area} />
          </div>
          {/* fecha de resolucion */}
          <div>
            <Label htmlFor="firstName">Fecha de Resolución</Label>
            <Input type="text" id="firstName" disabled defaultValue={tiempo} />
          </div>
          {/* prioridad */}
          <div>
            <Label htmlFor="firstName">Prioridad</Label>
            <Input type="text" id="firstName" disabled defaultValue={descripcion} />
          </div>
          {/* oficio de recepcion */}
          <div className="col-span-2">
            <Label htmlFor="firstName">Oficio de Recepción</Label>
            <Controller
              name="NumeroRec_Oficio"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <Input type="text" id="firstName" {...field} />
              )}
            />
          </div>
          {/* descripcion del ticket */}
          <div className="col-span-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Controller
              name="Descripcion"
              control={control}
              render={({ field }) => (
                <TextArea
                  className=" bg-gray-50 dark:bg-gray-800"
                  placeholder="Escribe la descripción del ticket..."
                  rows={6}
                  {...field}
                />
              )}
            />
          </div>
          {/* resolutor */}
          <div className="col-span-2">
            <h4 className="pb-4 text-base font-medium text-gray-800 border-b border-gray-200 dark:border-gray-800 dark:text-white/90">
              Resolutor o Moderador
            </h4>
          </div>
          <div className="col-span-2">
            <Label htmlFor="email">Resolutor</Label>
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

          <div className="col-span-2">
            <h4 className="pb-4 text-base font-medium text-gray-800 border-b border-gray-200 dark:border-gray-800 dark:text-white/90">
              Archivos
            </h4>
          </div>
          <div className="col-span-2">
            <DropzoneComponent form={form} />
          </div>

          <div className="flex gap-3">
            <Button size="sm" variant="outline">
              Borrar Formulario
            </Button>
            <Button size="sm" type="submit">
              Guardar Ticket
            </Button>
          </div>
        </div>
      </Form>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-4">
          <FormularioCrearCliente
            disabled={false}
            isCreate={true}
            isEdit={false}
          />
        </div>
      </Modal>
    </ComponentCard>
  );
}
