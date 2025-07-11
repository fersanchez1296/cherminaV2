"use client";
import { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { AngleDownIcon, AngleUpIcon } from "../../../icons";
import PaginationWithButton from "../../tables/DataTables/TableTwo/PaginationWithButton";
import Badge from "../../ui/badge/Badge";
import { Tooltip } from "@/components/ui/tooltip/Tooltip";
import { Send, SendHorizontal } from "lucide-react";
import { Ticket } from "@/common/interfaces/ticket.interface";
import { SortKey, SortOrder } from "@/types/sort";
import { badgeColors } from "@/common/badgeColors/badgeColors";
import { useLoadingStore } from "@/stores/loadingStore";
import { useNotification } from "@/context/NotificationProvider";
import { useRouter } from "next/navigation";
import { getCorreosPendientes, ReenviarCorreo, ReenviarTodo } from "@/services/correosService";
interface props {
  status: string;
}

export default function FilaCorreos({ status }: props) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortKey, setSortKey] = useState<SortKey>("Id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [tableRowData, setTableRowData] = useState<Array<Ticket>>([]);
  const setLoading = useLoadingStore((state) => state.setLoading);
  //estados relacionados a la info del ticket
  const { showNotification } = useNotification();
  useEffect(() => {
    const fetchCorreos = async () => {
      setLoading(true);
      // const correos = await getCorreosPendientes("PENDIENTES");
      // console.log(correos);
      try {
        const res = await getCorreosPendientes("PENDIENTES");
        setTableRowData(res.data);
      } catch (error) {
        showNotification("Error", "Error al cargar correos", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchCorreos();
  }, [status]);

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

  const handleSave = async (id: string) => {
    setLoading(true);
    try {
      const result = await ReenviarCorreo(id);
      if (result && result.status === 201) {
        showNotification(
          "Éxito",
          result.data?.message || "Operación exitosa",
          "success"
        );
        const res = await getCorreosPendientes("PENDIENTES");
        console.log(res);
        setTableRowData(res.data)
      } else if (result) {
        showNotification(
          "Aviso",
          result.data?.message || "Respuesta inesperada del servidor",
          "warning"
        );
      } else {
        showNotification(
          "Error",
          "No se pudo reenviar el correo.",
          "error"
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

  const reenviartodo = async () => {
    setLoading(true);
    try {
      const result = await ReenviarTodo();
      if (result && result.status === 201) {
        showNotification(
          "Éxito",
          result.data?.message || "Operación exitosa",
          "success"
        );
        const res = await getCorreosPendientes("PENDIENTES");
        console.log(res);
        setTableRowData(res.data)
      } else if (result) {
        showNotification(
          "Aviso",
          result.data?.message || "Respuesta inesperada del servidor",
          "warning"
        );
      } else {
        showNotification(
          "Error",
          "No se pudo reenviar el correo.",
          "error"
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


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentData = filteredAndSortedData.slice(startIndex, endIndex);
  return (
    <>
      <div className="overflow-hidden rounded-xl bg-white dark:bg-white/[0.03]">
        <div className="flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between mt=25">
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
            <span className="text-gray-500 dark:text-gray-400"> resultados </span>
            <Tooltip content={"Reenviar todos"} theme="dark" position="right">
              <button
                onClick={() => {
                  reenviartodo()
                }}
                className="text-gray-500 hover:text-gray-800"
              >
                <SendHorizontal />
              </button>
            </Tooltip>
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
                        Reenviar correo
                      </p>
                    </div>
                  </TableCell>
                  {[
                    { key: "Id", label: "Id" },
                    { key: "motivo", label: "Motivo" },
                    { key: "details", label: "Detalles" },
                    { key: "Destinatario", label: "Destinatario" },
                    { key: "emails_extra", label: "Extras" },
                    { key: "Fecha_hora_agregado", label: "Fecha" },
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
                            className={`text-gray-300 dark:text-gray-700 ${sortKey === key && sortOrder === "asc"
                              ? "text-brand-500"
                              : ""
                              }`}
                          />
                          <AngleDownIcon
                            className={`text-gray-300 dark:text-gray-700 ${sortKey === key && sortOrder === "desc"
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
                          <Tooltip content={"Reenviar"} theme="dark">
                            <button
                              onClick={() => {
                                handleSave(item._id)
                              }}
                              className="text-gray-500 hover:text-gray-800"
                            >
                              <Send />
                              {/* </Link> */}
                            </button>
                          </Tooltip>
                        </div>
                      </TableCell>
                      {/* ID */}
                      <TableCell className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
                        <div className="flex gap-3">
                          <div>
                            <p className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                              {item.Id}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      {/* MOTIVO */}
                      <TableCell className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
                        <div className="flex gap-3">
                          <div>
                            <p className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                              {item?.motivo}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      {/* DETAILS */}
                      <TableCell
                        title={item.details} // TEXTO COMPLETO AQUÍ
                        className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]"
                      >
                        {/* SOLO MUESTRA RESUMEN */}
                        {item.details.length > 60 ? `${item.details.slice(0, 60)}...` : item.details}
                      </TableCell>
                      {/* DESTINATARIO */}
                      <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                        <Badge
                          size="sm"
                          color={
                            badgeColors[item?.destinatario ?? ""] ?? "default"
                          }
                        >
                          {item.destinatario ?? "Sin estado"}
                        </Badge>
                      </TableCell>
                      {/* Extras */}
                      <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                        <Badge
                          size="sm"
                          color={
                            badgeColors[
                            (item?.emails_extra || []).join(", ")
                            ] ?? "default"
                          }
                        >
                          {item?.emails_extra?.length
                            ? item.emails_extra.join(", ")
                            : "Sin correos extra"}
                        </Badge>
                      </TableCell>
                      {/* fecha creacion */}
                      <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap">
                        <span> {item.Fecha_hora_agregado_formateada}</span>
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
