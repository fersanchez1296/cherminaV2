"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../ui/table";
import { AngleDownIcon, AngleUpIcon } from "../../../../icons";
import PaginationWithButton from "./PaginationWithButton";
import Badge from "../../../ui/badge/Badge";
import { Tooltip } from "@/components/ui/tooltip/Tooltip";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import Select from "react-select";
import Input from "@/components/form/input/InputField";
import { busquedaAvanzada } from "@/services/dashboard";
import { Ticket } from "@/common/interfaces/ticket.interface";
import { EyeIcon } from "lucide-react";
import { badgeColors } from "@/common/badgeColors/badgeColors";
import { useNotification } from "@/context/NotificationProvider";
import { useLoadingStore } from "@/stores/loadingStore";
import { useSession } from "next-auth/react";
import { getAreas } from "@/services/ticketService";
import { AxiosError } from "axios";
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

interface Option {
  value: string;
  label: string;
}

const customStyles = {
  menu: (provided: any) => ({
    ...provided,
    zIndex: 999,
  }),
};

export default function TableBusqueda() {
  const { data: session } = useSession();
  const userRole = session?.user?.rol;
  const userCelulas = session?.user?.celulas;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortKey, setSortKey] = useState<SortKey>("resolutor");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [tableRowData, setTableRowData] = useState<Array<Ticket>>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectsData, setSelectsData] = useState([]);
  const { showNotification } = useNotification();
  const setLoading = useLoadingStore((state) => state.setLoading);
  const [criterio, setCriterio] = useState({
    value: "general",
    label: "General",
  });
  const [termino, setTermino] = useState("");

  useEffect(() => {
    async function getDataSelects() {
      setLoading(true);
      try {
        const result = await getAreas();
        if (result.data && result?.status === 200) {
          setSelectsData(result?.data?.areas);
        }
      } catch {
      } finally {
        setLoading(false);
      }
    }

    getDataSelects();
  }, []);

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

  const handleSearch = async () => {
    setLoading(true);
    try {
      const result = await busquedaAvanzada(criterio.value, termino);
      if (result.status === 200 && result.data) {
        setTableRowData(result.data);
      }
    } catch (error) {
      let message = "Ocurrió un error inesperado.";
      if (error instanceof AxiosError && error.response?.data?.desc) {
        message = error.response.data.desc;
      }
      showNotification("Error", message, "error");
      setTableRowData([]);
    } finally {
      setLoading(false);
      setTermino("");
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentData = filteredAndSortedData.slice(startIndex, endIndex);

  const baseOptions = [
    { value: "general", label: "General" },
    { value: "id", label: "Id" },
    { value: "oficio", label: "Número de oficio" },
    { value: "nccliente", label: "Nombre/correo cliente" },
    { value: "ncresolutor", label: "Nombre/correo moderador/resolutor" },
  ];

  const celulas = [
    { value: "RRHH", label: "RRHH" },
    { value: "SIC", label: "SIC" },
    { value: "SIIF", label: "SIIF" },
    { value: "WEB", label: "WEB" },
    { value: "Servicios Médicos", label: "Servicios Médicos" },
    {
      value: "Análisis de seguridad de sistemas y bases de datos",
      label: "Análisis de seguridad de sistemas y bases de datos",
    },
    { value: "Saturno/IPETURNO", label: "Saturno/IPETURNO" },
    { value: "Chermina/SOS desk", label: "Chermina/SOS desk" },
  ];

  const options = useMemo(() => {
    const copy = [...baseOptions];
    if (userRole === "Administrador" || userRole === "Root") {
      const exists = copy.some((opt) => opt.value === "area");
      if (!exists) copy.push({ value: "area", label: "Área" });
    }
    if (
      (userRole === "Moderador" || userRole === "PM") &&
      userCelulas.length > 0
    ) {
      const exists = copy.some((opt) => opt.value === "celula");
      if (!exists) copy.push({ value: "celula", label: "Célula" });
    }
    return copy;
  }, [userRole]);

  console.log("esta es la sesion", session);

  const renderCriterioInput = () => {
    switch (criterio.value) {
      case "area":
        return (
          <div className="col-span-1">
            <Label htmlFor="area">Selecciona una opción</Label>
            <Select<Option, false>
              placeholder="Selecciona una opción"
              options={selectsData}
              onChange={(selected) => setTermino(selected?.value || "")}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
        );

      case "celula":
        return (
          <div className="col-span-1">
            <Label htmlFor="area">Selecciona una opción</Label>
            <Select<Option, false>
              placeholder="Selecciona una opción"
              options={celulas}
              onChange={(selected) => setTermino(selected?.value || "")}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
        );

      default:
        return (
          <div className="flex flex-col">
            <Label htmlFor="termino">Término de Búsqueda</Label>
            <Input
              placeholder="Ingresa el término de búsqueda"
              onChange={(e) => setTermino(e.target.value)}
              value={termino}
            />
          </div>
        );
    }
  };

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
          <Select
            placeholder="Selecciona una opción"
            options={options}
            styles={customStyles}
            onChange={(selectedOption) => {
              setCriterio(selectedOption);
            }}
            value={criterio}
          />
        </div>
        {renderCriterioInput()}
        <Button size="sm" className="w-full self-end" onClick={handleSearch}>
          Buscar
        </Button>
      </div>
      <div className="overflow-hidden rounded-xl bg-white dark:bg-white/[0.03]">
        <div className="flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="text-gray-500 dark:text-gray-400"> Mostrar </span>
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
            <span className="text-gray-500 dark:text-gray-400">
              {" "}
              resultados{" "}
            </span>
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
              placeholder="Filtrar..."
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
                {currentData.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      {/* iconos */}
                      <TableCell>
                        <div className="flex justify-center text-blue-600 underline">
                          <Tooltip content={"Ver Ticket"} theme="dark">
                            <a
                              href={`/busqueda/${item.Id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-500 hover:text-gray-800"
                            >
                              <EyeIcon />
                            </a>
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
                            badgeColors[item?.Estado?.Estado ?? ""] ?? "default"
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
                            badgeColors[
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
                  );
                })}
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
                Mostrando {startIndex + 1} a {endIndex} de {totalItems}{" "}
                resultados
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
