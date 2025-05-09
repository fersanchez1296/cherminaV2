import React from "react";
import InvoiceFechas from "./InvoiceFechas";
import InvoiceUsuarios from "./InvoiceUsuarios";
import InvoiceOficio from "./InvoiceOficio";
import InvoiceCategoria from "./InvoiceCategoria";
import InvoiceHistoria from "./InvoiceHistoria";
import { EnvelopeIcon, CheckLineIcon, DocumentPlusIcon } from "@/icons";
import { Tooltip } from "@/components/ui/tooltip/Tooltip";
import Image from "next/image";

interface singleItem {
  singleItem?: {
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
  };
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

export default function Invoice({ singleItem }: singleItem) {
  console.log(singleItem);
  return (
    <div className="flex flex-col h-full gap-6 sm:gap-5 xl:flex-row">
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] xl:w-5/5">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="font-medium text-gray-800 text-theme-xl dark:text-white/90">
            {singleItem?.Estado?.Estado}
          </h3>

          <h3 className="font-medium text-gray-800 text-theme-xl dark:text-gray-400">
            {`ID : #${singleItem?.Id}`}
          </h3>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="font-medium text-gray-800 text-theme-xl dark:text-white/90">
            Acciones
          </h3>

          <div className="flex items-center gap-4">
            <Tooltip content="Agregar nota" position="top" theme="dark">
              <button className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
                <DocumentPlusIcon />
              </button>
            </Tooltip>
            <Tooltip content="Resolver" position="top" theme="dark">
              <button className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
                <CheckLineIcon />
              </button>
            </Tooltip>
            <Tooltip content="Contactar Cliente" position="top" theme="dark">
              <button className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
                <EnvelopeIcon />
              </button>
            </Tooltip>
          </div>
        </div>

        <div className="p-5 xl:p-8">
          <div className="flex flex-col gap-6 mb-9 sm:flex-row sm:items-center sm:justify-between">
            <div className="sm:text-left">
              <span className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-400">
                Cliente
              </span>

              <h5 className="mb-2 text-base font-semibold text-gray-800 dark:text-white/90">
                {singleItem?.Cliente?.Nombre}
              </h5>

              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                {singleItem?.Cliente?.Dependencia?.Dependencia}
                <br />
                {singleItem?.Cliente?.Direccion_General?.Direccion_General}
                <br />
                {singleItem?.Cliente?.direccion_area?.direccion_area}
              </p>

              <span className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Contacto:
              </span>

              <span className="block text-sm text-gray-500 dark:text-gray-400">
                {singleItem?.Cliente?.Telefono}
                {singleItem?.Cliente.Extension && (
                  <span className="text-gray-700">
                    {" "}
                    Ext:{singleItem?.Cliente.Extension}
                  </span>
                )}
                <br />
                {singleItem?.Cliente?.Correo}
                <br /> {singleItem?.Cliente?.Ubicacion}
              </span>
            </div>

            <div className="h-px w-full bg-gray-200 dark:bg-gray-800 sm:h-[250px] sm:w-px"></div>

            <div className="sm:text-left">
              <span className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-400">
                Moderador
              </span>

              <h5 className="mb-2 text-base font-semibold text-gray-800 dark:text-white/90">
                {singleItem?.Asignado_a[0]?.Nombre}
              </h5>

              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                Instituto de Pensiones del Estado de Jalisco
                <br />
                Dirección de Informatica
                <br />
                {singleItem?.Asignado_a[0]?.Area.map((a) => a.Area).join(", ")}
              </p>

              <span className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Contacto:
              </span>

              <span className="block text-sm text-gray-500 dark:text-gray-400">
                3332080340 <span className="text-gray-700">Ext:</span>1364
                <br />
                {singleItem?.Asignado_a[0]?.Correo}
                <br /> Piso 3- Unidad de Estudios Económicos, Actuariales y
                Presupuesto
              </span>
            </div>
            <div className="h-px w-full bg-gray-200 dark:bg-gray-800 sm:h-[250px] sm:w-px"></div>
            <div className="sm:text-left">
              {(singleItem?.Reasignado_a ?? []).length > 0 && (
                <>
                  <span className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-400">
                    Resolutor
                  </span>
                  <h5 className="mb-2 text-base font-semibold text-gray-800 dark:text-white/90">
                    {(singleItem?.Reasignado_a ?? [])[0]?.Nombre || ""}
                  </h5>

                  <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                    Instituto de Pensiones del Estado de Jalisco
                    <br />
                    Dirección de Informatica
                    <br />
                    {(singleItem?.Reasignado_a ?? [])[0]?.Area.map(
                      (a) => a.Area
                    ).join(", ")}
                  </p>

                  <span className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Contacto:
                  </span>

                  <span className="block text-sm text-gray-500 dark:text-gray-400">
                    3332080340 <span className="text-gray-700">Ext:</span>1364
                    <br />
                    {(singleItem?.Reasignado_a ?? [])[0]?.Correo || ""}
                    <br /> Piso 3- Unidad de Estudios Económicos, Actuariales y
                    Presupuesto
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="h-px w-full bg-gray-200 dark:bg-gray-800 sm:w-[100%]"></div>
          <div className="flex flex-col gap-6 mb-9 mt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="sm:text-left">
              <span className="block mb-1 text-lg font-medium text-gray-900 dark:text-gray-400">
                Descripcion
              </span>
              <span className="block mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                {singleItem?.Descripcion}
              </span>
            </div>
          </div>
          {singleItem?.Descripcion_cierre && (
            <>
              <div className="flex flex-col gap-6 mb-9 mt-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="sm:text-left">
                  <span className="block mb-1 text-lg font-medium text-gray-900 dark:text-gray-400">
                    Descripcion de cierre
                  </span>
                  <span className="block mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {singleItem?.Descripcion_cierre || ""}
                  </span>
                </div>
              </div>
            </>
          )}

          {singleItem?.PendingReason && (
            <>
              <div className="flex flex-col gap-6 mb-9 mt-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="sm:text-left">
                  <span className="block mb-1 text-lg font-medium text-gray-900 dark:text-gray-400">
                    Descripcion pendiente
                  </span>
                  <span className="block mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {singleItem?.PendingReason || ""}
                  </span>
                </div>
              </div>
            </>
          )}
          <div className="h-px w-full bg-gray-200 dark:bg-gray-800 sm:w-[100%]"></div>
          {/* <!-- Invoice Table Fechas Start --> */}
          <div className="flex flex-col gap-6 mb-9 mt-4 sm:flex-row sm:items-center sm:justify-between">
            <InvoiceFechas
              fecha1={singleItem?.Fecha_hora_creacion}
              fecha2={singleItem?.Fecha_limite_resolucion_SLA}
              fecha3={singleItem?.Fecha_hora_resolucion}
              fecha4={singleItem?.Fecha_hora_cierre}
            />
          </div>
          {/* <!-- Invoice Table Fechas End --> */}
          {/* <!-- Invoice Table categoria Start --> */}
          <div className="flex flex-col gap-6 mb-9 mt-4 sm:flex-row sm:items-center sm:justify-between">
            <InvoiceCategoria
              Subcategoria={singleItem?.Subcategoria}
              Medio={singleItem?.Medio}
            />
          </div>
          {/* <!-- Invoice Table categoria End --> */}
          {/* <!-- Invoice Table Usuarios Start --> */}
          <div className="flex flex-col gap-6 mb-9 mt-4 sm:flex-row sm:items-center sm:justify-between">
            <InvoiceUsuarios
              usuario1={singleItem?.Creado_por?.Nombre}
              usuario2={singleItem?.Resuelto_por?.Nombre}
              usuario3={singleItem?.Cerrado_por?.Nombre}
            />
          </div>
          {/* <!-- Invoice Table Usuarios End --> */}
          {/* <!-- Invoice Table oficio Start --> */}
          <div className="flex flex-col gap-6 mb-9 mt-4 sm:flex-row sm:items-center sm:justify-between">
            <InvoiceOficio
              oficio1={singleItem?.NumeroRec_Oficio}
              oficio2={singleItem?.Numero_Oficio}
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
                {`${singleItem?.Files.length} Archivos Adjuntos`}
              </span>
            </div>

            <div className="flex flex-col items-center gap-3 sm:flex-row">
              {(singleItem?.Files ?? []).length > 0 &&
                singleItem?.Files?.map((f) => {
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
              <InvoiceHistoria historia={singleItem?.Historia_ticket} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
