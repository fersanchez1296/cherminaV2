import React from "react";
import InvoiceMain from "./InvoiceMain";

export default function Invoice() {
  return (
    <div className="flex flex-col h-full gap-6 sm:gap-5 xl:flex-row">
      <InvoiceMain />
    </div>
  );
}