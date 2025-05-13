import React from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal/index";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
const ModalNota = () => {
  const {
    isOpen: isOpenNota,
    openModal: openModalNota,
    closeModal: closeModalNota,
  } = useModal();
  return (
    <>
      <Modal
        isOpen={isOpenNota}
        onClose={closeModalNota}
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Agregar nota
            </h4>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2">
                    <Label>Descripcion</Label>
                    <TextArea
                      value={message}
                      onChange={(value) => setMessage(value)}
                      rows={10}
                    />
                  </div>
                  <div className="col-span-2 mt-5">
                    <DropzoneComponent />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModalNota}>
                Cerrar
              </Button>
              <Button size="sm">Guardar nota</Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ModalNota;
