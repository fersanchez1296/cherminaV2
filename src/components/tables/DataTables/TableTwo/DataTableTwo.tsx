"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../ui/table";
import {
  AngleDownIcon,
  AngleUpIcon,
  EyeIcon,
  EnvelopeIcon,
  CheckLineIcon,
  DocumentPlusIcon,
  CheckCircleIcon,
  ArrowUTurnDownIcon,
  ArrowUTurnLeftIcon,
  ClockIcon,
  ArrowsRepeatIcon,
  ArrowsRepeatOneIcon,
  EditIcon,
  ReceiptRefoundIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ClockArrowIcon,
  ForwardIcon,
} from "../../../../icons";
import PaginationWithButton from "./PaginationWithButton";
import Badge from "../../../ui/badge/Badge";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal/index";
import Invoice from "@/components/invoice/Invoice";
import { Tooltip } from "@/components/ui/tooltip/Tooltip";
import Button from "@/components/ui/button/Button";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import DropzoneComponent from "@/components/form/form-elements/DropZone";
import FormularioContacto from "@/components/form/example-form/FormularioContacto";
import FormularioReabrir from "@/components/form/example-form/FormularioReabrirTicket";
import FormularioAsignar from "@/components/form/example-form/FormularioAsignar";
import FormularioReasignar from "@/components/form/example-form/FormularioReasignar";
import FormularioAceptar from "@/components/form/example-form/FormularioAceptarResolucion";
import FormularioRechazar from "@/components/form/example-form/FormularioRechazarResolucion";
import FormularioPendiente from "@/components/form/example-form/FormularioPendiente";
import FormularioEditar from "@/components/form/example-form/FormularioEditarTicket";
import { getTickets } from "@/services/ticketService";
interface data {
  Area: object;
  Asignado_a: Array<{
    _id: string;
    Nombre: string;
    Correo: string;
    Area: Array<{ _id: string; Area: string }>;
  }>;
  Resuelto_por: {
    _id: string;
    Nombre: string;
    Correo: string;
    Area: Array<{ _id: string; Area: string }>;
  };
  Cerrado_por: {
    _id: string;
    Nombre: string;
    Correo: string;
    Area: Array<{ _id: string; Area: string }>;
  };
  Cliente: {
    Nombre: string;
    Correo: string;
    Telefono: string;
    Extension: string;
    Ubicacion: string;
    Direccion_General: { Direccion_General: string; _id: string };
    direccion_area: { direccion_area: string; _id: string };
    Dependencia: { Dependencia: string; _id: string };
  };
  Creado_por: {
    _id: string;
    Nombre: string;
    Correo: string;
    Area: Array<{ _id: string; Area: string }>;
  };
  Descripcion: string;
  Estado: { Estado: string; _id: string };
  Fecha_hora_cierre: string;
  Fecha_hora_creacion: string;
  Fecha_hora_resolucion: string;
  Fecha_hora_ultima_modificacion: string;
  Fecha_limite_resolucion_SLA: string;
  Fecha_limite_respuesta_SLA: string;
  Files: Array<{ _id: string; name: string; url: string }>;
  Historia_ticket: Array<{
    _id: string;
    Fecha: string;
    Mensaje: string;
    Titulo: string;
    Nombre: { Nombre: string };
  }>;
  Id: string;
  Medio: { Medio: string; _id: string };
  NumeroRec_Oficio: string;
  Numero_Oficio: string;
  Reasignado_a?: Array<{
    _id: string;
    Nombre: string;
    Correo: string;
    Area: Array<{ _id: string; Area: string }>;
  }>;
  Subcategoria: {
    Servicio: string;
    Categoría: string;
    Subcategoria: string;
    Tipo: string;
    Prioridad: number;
    Equipo: { _id: string; Area: string };
    Descripcion_prioridad: string;
  };
  _id: string;
  createdAt: string;
  standby: boolean;
  updatedAt: string;
  vistoBueno: boolean;
  Descripcion_cierre: string;
  PendingReason: string;
}
type SortKey = "Asignado_a" | "Cliente" | "Id";
// | "status"
// | "prioridad"
// | "fechaCreacion"
// | "fechaResolucion"
// | "fechaCierre"
// | "Tipo";
type SortOrder = "asc" | "desc";

interface props {
  status: string;
}

export default function DataTableTwo({ status }: props) {
  console.log(status);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortKey, setSortKey] = useState<SortKey>("Id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [tableRowData, setTableRowData] = useState<Array<data>>([]);
  const [singleItem, setSingleItem] = useState<object>({});
  useEffect(() => {
    getTickets(status).then((res) => setTableRowData(res.data));
  }, [status]);
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isOpenNota,
    openModal: openModalNota,
    closeModal: closeModalNota,
  } = useModal();
  const {
    isOpen: isOpenResolver,
    openModal: openModalResolver,
    closeModal: closeModalResolver,
  } = useModal();
  const {
    isOpen: isOpenContactoCliente,
    openModal: openModalContactoCliente,
    closeModal: closeModalContactoCliente,
  } = useModal();
  const {
    isOpen: isOpenCerrarTicket,
    openModal: openModalCerrarTicket,
    closeModal: closeModalCerrarTicket,
  } = useModal();
  const {
    isOpen: isOpenReabrirTicket,
    openModal: openModalReabrirTicket,
    closeModal: closeModalReabrirTicket,
  } = useModal();
  const {
    isOpen: isOpenRegresarTicket,
    openModal: openModalRegresarTicket,
    closeModal: closeModalRegresarTicket,
  } = useModal();
  const {
    isOpen: isOpenRPendienteTicket,
    openModal: openModalRPendienteTicket,
    closeModal: closeModalRPendienteTicket,
  } = useModal();
  const {
    isOpen: isOpenAsignarTicket,
    openModal: openModalAsignarTicket,
    closeModal: closeModalAsignarTicket,
  } = useModal();
  const {
    isOpen: isOpenReasignarTicket,
    openModal: openModalReasignarTicket,
    closeModal: closeModalReasignarTicket,
  } = useModal();
  const {
    isOpen: isOpenRegresarMesaTicket,
    openModal: openModalRegresarMesaTicket,
    closeModal: closeModalRegresarMesaTicket,
  } = useModal();
  const {
    isOpen: isOpenAceptarTicket,
    openModal: openModalAceptarTicket,
    closeModal: closeModalAceptarTicket,
  } = useModal();
  const {
    isOpen: isOpenRechazarTicket,
    openModal: openModalRechazarTicket,
    closeModal: closeModalRechazarTicket,
  } = useModal();
  const {
    isOpen: isOpenPendienteTicket,
    openModal: openModalPendienteTicket,
    closeModal: closeModalPendienteTicket,
  } = useModal();
  const {
    isOpen: isOpenRegresarModeradorTicket,
    openModal: openModalRegresarModeradorTicket,
    closeModal: closeModalRegresarModeradorTicket,
  } = useModal();
  const {
    isOpen: isOpenEditarTicket,
    openModal: openModalEditarTicket,
    closeModal: closeModalEditarTicket,
  } = useModal();

  const getNestedValue = (obj: any, path: string): any => {
    return path.split(".").reduce((acc, part) => {
      if (acc === null || acc === undefined) return undefined;
      if (Array.isArray(acc)) acc = acc[0]; // tomar el primer elemento
      if (typeof acc !== "object") return undefined; // evitar acceder propiedades de strings, numbers, etc.
      return acc[part];
    }, obj);
  };

  const filteredAndSortedData = useMemo(() => {
    return tableRowData
      .filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .sort((a, b) => {
        const aValue = getNestedValue(a, sortKey);
        const bValue = getNestedValue(b, sortKey);

        if (aValue === undefined) return 1;
        if (bValue === undefined) return -1;

        return sortOrder === "asc"
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      });
  }, [sortKey, sortOrder, searchTerm, tableRowData]);

  const totalItems = filteredAndSortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentData = filteredAndSortedData.slice(startIndex, endIndex);

  const getBadgeColor: { [key: string]: string } = {
    CERRADOS: "error",
    ABIERTOS: "success",
    NUEVOS: "primary",
    REABIERTOS: "primary",
    PENDIENTES: "warning",
    REVISION: "warning",
    STANDY: "warning",
    RESUELTOS: "info",
    CERRADO: "error",
    Baja: "success",
    Planeada: "primary",
    Media: "warning",
    Alta: "error",
    default: "primary",
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl bg-white dark:bg-white/[0.03]">
        <div className="flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="text-gray-500 dark:text-gray-400"> Show </span>
            <div className="relative z-20 bg-transparent">
              <select
                className="w-full py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-9 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
              >
                {[5, 8, 10].map((value) => (
                  <option
                    key={value}
                    value={value}
                    className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
                  >
                    {value}
                  </option>
                ))}
              </select>
              <span className="absolute z-30 text-gray-500 -translate-y-1/2 right-2 top-1/2 dark:text-gray-400">
                <svg
                  className="stroke-current"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.8335 5.9165L8.00016 10.0832L12.1668 5.9165"
                    stroke=""
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
            <span className="text-gray-500 dark:text-gray-400"> entries </span>
          </div>

          <div className="relative">
            <button className="absolute text-gray-500 -translate-y-1/2 left-4 top-1/2 dark:text-gray-400">
              <svg
                className="fill-current"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.04199 9.37363C3.04199 5.87693 5.87735 3.04199 9.37533 3.04199C12.8733 3.04199 15.7087 5.87693 15.7087 9.37363C15.7087 12.8703 12.8733 15.7053 9.37533 15.7053C5.87735 15.7053 3.04199 12.8703 3.04199 9.37363ZM9.37533 1.54199C5.04926 1.54199 1.54199 5.04817 1.54199 9.37363C1.54199 13.6991 5.04926 17.2053 9.37533 17.2053C11.2676 17.2053 13.0032 16.5344 14.3572 15.4176L17.1773 18.238C17.4702 18.5309 17.945 18.5309 18.2379 18.238C18.5308 17.9451 18.5309 17.4703 18.238 17.1773L15.4182 14.3573C16.5367 13.0033 17.2087 11.2669 17.2087 9.37363C17.2087 5.04817 13.7014 1.54199 9.37533 1.54199Z"
                  fill=""
                />
              </svg>
            </button>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-11 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[300px]"
            />
          </div>
        </div>

        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <div>
            <Table>
              <TableHeader className="border-t border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]"
                  >
                    <div className="flex items-center justify-between cursor-pointer">
                      <p className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                        Acciones
                      </p>
                      <button className="flex flex-col gap-0.5">
                        <AngleUpIcon className="text-gray-300 dark:text-gray-700" />
                        <AngleDownIcon className="text-gray-300 dark:text-gray-700" />
                      </button>
                    </div>
                  </TableCell>
                  {[
                    { key: "resolutor", label: "Resolutor" },
                    { key: "cliente", label: "Cliente" },
                    { key: "id", label: "Id" },
                    { key: "estado", label: "Status" },
                    { key: "prioridad", label: "Prioridad" },
                    { key: "fcreacion", label: "Fecha de creacion" },
                    { key: "fresolucion", label: "Fecha limite de resolucion" },
                    { key: "fcierre", label: "Fecha de cierre" },
                    { key: "tipo", label: "Tipo" },
                  ].map(({ key, label }) => (
                    <TableCell
                      key={key}
                      isHeader
                      className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]"
                    >
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => handleSort(key as SortKey)}
                      >
                        <p className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                          {label}
                        </p>
                        <button className="flex flex-col gap-0.5">
                          <AngleUpIcon
                            className={`text-gray-300 dark:text-gray-700 ${
                              sortKey === key && sortOrder === "asc"
                                ? "text-brand-500"
                                : ""
                            }`}
                          />
                          <AngleDownIcon
                            className={`text-gray-300 dark:text-gray-700 ${
                              sortKey === key && sortOrder === "desc"
                                ? "text-brand-500"
                                : ""
                            }`}
                          />
                        </button>
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((item, index) => (
                  <TableRow key={index}>
                    {/* iconos */}
                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                      <div className="flex items-center w-full gap-2">
                        <Tooltip content="Ver" position="top" theme="dark">
                          <button
                            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                            onClick={() => {
                              openModal();
                              setSingleItem(item);
                            }}
                          >
                            <EyeIcon />
                          </button>
                        </Tooltip>
                        <Tooltip
                          content="Agregar nota"
                          position="top"
                          theme="dark"
                        >
                          <button
                            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                            onClick={openModalNota}
                          >
                            <DocumentPlusIcon />
                          </button>
                        </Tooltip>
                        <Tooltip content="Resolver" position="top" theme="dark">
                          <button
                            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                            onClick={openModalResolver}
                          >
                            <CheckLineIcon />
                          </button>
                        </Tooltip>
                        <Tooltip
                          content="Contactar Cliente"
                          position="top"
                          theme="dark"
                        >
                          <button
                            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                            onClick={openModalContactoCliente}
                          >
                            <EnvelopeIcon />
                          </button>
                        </Tooltip>
                        <Tooltip
                          content="Cerrar Ticket"
                          position="top"
                          theme="dark"
                        >
                          <button
                            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                            onClick={openModalCerrarTicket}
                          >
                            <CheckCircleIcon />
                          </button>
                        </Tooltip>
                        <Tooltip
                          content="Reabrir Ticket"
                          position="top"
                          theme="dark"
                        >
                          <button
                            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                            onClick={openModalReabrirTicket}
                          >
                            <ArrowUTurnDownIcon />
                          </button>
                        </Tooltip>
                        <Tooltip
                          content="Regresar Ticket a Resolutor"
                          position="top"
                          theme="dark"
                        >
                          <button
                            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                            onClick={openModalRegresarTicket}
                          >
                            <ArrowUTurnLeftIcon />
                          </button>
                        </Tooltip>
                        <Tooltip
                          content="Agregar Razón Pendiente"
                          position="top"
                          theme="dark"
                        >
                          <button
                            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                            onClick={openModalRPendienteTicket}
                          >
                            <ClockIcon />
                          </button>
                        </Tooltip>
                        <Tooltip
                          content="Asignar Ticket"
                          position="top"
                          theme="dark"
                        >
                          <button
                            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                            onClick={openModalAsignarTicket}
                          >
                            <ArrowsRepeatIcon />
                          </button>
                        </Tooltip>
                        <Tooltip
                          content="Reasignar Ticket"
                          position="top"
                          theme="dark"
                        >
                          <button
                            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                            onClick={openModalReasignarTicket}
                          >
                            <ArrowsRepeatOneIcon />
                          </button>
                        </Tooltip>
                        <Tooltip
                          content="Editar Ticket"
                          position="top"
                          theme="dark"
                        >
                          <button
                            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                            onClick={openModalEditarTicket}
                          >
                            <EditIcon />
                          </button>
                        </Tooltip>
                        <Tooltip
                          content="Regresar Ticket a Mesa de Servicio"
                          position="top"
                          theme="dark"
                        >
                          <button
                            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                            onClick={openModalRegresarMesaTicket}
                          >
                            <ReceiptRefoundIcon />
                          </button>
                        </Tooltip>
                        <Tooltip
                          content="Aceptar Resolución"
                          position="top"
                          theme="dark"
                        >
                          <button
                            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                            onClick={openModalAceptarTicket}
                          >
                            <HandThumbUpIcon />
                          </button>
                        </Tooltip>
                        <Tooltip
                          content="Rechazar Resolución"
                          position="top"
                          theme="dark"
                        >
                          <button
                            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                            onClick={openModalRechazarTicket}
                          >
                            <HandThumbDownIcon />
                          </button>
                        </Tooltip>
                        <Tooltip
                          content="Marcar Ticket Como Pendiente"
                          position="top"
                          theme="dark"
                        >
                          <button
                            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                            onClick={openModalPendienteTicket}
                          >
                            <ClockArrowIcon />
                          </button>
                        </Tooltip>
                        <Tooltip
                          content="Retornar Ticket a Moderador"
                          position="top"
                          theme="dark"
                        >
                          <button
                            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                            onClick={openModalRegresarModeradorTicket}
                          >
                            <ForwardIcon />
                          </button>
                        </Tooltip>
                      </div>
                    </TableCell>
                    {/* resolutor */}
                    <TableCell className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
                      <div className="flex gap-3">
                        <div>
                          <p className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {item.Reasignado_a?.[0]?.Nombre ??
                              item.Asignado_a?.[0]?.Nombre}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    {/* cliente */}
                    <TableCell className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
                      <div className="flex gap-3">
                        <div>
                          <p className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {item.Cliente.Nombre}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    {/* id */}
                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {item.Id}
                    </TableCell>
                    {/* estado */}
                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                      <Badge
                        size="sm"
                        color={
                          getBadgeColor[item?.Estado?.Estado ?? ""] ?? "default"
                        }
                      >
                        {item.Estado.Estado ?? "Sin estado"}
                      </Badge>
                    </TableCell>
                    {/* prioridad */}
                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                      <Badge
                        size="sm"
                        color={
                          getBadgeColor[
                            item?.Subcategoria?.Descripcion_prioridad ?? ""
                          ] ?? "default"
                        }
                      >
                        {item?.Subcategoria?.Descripcion_prioridad ??
                          "Sin prioridad"}
                      </Badge>
                    </TableCell>
                    {/* fecha creacion */}
                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      <span> {item.Fecha_hora_creacion}</span>
                    </TableCell>
                    {/* Fecha limite de resolucion */}
                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {item.Fecha_limite_resolucion_SLA}
                    </TableCell>
                    {/* Fecha de cierre */}
                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {item.Fecha_hora_cierre != ""
                        ? item.Fecha_hora_cierre
                        : "Ticket en curso"}
                    </TableCell>
                    {/* tipo */}
                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {item.Subcategoria.Tipo}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
            {/* Left side: Showing entries */}

            <PaginationWithButton
              totalPages={totalPages}
              initialPage={currentPage}
              onPageChange={handlePageChange}
            />
            <div className="pt-3 xl:pt-0">
              <p className="pt-3 text-sm font-medium text-center text-gray-500 border-t border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-t-0 xl:pt-0 xl:text-left">
                Showing {startIndex + 1} to {endIndex} of {totalItems} entries
              </p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        isFullscreen
        className="fixed top-0 left-0 flex flex-col justify-between w-full h-screen p-6 overflow-x-hidden overflow-y-auto bg-white dark:bg-gray-900 lg:p-15"
      >
        <Invoice singleItem={singleItem} />
      </Modal>
      <Modal
        isOpen={isOpenNota}
        onClose={closeModalNota}
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Agregar nota
            </h4>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2">
                    <Label>Descripcion</Label>
                    <TextArea
                      value={message}
                      onChange={(value) => setMessage(value)}
                      rows={10}
                    />
                  </div>
                  <div className="col-span-2 mt-5">
                    <DropzoneComponent />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModalNota}>
                Cerrar
              </Button>
              <Button size="sm">Guardar nota</Button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        isOpen={isOpenResolver}
        onClose={closeModalResolver}
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Resolver Ticket
            </h4>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2">
                    <Label>Descripcion</Label>
                    <TextArea
                      value={message}
                      onChange={(value) => setMessage(value)}
                      rows={10}
                    />
                  </div>
                  <div className="col-span-2 mt-5">
                    <DropzoneComponent />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModalResolver}>
                Cerrar
              </Button>
              <Button size="sm">Guardar ticket</Button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        isOpen={isOpenContactoCliente}
        onClose={closeModalContactoCliente}
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-4">
          <FormularioContacto />
        </div>
      </Modal>
      <Modal
        isOpen={isOpenCerrarTicket}
        onClose={closeModalCerrarTicket}
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Cerrar Ticket
            </h4>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2">
                    <Label>Descripcion</Label>
                    <TextArea
                      value={message}
                      onChange={(value) => setMessage(value)}
                      rows={10}
                    />
                  </div>
                  <div className="col-span-2 mt-5">
                    <DropzoneComponent />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={closeModalCerrarTicket}
              >
                Cerrar
              </Button>
              <Button size="sm">Guardar Ticket</Button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        isOpen={isOpenReabrirTicket}
        onClose={closeModalReabrirTicket}
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-4">
          <FormularioReabrir />
        </div>
      </Modal>
      <Modal
        isOpen={isOpenRegresarTicket}
        onClose={closeModalRegresarTicket}
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Regresar Ticket a Resolutor
            </h4>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2">
                    <Label>Descripcion</Label>
                    <TextArea
                      value={message}
                      onChange={(value) => setMessage(value)}
                      rows={10}
                    />
                  </div>
                  <div className="col-span-2 mt-5">
                    <DropzoneComponent />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={closeModalRegresarTicket}
              >
                Cerrar
              </Button>
              <Button size="sm">Guardar Ticket</Button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        isOpen={isOpenRPendienteTicket}
        onClose={closeModalRPendienteTicket}
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Agregar Razón Pendiente
            </h4>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2">
                    <Label>Descripcion</Label>
                    <TextArea
                      value={message}
                      onChange={(value) => setMessage(value)}
                      rows={10}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={closeModalRPendienteTicket}
              >
                Cerrar
              </Button>
              <Button size="sm">Guardar Ticket</Button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        isOpen={isOpenAsignarTicket}
        onClose={closeModalAsignarTicket}
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-4">
          <FormularioAsignar />
        </div>
      </Modal>
      <Modal
        isOpen={isOpenReasignarTicket}
        onClose={closeModalReasignarTicket}
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-4">
          <FormularioReasignar />
        </div>
      </Modal>
      <Modal
        isOpen={isOpenRegresarMesaTicket}
        onClose={closeModalRegresarMesaTicket}
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Retornar Ticket a mesa de servicio
            </h4>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2">
                    <Label>Descripcion</Label>
                    <TextArea
                      value={message}
                      onChange={(value) => setMessage(value)}
                      rows={10}
                    />
                  </div>
                  <div className="col-span-2 mt-5">
                    <DropzoneComponent />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={closeModalRegresarMesaTicket}
              >
                Cerrar
              </Button>
              <Button size="sm">Guardar Ticket</Button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        isOpen={isOpenAceptarTicket}
        onClose={closeModalAceptarTicket}
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-4">
          <FormularioAceptar />
        </div>
      </Modal>
      <Modal
        isOpen={isOpenRechazarTicket}
        onClose={closeModalRechazarTicket}
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-4">
          <FormularioRechazar />
        </div>
      </Modal>
      <Modal
        isOpen={isOpenPendienteTicket}
        onClose={closeModalPendienteTicket}
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-4">
          <FormularioPendiente />
        </div>
      </Modal>
      <Modal
        isOpen={isOpenRegresarModeradorTicket}
        onClose={closeModalRegresarModeradorTicket}
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Regresar Ticket a Moderador
            </h4>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2">
                    <Label>Descripcion</Label>
                    <TextArea
                      value={message}
                      onChange={(value) => setMessage(value)}
                      rows={10}
                    />
                  </div>
                  <div className="col-span-2 mt-5">
                    <DropzoneComponent />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={closeModalRegresarModeradorTicket}
              >
                Cerrar
              </Button>
              <Button size="sm">Guardar Ticket</Button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        isOpen={isOpenEditarTicket}
        onClose={closeModalEditarTicket}
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-4">
          <FormularioEditar />
        </div>
      </Modal>
    </>
  );
}
