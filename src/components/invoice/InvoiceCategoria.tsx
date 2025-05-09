import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
interface data {
  Medio?: { Medio: string; _id: string };
  Subcategoria?: {
    Servicio: string;
    Categoría: string;
    Subcategoria: string;
    Tipo: string;
    Prioridad: number;
    Equipo: { _id: string; Area: string };
    Descripcion_prioridad: string;
  };
}
export default function InvoiceTable({ Subcategoria, Medio }: data) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] w-full">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] ">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-400"
              >
                Area ticket
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-400"
              >
                Prioridad
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-400"
              >
                Medio de contacto
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-400"
              >
                Tipo de incidencia
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-400"
              >
                Area
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-400"
              >
                Servicio
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-400"
              >
                Categoria
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-400"
              >
                Subcategoria
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            <TableRow>
              <TableCell className="px-5 py-3.5 text-left dark:border-white/[0.05] text-gray-500 text-theme-sm dark:text-gray-400">
                Desarrollo
              </TableCell>
              <TableCell className="px-5 py-3.5 text-left dark:border-white/[0.05] text-gray-500 text-theme-sm dark:text-gray-400">
                {Subcategoria?.Descripcion_prioridad}
              </TableCell>
              <TableCell className="px-5 py-3.5 text-left dark:border-white/[0.05] text-gray-500 text-theme-sm dark:text-gray-400">
                {Medio?.Medio}
              </TableCell>
              <TableCell className="px-5 py-3.5 text-left dark:border-white/[0.05] text-gray-500 text-theme-sm dark:text-gray-400">
                {Subcategoria?.Tipo}
              </TableCell>
              <TableCell className="px-5 py-3.5 text-left dark:border-white/[0.05] text-gray-500 text-theme-sm dark:text-gray-400">
                {Subcategoria?.Equipo?.Area}
              </TableCell>
              <TableCell className="px-5 py-3.5 text-left dark:border-white/[0.05] text-gray-500 text-theme-sm dark:text-gray-400">
                {Subcategoria?.Servicio}
              </TableCell>
              <TableCell className="px-5 py-3.5 text-left dark:border-white/[0.05] text-gray-500 text-theme-sm dark:text-gray-400">
                {Subcategoria?.Categoría}
              </TableCell>
              <TableCell className="px-5 py-3.5 text-left dark:border-white/[0.05] text-gray-500 text-theme-sm dark:text-gray-400">
                {Subcategoria?.Subcategoria}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
