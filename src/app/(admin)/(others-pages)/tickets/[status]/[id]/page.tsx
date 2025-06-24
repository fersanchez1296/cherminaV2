// app/tickets/[status]/@modal/[id]/page.tsx
"use client";
import { useNotification } from "@/context/NotificationProvider";
import { getTicket } from "@/services/ticketService";
import { useLoadingStore } from "@/stores/loadingStore";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import InvoiceOficio from "@/components/invoice/InvoiceOficio";
import InvoiceCategoria from "@/components/invoice/InvoiceCategoria";
import InvoiceHistoria from "@/components/invoice/InvoiceHistoria";
import { Ticket } from "@/common/interfaces/ticket.interface";
import { useModals } from "@/context/ModalManager";
import { useSession } from "next-auth/react";
import { getActions } from "@/factories/actionsFactory";
import { Tooltip } from "@/components/ui/tooltip/Tooltip";
import Image from "next/image";
import AllModals from "@/components/example/ModalExample/ModalProvider";
import { Button } from "@/components/ui/button";
import { downloadFile } from "@/services/files";
export default function TicketModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [singleItem, setSingleItem] = useState();
  const [status, setStatus] = useState();
  const { data: session } = useSession();
  const { id } = use(params);
  const userRole = session?.user?.rol;
  const { toggleModal } = useModals();
  const router = useRouter();
  const setLoading = useLoadingStore((state) => state.setLoading);
  const { showNotification } = useNotification();
  const [data, setData] = useState<Ticket>();
  const handleClose = () => {
    router.back();
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.back();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [router]);

  useEffect(() => {
    const fetchTicket = async () => {
      setLoading(true);
      try {
        const res = await getTicket(id);
        setData(res.data[0]);
        setStatus(res.data[0].Estado.Estado);
      } catch (error) {
        showNotification("Error", "Error al cargar tickets", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  const getFileExtension = (filename: string) => {
    return filename.split(".").pop()?.toLowerCase() || "";
  };

  const iconMap: { [key: string]: string } = {
    pdf: "/images/task/pdf.svg",
    doc: "/images/task/doc.svg",
    docx: "/images/task/docx.svg",
    xls: "/images/task/xls.svg",
    xlsx: "/images/task/xlsx.svg",
    jpg: "/images/task/jpg.svg",
    jpeg: "/images/task/jpg.svg",
    png: "/images/task/png.svg",
    gif: "/images/task/gif.svg",
    txt: "/images/task/txt.svg",
    zip: "/images/task/zip.svg",
    default: "/images/task/default.svg",
  };

  const handlers = {
    setSingleItem,
    toggleModal,
  };

  const itemActions = getActions(data, handlers, userRole, status);

  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-50 flex-col gap-6 sm:gap-5 xl:flex-row  z-8888 w-full h-full overflow-y-auto">
      <div className="bg-white p-9.5 rounded shadow-lg w-full relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="absolute right-5 top-5 z-999 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-100 text-red-500 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:right-6 sm:top-6 sm:h-11 sm:w-11"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.04289 16.5413C5.65237 16.9318 5.65237 17.565 6.04289 17.9555C6.43342 18.346 7.06658 18.346 7.45711 17.9555L11.9987 13.4139L16.5408 17.956C16.9313 18.3466 17.5645 18.3466 17.955 17.956C18.3455 17.5655 18.3455 16.9323 17.955 16.5418L13.4129 11.9997L17.955 7.4576C18.3455 7.06707 18.3455 6.43391 17.955 6.04338C17.5645 5.65286 16.9313 5.65286 16.5408 6.04338L11.9987 10.5855L7.45711 6.0439C7.06658 5.65338 6.43342 5.65338 6.04289 6.0439C5.65237 6.43442 5.65237 7.06759 6.04289 7.45811L10.5845 11.9997L6.04289 16.5413Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <div className="flex flex-col h-full gap-6 sm:gap-5 xl:flex-row">
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] xl:w-5/5">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <h3 className="font-medium text-gray-800 text-theme-xl dark:text-white/90">
                {data?.Estado?.Estado}
              </h3>

              <h3 className="font-medium text-gray-800 text-theme-xl dark:text-gray-400">
                {`ID : #${data?.Id}`}
              </h3>
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <h3 className="font-medium text-gray-800 text-theme-xl dark:text-white/90">
                Acciones
              </h3>

              <div className="flex items-center gap-4">
                <div className="flex gap-2 ml-4 mr-2.5">
                  {itemActions.map((action, i) => (
                    <Tooltip key={i} content={action.tooltip} theme="dark">
                      <button
                        onClick={action.onClick}
                        className="text-gray-500 hover:text-gray-800"
                      >
                        {action.icon()}
                      </button>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
            {data?.PendingReason && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                <h3 className="font-medium text-orange-500 text-theme-xl dark:text-white/90">
                  data Pendiente:{" "}
                  <span className="text-base text-gray-800">
                    {data?.PendingReason}
                  </span>
                </h3>
              </div>
            )}

            <div className="p-5 xl:p-8">
              {/* cliente */}
              <div className="grid grid-cols-1 gap-6 mb-9 mt-4 sm:grid-cols-3 sm:divide-x sm:divide-gray-300 dark:sm:divide-gray-700">
                {/* Columna 1: Cliente */}
                <div className="px-4">
                  <span className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-400">
                    Cliente
                  </span>

                  <h5 className="mb-2 text-base font-semibold text-gray-800 dark:text-white/90">
                    {data?.Cliente?.Nombre}
                  </h5>

                  <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                    {data?.Cliente?.Dependencia?.Dependencia}
                    <br />
                    {data?.Cliente?.Direccion_General?.Direccion_General}
                    <br />
                    {data?.Cliente?.direccion_area?.direccion_area}
                  </p>

                  <span className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Contacto:
                  </span>

                  <span className="block text-sm text-gray-500 dark:text-gray-400">
                    {data?.Cliente?.Telefono}
                    {data?.Cliente?.Extension && (
                      <span className="text-gray-700">
                        {" "}
                        Ext:{data?.Cliente.Extension}
                      </span>
                    )}
                    <br />
                    {data?.Cliente?.Correo}
                    <br />
                    {data?.Cliente?.Ubicacion}
                  </span>
                </div>

                {/* Columna 2: Descripción */}
                <div className="px-4">
                  <span className="block mb-1 text-lg font-medium text-gray-900 dark:text-gray-400">
                    Descripción
                  </span>
                  <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                    {data?.Descripcion}
                  </span>
                </div>

                {/* Columna 3: Fechas */}
                <div className="px-4 flex flex-col gap-2">
                  <div className="text-sm text-gray-700 dark:text-gray-400">
                    <strong>Creado Por:</strong>{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      {data?.Creado_por?.Nombre}
                    </span>
                  </div>

                  <div className="text-sm text-gray-700 dark:text-gray-400">
                    <strong>Fecha de Creación:</strong>{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      {data?.Fecha_hora_creacion}
                    </span>
                  </div>

                  <div className="text-sm text-gray-700 dark:text-gray-400">
                    <strong>Fecha Límite de Resolución:</strong>{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      {data?.Fecha_limite_resolucion_SLA}
                    </span>
                  </div>

                  <div className="text-sm text-gray-700 dark:text-gray-400">
                    <strong>Prioridad:</strong>{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      {data?.Subcategoria?.Descripcion_prioridad}
                    </span>
                  </div>

                  <div className="text-sm text-gray-700 dark:text-gray-400">
                    <strong>Servicio:</strong>{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      {data?.Subcategoria?.Servicio}
                    </span>
                  </div>

                  <div className="text-sm text-gray-700 dark:text-gray-400">
                    <strong>Cerrado Por:</strong>{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      {data?.Cerrado_por?.Nombre || ""}
                    </span>
                  </div>

                  <div className="text-sm text-gray-700 dark:text-gray-400">
                    <strong>Fecha de Cierre:</strong>{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      {data?.Fecha_hora_cierre || ""}
                    </span>
                  </div>
                </div>
              </div>
              {/* divisor */}
              <div className="h-px w-full bg-gray-200 dark:bg-gray-800 sm:w-[100%]"></div>
              {/* aqui va el moderador y resolutor */}
              <div className="grid grid-cols-1 gap-6 mb-9 mt-4 sm:grid-cols-3 sm:divide-x sm:divide-gray-300 dark:sm:divide-gray-700">
                {/* Columna 1: Moderador */}
                {data?.Asignado_a && (
                  <div className="sm:text-left">
                    <span className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-400">
                      Moderador
                    </span>

                    <h5 className="mb-2 text-base font-semibold text-gray-800 dark:text-white/90">
                      {data?.Asignado_a[0]?.Nombre}
                    </h5>

                    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                      {data?.Asignado_a?.[0]?.Dependencia?.Dependencia || ""}
                      <br />
                      {data?.Asignado_a?.[0]?.Direccion_General
                        .Direccion_General || ""}
                      <br />
                      {data?.Asignado_a[0]?.Area.map((a) => a.Area).join(", ")}
                    </p>

                    <span className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Contacto:
                    </span>

                    <span className="block text-sm text-gray-500 dark:text-gray-400">
                      3332080340 <span className="text-gray-700">Ext:</span>
                      1364
                      <br />
                      {data?.Asignado_a[0]?.Correo}
                      <br /> {data.Asignado_a[0]?.Ubicacion}
                    </span>
                  </div>
                )}

                {/* Columna 2: Resolutor */}
                {data?.Reasignado_a && (
                  <div className="sm:text-left">
                    {(data?.Reasignado_a ?? []).length > 0 && (
                      <>
                        <span className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-400">
                          Resolutor
                        </span>
                        <h5 className="mb-2 text-base font-semibold text-gray-800 dark:text-white/90">
                          {(data?.Reasignado_a ?? [])[0]?.Nombre || ""}
                        </h5>

                        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                          {data?.Asignado_a?.[0]?.Dependencia?.Dependencia ||
                            ""}
                          <br />
                          {data?.Asignado_a?.[0]?.Direccion_General
                            .Direccion_General || ""}
                          <br />
                          {data?.Asignado_a[0]?.Area.map((a) => a.Area).join(
                            ", "
                          )}
                        </p>

                        <span className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                          Contacto:
                        </span>

                        <span className="block text-sm text-gray-500 dark:text-gray-400">
                          3332080340 <span className="text-gray-700">Ext:</span>
                          1364
                          <br />
                          {(data?.Reasignado_a ?? [])[0]?.Correo || ""}
                          <br /> {data.Asignado_a?.[0]?.Ubicacion || ""}
                        </span>
                      </>
                    )}
                  </div>
                )}

                {/* Columna 3: Descripcion de cierre */}
                <div className="px-4 flex flex-col gap-2">
                  <div className="text-sm text-gray-700 dark:text-gray-400">
                    <strong>Resuelto Por:</strong>{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      {data?.Resuelto_por?.Nombre}
                    </span>
                  </div>

                  <div className="text-sm text-gray-700 dark:text-gray-400">
                    <strong>Fecha de Resolución:</strong>{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      {data?.Fecha_hora_resolucion}
                    </span>
                  </div>

                  <div className="text-sm text-gray-700 dark:text-gray-400">
                    <span className="text-gray-800 dark:text-white/90">
                      {(data?.Descripcion_cierre ||
                        data?.Respuesta_cierre_reasignado) && (
                        <>
                          <div className="flex flex-col gap-6 mb-9 mt-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="sm:text-left">
                              <span className="block mb-1 text-lg font-medium text-gray-900 dark:text-gray-400">
                                Descripcion de Resolución
                              </span>
                              <span className="block mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                {data?.Respuesta_cierre_reasignado ||
                                  data?.Descripcion_cierre ||
                                  ""}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 dark:bg-gray-800 sm:w-[100%]"></div>

              {data?.PendingReason && (
                <>
                  <div className="flex flex-col gap-6 mb-9 mt-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="sm:text-left">
                      <span className="block mb-1 text-lg font-medium text-gray-900 dark:text-gray-400">
                        Descripcion pendiente
                      </span>
                      <span className="block mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                        {data?.PendingReason || ""}
                      </span>
                    </div>
                  </div>
                </>
              )}
              <div className="h-px w-full bg-gray-200 dark:bg-gray-800 sm:w-[100%]"></div>
              {/* <!-- Invoice Table categoria Start --> */}
              <div className="flex flex-col gap-6 mb-9 mt-4 sm:flex-row sm:items-center sm:justify-between">
                <InvoiceCategoria
                  Subcategoria={data?.Subcategoria}
                  Medio={data?.Medio}
                />
              </div>
              {/* <!-- Invoice Table categoria End --> */}
              {/* <!-- Invoice Table oficio Start --> */}
              <div className="flex flex-col gap-6 mb-9 mt-4 sm:flex-row sm:items-center sm:justify-between">
                <InvoiceOficio
                  oficio1={data?.NumeroRec_Oficio}
                  oficio2={data?.Numero_Oficio}
                />
              </div>
              {/* <!-- Invoice Table oficio End --> */}
              <div className="h-px w-full bg-gray-200 dark:bg-gray-800 sm:w-[100%]"></div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900 sm:p-4">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-gray-500 dark:text-gray-400">
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
                        d="M10.6685 12.035C10.6685 12.044 10.6686 12.0529 10.6689 12.0617V13.4533C10.6689 13.8224 10.3697 14.1216 10.0006 14.1216C9.63155 14.1216 9.33235 13.8224 9.33235 13.4533V5.12807C9.33235 4.71385 8.99657 4.37807 8.58235 4.37807C8.16814 4.37807 7.83235 4.71385 7.83235 5.12807V13.4533C7.83235 14.6508 8.80313 15.6216 10.0006 15.6216C11.1981 15.6216 12.1689 14.6508 12.1689 13.4533V5.12807C12.1689 5.11803 12.1687 5.10804 12.1683 5.09811C12.1522 3.1311 10.5527 1.5415 8.58189 1.5415C6.60108 1.5415 4.99532 3.14727 4.99532 5.12807L4.99532 12.035C4.99532 12.0414 4.9954 12.0477 4.99556 12.0539V13.4533C4.99556 16.2174 7.2363 18.4582 10.0004 18.4582C12.7645 18.4582 15.0053 16.2174 15.0053 13.4533V7.96463C15.0053 7.55042 14.6695 7.21463 14.2553 7.21463C13.841 7.21463 13.5053 7.55042 13.5053 7.96463V13.4533C13.5053 15.389 11.9361 16.9582 10.0004 16.9582C8.06473 16.9582 6.49556 15.389 6.49556 13.4533V7.96463C6.49556 7.95832 6.49548 7.95202 6.49532 7.94574L6.49532 5.12807C6.49532 3.97569 7.42951 3.0415 8.58189 3.0415C9.73427 3.0415 10.6685 3.97569 10.6685 5.12807L10.6685 12.035Z"
                        fill=""
                      />
                    </svg>
                  </span>

                  <span className="text-sm text-gray-700 dark:text-gray-400">
                    {`${data?.Files?.length} Archivos Adjuntos`}
                  </span>
                </div>

                <div className="flex flex-col items-center gap-3 sm:flex-row">
                  {(data?.Files ?? []).length > 0 &&
                    data?.Files?.map((f) => {
                      const ext = getFileExtension(f.name);
                      const iconSrc = iconMap[ext] || iconMap["default"];
                      return (
                        <div
                          key={f.name}
                          className="relative hover:border-gray-300 dark:hover:border-white/[0.05] flex w-full cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-white py-2.5 pl-3 pr-5 dark:border-gray-800 dark:bg-white/5 sm:w-auto"
                        >
                          <div className="w-full h-10 max-w-10">
                            <Image
                              src={iconSrc}
                              width={40}
                              height={40}
                              className="w-full"
                              alt="icon"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                              {f.name}
                            </p>
                            <span className="flex items-center gap-1.5">
                              <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                                {ext.toUpperCase()}
                              </span>
                              <span className="inline-block w-1 h-1 bg-gray-400 rounded-full"></span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => downloadFile(f.name)}
                                className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                              >
                                <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                                  Download
                                </span>
                              </Button>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="flex flex-col gap-6 mb-9 mt-4 sm:flex-col sm:items-center sm:justify-between">
                <div className="sm:text-left">
                  <span className="block mb-1 text-lg font-medium text-gray-900 dark:text-gray-400">
                    Historia del Ticket
                  </span>
                </div>
                <div className="">
                  <InvoiceHistoria historia={data?.Historia_ticket} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AllModals ticket={data} status={status} />
    </div>
  );
}
