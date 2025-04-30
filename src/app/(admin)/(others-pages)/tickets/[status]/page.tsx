import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
// import DataTableTwo from "@/components/tables/DataTables/TableTwo/DataTableTwo";
// import DataTableOne from "@/components/tables/DataTables/TableOne/DataTableOne";
import DataTableThree from "@/components/tables/DataTables/TableThree/DataTableThree";

import { Metadata } from "next";
import React from "react";

// export const metadata: Metadata = {
//   title: "Next.js Advanced Data Table | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Advanced Data Table page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };

export default async function DataTables({
  params,
  searchParams,
}: {
  params: Promise<{
    status: string;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const {status} = await params;
  return (
    <div>
      <PageBreadcrumb pageTitle="Tickets" />
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title={`Tickets - ${status}`}>
          <DataTableThree />
        </ComponentCard>
      </div>
    </div>
  );
}
