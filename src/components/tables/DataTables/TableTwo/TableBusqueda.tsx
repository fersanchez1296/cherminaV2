"use client";

import { useState, useMemo } from "react";
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
  DocumentPlusIcon,
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
import PhoneInput from "@/components/form/group-input/PhoneInput";
const tableRowData = [
  {
    resolutor: "Eduardo Antonino Garcia Salazar",
    cliente: "Josué Yahir Pérez Gómez",
    Id: 1720,
    status: "Abierto",
    prioridad: "Baja",
    fechaCreacion: "26 de marzo de 2025, 12:07 PM",
    fechaResolucion: "28 de marzo de 2025, 12:07 PM",
    fechaCierre: "Ticket en curso",
    Tipo: "Procesos de Negocio",
  },
  {
    resolutor: "Fernando Sanchez Plascencia",
    cliente: "Fatima Sanchez Plascencia",
    Id: 1721,
    status: "Abierto",
    prioridad: "Baja",
    fechaCreacion: "26 de marzo de 2025, 12:07 PM",
    fechaResolucion: "28 de marzo de 2025, 12:07 PM",
    fechaCierre: "Ticket en curso",
    Tipo: "Procesos de Negocio",
  },
  {
    resolutor: "Eduardo Antonino Garcia Salazar",
    cliente: "Josué Yahir Pérez Gómez",
    Id: 1722,
    status: "Abierto",
    prioridad: "Baja",
    fechaCreacion: "26 de marzo de 2025, 12:07 PM",
    fechaResolucion: "28 de marzo de 2025, 12:07 PM",
    fechaCierre: "Ticket en curso",
    Tipo: "Procesos de Negocio",
  },
  {
    resolutor: "Eduardo Antonino Garcia Salazar",
    cliente: "Josué Yahir Pérez Gómez",
    Id: 1723,
    status: "Abierto",
    prioridad: "Baja",
    fechaCreacion: "26 de marzo de 2025, 12:07 PM",
    fechaResolucion: "28 de marzo de 2025, 12:07 PM",
    fechaCierre: "Ticket en curso",
    Tipo: "Procesos de Negocio",
  },
  {
    resolutor: "Eduardo Antonino Garcia Salazar",
    cliente: "Josué Yahir Pérez Gómez",
    Id: 1724,
    status: "Abierto",
    prioridad: "Baja",
    fechaCreacion: "26 de marzo de 2025, 12:07 PM",
    fechaResolucion: "28 de marzo de 2025, 12:07 PM",
    fechaCierre: "Ticket en curso",
    Tipo: "Procesos de Negocio",
  },
  {
    resolutor: "Eduardo Antonino Garcia Salazar",
    cliente: "Josué Yahir Pérez Gómez",
    Id: 1725,
    status: "Abierto",
    prioridad: "Baja",
    fechaCreacion: "26 de marzo de 2025, 12:07 PM",
    fechaResolucion: "28 de marzo de 2025, 12:07 PM",
    fechaCierre: "Ticket en curso",
    Tipo: "Procesos de Negocio",
  },
  {
    resolutor: "Eduardo Antonino Garcia Salazar",
    cliente: "Josué Yahir Pérez Gómez",
    Id: 1726,
    status: "Abierto",
    prioridad: "Baja",
    fechaCreacion: "26 de marzo de 2025, 12:07 PM",
    fechaResolucion: "28 de marzo de 2025, 12:07 PM",
    fechaCierre: "Ticket en curso",
    Tipo: "Procesos de Negocio",
  },
  {
    resolutor: "Eduardo Antonino Garcia Salazar",
    cliente: "Josué Yahir Pérez Gómez",
    Id: 1727,
    status: "Abierto",
    prioridad: "Baja",
    fechaCreacion: "26 de marzo de 2025, 12:07 PM",
    fechaResolucion: "28 de marzo de 2025, 12:07 PM",
    fechaCierre: "Ticket en curso",
    Tipo: "Procesos de Negocio",
  },
  {
    resolutor: "Eduardo Antonino Garcia Salazar",
    cliente: "Josué Yahir Pérez Gómez",
    Id: 1728,
    status: "Abierto",
    prioridad: "Baja",
    fechaCreacion: "26 de marzo de 2025, 12:07 PM",
    fechaResolucion: "28 de marzo de 2025, 12:07 PM",
    fechaCierre: "Ticket en curso",
    Tipo: "Procesos de Negocio",
  },
  {
    resolutor: "Eduardo Antonino Garcia Salazar",
    cliente: "Josué Yahir Pérez Gómez",
    Id: 1729,
    status: "Abierto",
    prioridad: "Baja",
    fechaCreacion: "26 de marzo de 2025, 12:07 PM",
    fechaResolucion: "28 de marzo de 2025, 12:07 PM",
    fechaCierre: "Ticket en curso",
    Tipo: "Procesos de Negocio",
  },
  {
    resolutor: "Eduardo Antonino Garcia Salazar",
    cliente: "Josué Yahir Pérez Gómez",
    Id: 1730,
    status: "Abierto",
    prioridad: "Baja",
    fechaCreacion: "26 de marzo de 2025, 12:07 PM",
    fechaResolucion: "28 de marzo de 2025, 12:07 PM",
    fechaCierre: "Ticket en curso",
    Tipo: "Procesos de Negocio",
  },
];
type SortKey =
  | "resolutor"
  | "cliente"
  | "Id"
  | "status"
  | "prioridad"
  | "fechaCreacion"
  | "fechaResolucion"
  | "fechaCierre"
  | "Tipo";
type SortOrder = "asc" | "desc";

export default function TableBusqueda() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortKey, setSortKey] = useState<SortKey>("resolutor");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isOpenNota,
    openModal: openModalNota,
    closeModal: closeModalNota,
  } = useModal();
  const {
    isOpen: isOpenContactoCliente,
    openModal: openModalContactoCliente,
    closeModal: closeModalContactoCliente,
  } = useModal();

  const filteredAndSortedData = useMemo(() => {
    return tableRowData
      .filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .sort((a, b) => {
        return sortOrder === "asc"
          ? String(a[sortKey]).localeCompare(String(b[sortKey]))
          : String(b[sortKey]).localeCompare(String(a[sortKey]));
      });
  }, [sortKey, sortOrder, searchTerm]);

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
  const countries = [
    { code: "IPEJAL", label: "333-208-0340" },
    { code: "Otro", label: "" },
  ];
  const handlePhoneNumberChange = (phoneNumber: string) => {
    console.log("Updated phone number:", phoneNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentData = filteredAndSortedData.slice(startIndex, endIndex);

  return (
    <>
      <div className="col-span-2">
        <h4 className="pb-4 text-base font-medium text-gray-800 border-b border-gray-200 dark:border-gray-800 dark:text-white/90">
          Busqueda Avanzada
        </h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end min-w-max">
        <div className="flex flex-col">
          <Label htmlFor="firstName">Criterios de Busqueda</Label>
          <PhoneInput
            selectPosition="start"
            countries={countries}
            placeholder="555-000-0000"
            onChange={handlePhoneNumberChange}
          />
        </div>
        <Button size="sm" className="w-full self-end">
          Buscar
        </Button>
      </div>
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
                            onClick={openModal}
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
                      </div>
                    </TableCell>
                    {/* resolutor */}
                    <TableCell className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
                      <div className="flex gap-3">
                        <div>
                          <p className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {item.resolutor}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    {/* cliente */}
                    <TableCell className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
                      <div className="flex gap-3">
                        <div>
                          <p className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {item.cliente}
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
                          item.status === "Hired"
                            ? "success"
                            : item.status === "In Progress"
                            ? "warning"
                            : "error"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    {/* prioridad */}
                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                      <Badge
                        size="sm"
                        color={
                          item.status === "Hired"
                            ? "success"
                            : item.status === "In Progress"
                            ? "warning"
                            : "error"
                        }
                      >
                        {item.prioridad}
                      </Badge>
                    </TableCell>
                    {/* fecha creacion */}
                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      <span> {item.fechaCreacion}</span>
                    </TableCell>
                    {/* Fecha limite de resolucion */}
                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {item.fechaResolucion}
                    </TableCell>
                    {/* Fecha de cierre */}
                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {item.fechaCierre}
                    </TableCell>
                    {/* tipo */}
                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {item.Tipo}
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
        <Invoice />
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
        isOpen={isOpenContactoCliente}
        onClose={closeModalContactoCliente}
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-4">
          <FormularioContacto />
        </div>
      </Modal>
    </>
  );
}
