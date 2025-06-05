"use client";
import React, { useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal/index";
import InvoiceOficio from "@/components/invoice/InvoiceOficio";
import InvoiceCategoria from "@/components/invoice/InvoiceCategoria";
import InvoiceHistoria from "@/components/invoice/InvoiceHistoria";
import { Tooltip } from "@/components/ui/tooltip/Tooltip";
import Image from "next/image";
import { Ticket } from "@/common/interfaces/ticket.interface";
import { getActions } from "@/factories/actionsFactory";
import { useModals } from "@/context/ModalManager";
import { useSession } from "next-auth/react";
interface Open {
  open: boolean;
  handleToggleModalState: (modal: string, boolState: boolean) => void;
  ticket?: Partial<Ticket>;
  status?: string;
}

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

const ModalVer = ({ open, handleToggleModalState, ticket, status }: Open) => {
  const [singleItem, setSingleItem] = useState();
  const { data: session } = useSession();
  const userRole = session?.user?.rol;
  const { toggleModal } = useModals();
  const { isOpen, closeModal, setOpen } = useModal();
  const callbackClose = () => {
    closeModal();
    handleToggleModalState("ver", false);
  };

  useEffect(() => {
    setOpen(open);
  }, [open, toggleModal]);

  const handlers = {
    setSingleItem,
    toggleModal,
  };

  const itemActions = getActions(ticket, handlers, userRole, status);
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={callbackClose}
        isFullscreen
        className="fixed top-0 left-0 flex flex-col justify-between w-full h-screen p-6 overflow-x-hidden overflow-y-auto bg-white dark:bg-gray-900 lg:p-15"
      >
        <div className="flex flex-col h-full gap-6 sm:gap-5 xl:flex-row">
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] xl:w-5/5">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <h3 className="font-medium text-gray-800 text-theme-xl dark:text-white/90">
                {ticket?.Estado?.Estado}
              </h3>

              <h3 className="font-medium text-gray-800 text-theme-xl dark:text-gray-400">
                {`ID : #${ticket?.Id}`}
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
            {ticket?.PendingReason && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                <h3 className="font-medium text-orange-500 text-theme-xl dark:text-white/90">
                  Ticket Pendiente:{" "}
                  <span className="text-base text-gray-800">
                    {ticket?.PendingReason}
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
                    {ticket?.Cliente?.Nombre}
                  </h5>

                  <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                    {ticket?.Cliente?.Dependencia?.Dependencia}
                    <br />
                    {ticket?.Cliente?.Direccion_General?.Direccion_General}
                    <br />
                    {ticket?.Cliente?.direccion_area?.direccion_area}
                  </p>

                  <span className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Contacto:
                  </span>

                  <span className="block text-sm text-gray-500 dark:text-gray-400">
                    {ticket?.Cliente?.Telefono}
                    {ticket?.Cliente?.Extension && (
                      <span className="text-gray-700">
                        {" "}
                        Ext:{ticket?.Cliente.Extension}
                      </span>
                    )}
                    <br />
                    {ticket?.Cliente?.Correo}
                    <br />
                    {ticket?.Cliente?.Ubicacion}
                  </span>
                </div>

                {/* Columna 2: Descripción */}
                <div className="px-4">
                  <span className="block mb-1 text-lg font-medium text-gray-900 dark:text-gray-400">
                    Descripción
                  </span>
                  <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                    {ticket?.Descripcion}
                  </span>
                </div>

                {/* Columna 3: Fechas */}
                <div className="px-4 flex flex-col gap-2">
                  <div className="text-sm text-gray-700 dark:text-gray-400">
                    <strong>Creado Por:</strong>{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      {ticket?.Creado_por?.Nombre}
                    </span>
                  </div>

                  <div className="text-sm text-gray-700 dark:text-gray-400">
                    <strong>Fecha de Creación:</strong>{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      {ticket?.Fecha_hora_creacion}
                    </span>
                  </div>

                  <div className="text-sm text-gray-700 dark:text-gray-400">
                    <strong>Fecha Límite de Resolución:</strong>{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      {ticket?.Fecha_limite_resolucion_SLA}
                    </span>
                  </div>

                  <div className="text-sm text-gray-700 dark:text-gray-400">
                    <strong>Prioridad:</strong>{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      {ticket?.Subcategoria?.Descripcion_prioridad}
                    </span>
                  </div>

                  <div className="text-sm text-gray-700 dark:text-gray-400">
                    <strong>Servicio:</strong>{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      {ticket?.Subcategoria?.Servicio}
                    </span>
                  </div>

                  <div className="text-sm text-gray-700 dark:text-gray-400">
                    <strong>Cerrado Por:</strong>{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      {ticket?.Cerrado_por?.Nombre || ""}
                    </span>
                  </div>

                  <div className="text-sm text-gray-700 dark:text-gray-400">
                    <strong>Fecha de Cierre:</strong>{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      {ticket?.Fecha_hora_cierre || ""}
                    </span>
                  </div>
                </div>
              </div>
              {/* divisor */}
              <div className="h-px w-full bg-gray-200 dark:bg-gray-800 sm:w-[100%]"></div>
              {/* aqui va el moderador y resolutor */}
              <div className="grid grid-cols-1 gap-6 mb-9 mt-4 sm:grid-cols-3 sm:divide-x sm:divide-gray-300 dark:sm:divide-gray-700">
                {/* Columna 1: Moderador */}
                {ticket?.Asignado_a && (
                  <div className="sm:text-left">
                    <span className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-400">
                      Moderador
                    </span>

                    <h5 className="mb-2 text-base font-semibold text-gray-800 dark:text-white/90">
                      {ticket?.Asignado_a[0]?.Nombre}
                    </h5>

                    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                      {ticket?.Asignado_a?.[0]?.Dependencia?.Dependencia || ""}
                      <br />
                      {ticket?.Asignado_a?.[0]?.Direccion_General
                        .Direccion_General || ""}
                      <br />
                      {ticket?.Asignado_a[0]?.Area.map((a) => a.Area).join(
                        ", "
                      )}
                    </p>

                    <span className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Contacto:
                    </span>

                    <span className="block text-sm text-gray-500 dark:text-gray-400">
                      3332080340 <span className="text-gray-700">Ext:</span>1364
                      <br />
                      {ticket?.Asignado_a[0]?.Correo}
                      <br /> {ticket.Asignado_a[0]?.Ubicacion}
                    </span>
                  </div>
                )}

                {/* Columna 2: Resolutor */}
                {ticket?.Reasignado_a && (
                  <div className="sm:text-left">
                    {(ticket?.Reasignado_a ?? []).length > 0 && (
                      <>
                        <span className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-400">
                          Resolutor
                        </span>
                        <h5 className="mb-2 text-base font-semibold text-gray-800 dark:text-white/90">
                          {(ticket?.Reasignado_a ?? [])[0]?.Nombre || ""}
                        </h5>

                        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                          Instituto de Pensiones del Estado de Jalisco
                          <br />
                          Dirección de Informatica
                          <br />
                          {(ticket?.Reasignado_a ?? [])[0]?.Area.map(
                            (a) => a.Area
                          ).join(", ")}
                        </p>

                        <span className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                          Contacto:
                        </span>

                        <span className="block text-sm text-gray-500 dark:text-gray-400">
                          3332080340 <span className="text-gray-700">Ext:</span>
                          1364
                          <br />
                          {(ticket?.Reasignado_a ?? [])[0]?.Correo || ""}
                          <br /> {ticket.Asignado_a?.[0]?.Ubicacion || ""}
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
                      {ticket?.Resuelto_por?.Nombre}
                    </span>
                  </div>

                  <div className="text-sm text-gray-700 dark:text-gray-400">
                    <strong>Fecha de Resolución:</strong>{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      {ticket?.Fecha_hora_resolucion}
                    </span>
                  </div>

                  <div className="text-sm text-gray-700 dark:text-gray-400">
                    <span className="text-gray-800 dark:text-white/90">
                      {(ticket?.Descripcion_cierre ||
                        ticket?.Respuesta_cierre_reasignado) && (
                        <>
                          <div className="flex flex-col gap-6 mb-9 mt-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="sm:text-left">
                              <span className="block mb-1 text-lg font-medium text-gray-900 dark:text-gray-400">
                                Descripcion de Resolución
                              </span>
                              <span className="block mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                {ticket?.Respuesta_cierre_reasignado ||
                                  ticket?.Descripcion_cierre ||
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

              {ticket?.PendingReason && (
                <>
                  <div className="flex flex-col gap-6 mb-9 mt-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="sm:text-left">
                      <span className="block mb-1 text-lg font-medium text-gray-900 dark:text-gray-400">
                        Descripcion pendiente
                      </span>
                      <span className="block mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                        {ticket?.PendingReason || ""}
                      </span>
                    </div>
                  </div>
                </>
              )}
              <div className="h-px w-full bg-gray-200 dark:bg-gray-800 sm:w-[100%]"></div>
              {/* <!-- Invoice Table categoria Start --> */}
              <div className="flex flex-col gap-6 mb-9 mt-4 sm:flex-row sm:items-center sm:justify-between">
                <InvoiceCategoria
                  Subcategoria={ticket?.Subcategoria}
                  Medio={ticket?.Medio}
                />
              </div>
              {/* <!-- Invoice Table categoria End --> */}
              {/* <!-- Invoice Table oficio Start --> */}
              <div className="flex flex-col gap-6 mb-9 mt-4 sm:flex-row sm:items-center sm:justify-between">
                <InvoiceOficio
                  oficio1={ticket?.NumeroRec_Oficio}
                  oficio2={ticket?.Numero_Oficio}
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
                    {`${ticket?.Files?.length} Archivos Adjuntos`}
                  </span>
                </div>

                <div className="flex flex-col items-center gap-3 sm:flex-row">
                  {(ticket?.Files ?? []).length > 0 &&
                    ticket?.Files?.map((f) => {
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
                              <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                                Download
                              </span>
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
                    Historia del ticket
                  </span>
                </div>
                <div className="">
                  <InvoiceHistoria historia={ticket?.Historia_ticket} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalVer;
