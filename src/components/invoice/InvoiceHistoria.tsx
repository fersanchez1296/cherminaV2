import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface data {
  historia?: Array<{
    _id: string;
    Fecha: string;
    Mensaje: string;
    Titulo: string;
    Nombre: { Nombre: string };
    stopper: boolean;
  }>;
}

export default function InvoiceTable({ historia }: data) {
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
                Autor
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-400"
              >
                Titulo
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-400"
              >
                Fecha de entrada
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-400"
              >
                Descripcion
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {(historia ?? []).length > 0 &&
              historia?.map((h, i) => (
                <TableRow key={h._id || i}>
                  <TableCell className="px-5 py-3.5 text-left dark:border-white/[0.05] text-gray-500 text-theme-sm dark:text-gray-400">
                    {h.Nombre.Nombre}
                  </TableCell>
                  <TableCell className="px-5 py-3.5 text-left dark:border-white/[0.05] text-gray-500 text-theme-sm dark:text-gray-400">
                    {h.Titulo}
                  </TableCell>
                  <TableCell className="px-5 py-3.5 text-left dark:border-white/[0.05] text-gray-500 text-theme-sm dark:text-gray-400">
                    {h.Fecha}
                  </TableCell>
                  <TableCell className="px-5 py-3.5 text-left dark:border-white/[0.05] text-gray-500 text-theme-sm dark:text-gray-400">
                    <span
                      className={`${
                        h.stopper ? "text-red-500" : "text-gray-500"
                      }`}
                    >
                      {h.Mensaje}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
