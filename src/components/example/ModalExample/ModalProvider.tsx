// components/AllModals.tsx
"use client";
import { useModals } from "@/context/ModalManager";

// Importa todos tus modales aquí
import ModalVer from "@/components/example/ModalExample/ModalVer";
import ModalNota from "@/components/example/ModalExample/ModalNota";
import ModalResolver from "@/components/example/ModalExample/ModalResolver";
import ModalContacto from "@/components/example/ModalExample/ModalContacto";
import ModalCerrarTicket from "@/components/example/ModalExample/ModalCerrarTicket";
import ModalRazonPendiente from "@/components/example/ModalExample/ModalRazonPendiente";
import ModalRegresarMesa from "@/components/example/ModalExample/ModalRegresarMesa";
import ModalRegresarModerador from "@/components/example/ModalExample/ModalRegresarModerador";
import ModalAceptar from "@/components/example/ModalExample/ModalAceptar";
import ModalRechazar from "@/components/example/ModalExample/ModalRechazar";
import ModalRegresarResolutor from "@/components/example/ModalExample/ModalRegresarResolutor";
import ModalMarcarPendiente from "@/components/example/ModalExample/ModalMarcarPendiente";
import ModalAsignar from "@/components/example/ModalExample/ModalAsignar";
import ModalReasignar from "@/components/example/ModalExample/ModalReasignar";
import ModalReabrir from "@/components/example/ModalExample/ModalReabrir";
import ModalOficio from "@/components/example/ModalExample/ModalOficio";
import { Ticket } from "@/common/interfaces/ticket.interface";
import ModalEditar from "./ModalEditar";

interface Props {
  ticket: Partial<Ticket>;
  status: string;
}

export default function AllModals({ ticket, status }: Props) {
  const { state, toggleModal } = useModals();

  //console.log("este es el ticket", ticket);
  return (
    <>
      {/* {state["ver"] && (
        <ModalVer
          open
          handleToggleModalState={toggleModal}
          ticket={ticket}
          status={status}
        />
      )} */}

      {state["aceptar"] && (
        <ModalAceptar
          open
          handleToggleModalState={toggleModal}
          id={ticket.Id}
          uuid={ticket._id}
          Nombre={ticket.Reasignado_a?.[0]?.Nombre || ""}
          descripcion_resolucion={ticket.Respuesta_cierre_reasignado}
          fechaResolucion={ticket.Fecha_hora_resolucion}
        />
      )}
      {state["rechazar"] && (
        <ModalRechazar
          open
          handleToggleModalState={toggleModal}
          id={ticket.Id}
          uuid={ticket._id}
          resolutor={ticket.Reasignado_a?.[0]?.Nombre || ""}
          Nombre={ticket.Reasignado_a?.[0]?.Nombre || ""}
          reasignado = {ticket.Reasignado_a?.[0]?._id}
          // descripcion_resolucion={ticket.Respuesta_cierre_reasignado}
          fechaResolucion={ticket.Fecha_hora_resolucion}
        />
      )}
      {state["resolver"] && (
        <ModalResolver
          open
          handleToggleModalState={toggleModal}
          id={ticket.Id}
          uuid={ticket._id}
          vistoBueno={ticket.vistoBueno?.toString()}
        />
      )}
      {state["contacto"] && (
        <ModalContacto
          open
          handleToggleModalState={toggleModal}
          id={ticket.Id}
          uuid={ticket._id}
          nombreCliente={ticket.Cliente?.Nombre}
        />
      )}
      {state["cerrar"] && (
        <ModalCerrarTicket
          open
          handleToggleModalState={toggleModal}
          id={ticket.Id}
          uuid={ticket._id}
          descripcionCierre={ticket.Respuesta_cierre_reasignado}
          Resuelto_por = {ticket.Resuelto_por?._id}
        />
      )}
      {state["razonPendiente"] && (
        <ModalRazonPendiente
          open
          handleToggleModalState={toggleModal}
          id={ticket.Id}
          uuid={ticket._id}
        />
      )}
      {state["regresarModerador"] && (
        <ModalRegresarModerador
          open
          handleToggleModalState={toggleModal}
          id={ticket.Id}
          uuid={ticket._id}
        />
      )}
      {state["pendiente"] && (
        <ModalMarcarPendiente
          open
          handleToggleModalState={toggleModal}
          id={ticket.Id}
          uuid={ticket._id}
          nombreCliente={ticket.Cliente?.Nombre}
        />
      )}
      {state["regresarResolutor"] && (
        <ModalRegresarResolutor
          open
          handleToggleModalState={toggleModal}
          id={ticket.Id}
          uuid={ticket._id}
          reasignado = {ticket.Reasignado_a?.[0]?._id}
        />
      )}
      {state["regresarMesa"] && (
        <ModalRegresarMesa
          open
          handleToggleModalState={toggleModal}
          id={ticket.Id}
          uuid={ticket._id}
        />
      )}
      {state["asignar"] && (
        <ModalAsignar
          open
          handleToggleModalState={toggleModal}
          uuid={ticket.Id}
          id={ticket._id}
          fechaResolucion={ticket.Fecha_limite_resolucion_SLA}
          Cliente={ticket.Cliente}
        />
      )}
      {state["reasignar"] && (
        <ModalReasignar
          open
          handleToggleModalState={toggleModal}
          uuid={ticket.Id}
          id={ticket._id}
          fechaResolucion={ticket.Fecha_limite_resolucion_SLA}
        />
      )}
      {state["reabrir"] && (
        <ModalReabrir
          open
          handleToggleModalState={toggleModal}
          id={ticket.Id}
          uuid={ticket._id}
          fechaResolucion={ticket.Fecha_limite_resolucion_SLA}
        />
      )}
      {state["nota"] && (
        <ModalNota open handleToggleModalState={toggleModal} uuid={ticket._id} />
      )}
      {state["oficio"] && (
        <ModalOficio
          open
          handleToggleModalState={toggleModal}
          id={ticket.Id}
          uuid={ticket._id}
        />
      )}
      {state["nota"] && (
        <ModalNota open handleToggleModalState={toggleModal} uuid={ticket._id} />
      )}
      {state["editar"] && (
        <ModalEditar
          open
          handleToggleModalState={toggleModal}
          ticket={ticket}
          uuid={ticket._id}
        />
      )}
    </>
  );
}
