import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface data {
  usuario1?: string;
  usuario2?: string;
  usuario3?: string;
}

export default function InvoiceTable({ usuario1, usuario2, usuario3 }: data) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]  w-full">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] ">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-400"
              >
                Creado por
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-400"
              >
                Resuelto por
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-400"
              >
                Cerrado por
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            <TableRow>
              <TableCell className="px-5 py-3.5 text-left dark:border-white/[0.05] text-gray-500 text-theme-sm dark:text-gray-400">
                {usuario1 || "Ticket en curso"}
              </TableCell>
              <TableCell className="px-5 py-3.5 text-left dark:border-white/[0.05] text-gray-500 text-theme-sm dark:text-gray-400">
                {usuario2 || "Ticket en curso"}
              </TableCell>
              <TableCell className="px-5 py-3.5 text-left dark:border-white/[0.05] text-gray-500 text-theme-sm dark:text-gray-400">
                {usuario3 || "Ticket en curso"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
