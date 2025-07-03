import Celula from "@/components/celulas/Celula";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title:
    "Next.js SaaS Dashboard | TailAdmin - Next.js Admin Dashboard Template",
  description:
    "This is Next.js SaaS Dashboard page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function CelulaComponent() {
  return (
    <Celula />
  );
}
