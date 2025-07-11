import ComponentCard from "@/components/common/ComponentCard";
import NotificacionesTabs from "@/components/ui/tabs/NotificacionesTabs";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  // title: "Next.js Tabs | TailAdmin - Next.js Dashboard Template",
  // description:
  //   "This is Next.js Tabs page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
  // other metadata
};

export default function Tabs() {
  return (
    <div>
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="Notificaciones">
          <NotificacionesTabs/>
        </ComponentCard>
      </div>
    </div>
  );
}
