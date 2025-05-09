import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface data {
  fecha1?: string;
  fecha2?: string;
  fecha3?: string;
  fecha4?: string;
}

export default function InvoiceTable({ fecha1, fecha2, fecha3, fecha4 }: data) {
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
                Fecha de Creacion
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-400"
              >
                Fecha limite de resolucion
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-400"
              >
                Fecha de resolucion
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-400"
              >
                Fecha de cierre
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            <TableRow>
              <TableCell className="px-5 py-3.5 text-left dark:border-white/[0.05] text-gray-500 text-theme-sm dark:text-gray-400">
                {fecha1 || "Ticket en curso"}
              </TableCell>
              <TableCell className="px-5 py-3.5 text-left dark:border-white/[0.05] text-gray-500 text-theme-sm dark:text-gray-400">
                {fecha2 || "Ticket en curso"}
              </TableCell>
              <TableCell className="px-5 py-3.5 text-left dark:border-white/[0.05] text-gray-500 text-theme-sm dark:text-gray-400">
                {fecha3 || "Ticket en curso"}
              </TableCell>
              <TableCell className="px-5 py-3.5 text-left dark:border-white/[0.05] text-gray-500 text-theme-sm dark:text-gray-400">
                {fecha4 || "Ticket en curso"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
