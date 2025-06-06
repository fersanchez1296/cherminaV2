import { Ticket } from "@/common/interfaces/ticket.interface";
import {
  EyeIcon,
  EnvelopeIcon,
  CheckLineIcon,
  DocumentPlusIcon,
  CheckCircleIcon,
  ArrowUTurnDownIcon,
  ArrowUTurnLeftIcon,
  ClockIcon,
  ArrowsRepeatIcon,
  ArrowsRepeatOneIcon,
  EditIcon,
  ReceiptRefoundIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ClockArrowIcon,
  ForwardIcon,
  AnnotationIcon,
} from "@/icons";

export const getActions = (
  item: Partial<Ticket>,
  handlers: any,
  userRole: string,
  status: string
) => {
  const allActions = [
    // ver
    {
      icon: () => <EyeIcon />,
      tooltip: "Ver",
      onClick: () => {
        handlers.toggleModal("ver", true);
        handlers.setSingleItem(item);
      },
      visible: ["Administrador", "Root", "Moderador", "Usuario"],
      estados: [
        "CERRADOS",
        "ABIERTOS",
        "NUEVOS",
        "PENDIENTES",
        "REABIERTOS",
        "RESUELTOS",
        "REVISION",
        "STANDBY",
        "cerrado",
        "curso",
        "nuevo",
        "pendiente",
        "reabierto",
        "resuelto",
        "revision",
        "mesaServicio",
      ],
    },
    // nota
    {
      icon: () => <AnnotationIcon />,
      tooltip: "Agregar nota",
      onClick: () => {
        handlers.toggleModal("nota", true);
        handlers.setSingleItem(item);
      },
      visible: ["Administrador", "Root", "Moderador", "Usuario"],
      estados: [
        "CERRADOS",
        "ABIERTOS",
        "NUEVOS",
        "PENDIENTES",
        "REABIERTOS",
        "RESUELTOS",
        "REVISION",
        "STANDBY",
        "cerrado",
        "curso",
        "nuevo",
        "pendiente",
        "reabierto",
        "resuelto",
        "revision",
        "mesaServicio",
      ],
    },
    // rechazar
    {
      icon: () => <HandThumbDownIcon />,
      tooltip: "Rechazar Resolución",
      onClick: () => {
        handlers.toggleModal("rechazar", true);
        handlers.setSingleItem(item);
      },
      visible: ["Moderador"],
      estados: ["revision", "REVISION"],
    },
    // resolver
    {
      icon: () => <CheckLineIcon />,
      tooltip: "Resolver",
      onClick: () => {
        handlers.toggleModal("resolver", true);
        handlers.setSingleItem(item);
      },
      visible: ["Administrador", "Root", "Moderador", "Usuario"],
      estados: [
        "ABIERTOS",
        "NUEVOS",
        "REABIERTOS",
        "REVISION",
        "STANDBY",
        "curso",
        "nuevo",
        "reabierto",
        "revision",
        "mesaServicio",
      ],
    },
    // contacto
    {
      icon: () => <EnvelopeIcon />,
      tooltip: "Contactar Cliente",
      onClick: () => {
        handlers.toggleModal("contacto", true);
        handlers.setSingleItem(item);
      },
      visible: ["Administrador", "Root", "Moderador", "Usuario"],
      estados: [
        "CERRADOS",
        "ABIERTOS",
        "NUEVOS",
        "PENDIENTES",
        "REABIERTOS",
        "RESUELTOS",
        "REVISION",
        "STANDBY",
        "cerrado",
        "curso",
        "nuevo",
        "pendiente",
        "reabierto",
        "resuelto",
        "revision",
        "mesaServicio",
      ],
    },
    // cerrar
    {
      icon: () => <CheckCircleIcon />,
      tooltip: "Cerrar Ticket",
      onClick: () => {
        handlers.toggleModal("cerrar", true);
        handlers.setSingleItem(item);
      },
      visible: ["Administrador", "Root", "Moderador", "Usuario"],
      estados: ["resuelto", "RESUELTOS"],
    },
    // reabrir
    {
      icon: () => <ArrowUTurnDownIcon />,
      tooltip: "Reabrir Ticket",
      onClick: () => {
        handlers.toggleModal("reabrir", true);
        handlers.setSingleItem(item);
      },
      visible: ["Administrador", "Root", "Moderador", "Usuario"],
      estados: ["cerrado", "CERRADOS", "resuelto", "RESUELTOS"],
    },
    // regresar a resolutor
    {
      icon: () => <ArrowUTurnLeftIcon />,
      tooltip: "Regresar Ticket a Resolutor",
      onClick: () => {
        handlers.toggleModal("regresarResolutor", true);
        handlers.setSingleItem(item);
      },
      visible: ["Administrador", "Root"],
      estados: ["pendiente", "PENDIENTES"],
    },
    // razon pendiente
    {
      icon: () => <ClockIcon />,
      tooltip: "Agregar Razón Pendiente",
      onClick: () => {
        handlers.toggleModal("razonPendiente", true);
        handlers.setSingleItem(item);
      },
      visible: ["Administrador", "Root", "Moderador", "Usuario"],
      estados: ["mesaServicio", "STANDBY"],
    },
    // asignar
    {
      icon: () => <ArrowsRepeatIcon />,
      tooltip: "Asignar Ticket",
      onClick: () => {
        handlers.toggleModal("asignar", true);
        handlers.setSingleItem(item);
      },
      visible: ["Administrador", "Root", "Moderador", "Usuario"],
      estados: ["mesaServicio", "STANDBY"],
    },
    // reasignar
    {
      icon: () => <ArrowsRepeatOneIcon />,
      tooltip: "Reasignar Ticket",
      onClick: () => {
        handlers.toggleModal("reasignar", true);
        handlers.setTicketId(item._id);
        handlers.setFechaResolucionSLA(item.Fecha_limite_resolucion_SLA);
      },
      visible: ["Moderador"],
      estados: [
        "curso",
        "ABIERTOS",
        "nuevo",
        "NUEVOS",
        "reabierto",
        "REABIERTOS",
        "revision",
        "REVISION",
      ],
    },
    // editar
    {
      icon: () => <EditIcon />,
      tooltip: "Editar Ticket",
      onClick: () => {
        handlers.toggleModal("editar", true);
        handlers.setTicketId(item._id);
      },
      visible: ["Administrador", "Root", "Moderador", "Usuario"],
      estados: ["mesaServicio", "STANDBY"],
    },
    // regresar a mesa de servicio
    {
      icon: () => <ReceiptRefoundIcon />,
      tooltip: "Regresar Ticket a Mesa de Servicio",
      onClick: () => {
        handlers.toggleModal("regresarMesa", true);
        handlers.setSingleItem(item);
      },
      visible: ["Moderador"],
      estados: [
        "ABIERTOS",
        "NUEVOS",
        "REABIERTOS",
        "curso",
        "nuevo",
        "reabierto",
      ],
    },
    // aceptar
    {
      icon: () => <HandThumbUpIcon />,
      tooltip: "Aceptar Resolución",
      onClick: () => {
        handlers.toggleModal("aceptar", true);
        handlers.setSingleItem(item);
      },
      visible: ["Moderador"],
      estados: ["revision","REVISION"],
    },
    // marcar como pendiente
    {
      icon: () => <ClockArrowIcon />,
      tooltip: "Marcar Ticket Como Pendiente",
      onClick: () => {
        handlers.toggleModal("pendiente", true);
        handlers.setSingleItem(item);
      },
      visible: ["Usuario"],
      estados: [
        "ABIERTOS",
        "NUEVOS",
        "REABIERTOS",
        "curso",
        "nuevo",
        "reabierto",
      ],
    },
    // regresar a moderador
    {
      icon: () => <ForwardIcon />,
      tooltip: "Regresar Ticket a Moderador",
      onClick: () => {
        handlers.toggleModal("regresarModerador", true);
        handlers.setSingleItem(item);
      },
      visible: ["Usuario"],
      estados: [
        "curso",
        "ABIERTOS"
      ],
    },
    // oficio de cierre
    {
      icon: () => <DocumentPlusIcon />,
      tooltip: "Agregar Oficio de Cierre",
      onClick: () => {
        handlers.toggleModal("oficio", true);
        handlers.setSingleItem(item);
      },
      visible: ["Administrador", "Root", "Moderador", "Usuario"],
      estados: ["cerrado", "resuelto", "CERRADOS", "RESUELTOS"],
    },
  ];

  return allActions.filter((action) => {
    const rolValido = action.visible?.includes(userRole);
    const estadoValido = action.estados.includes(status);
    return rolValido && estadoValido;
  });
};
