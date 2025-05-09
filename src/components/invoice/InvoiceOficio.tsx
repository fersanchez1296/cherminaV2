import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface data {
  oficio1?: string;
  oficio2?: string;
}

export default function InvoiceTable({ oficio1, oficio2 }: data) {
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
                Oficio de recepcion
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-400"
              >
                Oficio de cierre
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            <TableRow>
              <TableCell className="px-5 py-3.5 text-left dark:border-white/[0.05] text-gray-500 text-theme-sm dark:text-gray-400">
                {oficio1 || "Sin oficio"}
              </TableCell>
              <TableCell className="px-5 py-3.5 text-left dark:border-white/[0.05] text-gray-500 text-theme-sm dark:text-gray-400">
                {oficio2 || "Sin oficio"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
