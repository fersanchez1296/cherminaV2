"use client";
import { useModal } from "@/hooks/useModal";
import ComponentCard from "../../common/ComponentCard";

import Button from "../../ui/button/Button";
import { Modal } from "../../ui/modal";
import InvoiceMain from "@/components/invoice/InvoiceMain";

export default function FullScreenModal() {
  const {
    isOpen: isFullscreenModalOpen,
    openModal: openFullscreenModal,
    closeModal: closeFullscreenModal,
  } = useModal();
  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeFullscreenModal();
  };
  return (
    <ComponentCard title="Full Screen Modal">
      <Button size="sm" onClick={openFullscreenModal}>
        Open Modal
      </Button>
      <Modal
        isOpen={isFullscreenModalOpen}
        onClose={closeFullscreenModal}
        isFullscreen={true}
        showCloseButton={true}
      >
        <div className="fixed top-0 left-0 flex flex-col justify-between w-full h-screen p-6 overflow-x-hidden overflow-y-auto bg-white dark:bg-gray-900 lg:p-15">
          {/* <div className="flex items-center justify-end w-full gap-3 mt-8">
            <Button size="sm" onClick={handleSave}>
              Guardar
            </Button>
          </div> */}
          <InvoiceMain />
        </div>
      </Modal>
    </ComponentCard>
  );
}
