"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import { useSession } from "next-auth/react";
import {
  // BoxCubeIcon,
  CalenderIcon,
  //ChatIcon,
  ChevronDownIcon,
  DocsIcon,
  GridIcon,
  HorizontaLDots,
  // ListIcon,
  MailIcon,
  // PageIcon,
  // PieChartIcon,
  // PlugInIcon,
  // TableIcon,
  TaskIcon,
  UserCircleIcon,
  FileCirclePlusIcon,
  UsersGroupIcon,
  UsersIcon,
  SearchIcon,
  Adjustments,
  Building,
  EnvelopeIcon,
  BriefcaseIcon,
  FolderIcon,
  BugIcon,
} from "../icons/index";
import SidebarWidget from "./SidebarWidget";
type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  visible?: string[];
  new?: boolean;
  allowedAreas: string[];
  subItems?: {
    icon?: React.ReactNode;
    name: string;
    path: string;
    pro?: boolean;
    new?: boolean;
    visible?: string[];
    allowedAreas: string[];
  }[];
};

// const othersItems: NavItem[] = [
//   {
//     icon: <PieChartIcon />,
//     name: "Charts",
//     subItems: [
//       {
//         name: "Line Chart",
//         path: "/line-chart",
//         pro: true,
//         visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
//       },
//       {
//         name: "Bar Chart",
//         path: "/bar-chart",
//         pro: true,
//         visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
//       },
//       {
//         name: "Pie Chart",
//         path: "/pie-chart",
//         pro: true,
//         visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
//       },
//     ],
//     visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
//   },
//   {
//     icon: <BoxCubeIcon />,
//     name: "UI Elements",
//     subItems: [
//       {
//         name: "Alerts",
//         path: "/alerts",
//         pro: true,
//         visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
//       },
//       {
//         name: "Avatar",
//         path: "/avatars",
//         pro: true,
//         visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
//       },
//       {
//         name: "Badge",
//         path: "/badge",
//         pro: true,
//         visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
//       },
//       {
//         name: "Breadcrumb",
//         path: "/breadcrumb",
//         pro: true,
//         visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
//       },
//       {
//         name: "Buttons",
//         path: "/buttons",
//         pro: true,
//         visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
//       },
//       {
//         name: "Buttons Group",
//         path: "/buttons-group",
//         pro: true,
//         visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
//       },
//       {
//         name: "Cards",
//         path: "/cards",
//         pro: true,
//         visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
//       },
//       {
//         name: "Carousel",
//         path: "/carousel",
//         pro: true,
//         visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
//       },
//       {
//         name: "Dropdowns",
//         path: "/dropdowns",
//         pro: true,
//         visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
//       },
//       {
//         name: "Images",
//         path: "/images",
//         pro: true,
//         visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
//       },
//       {
//         name: "Links",
//         path: "/links",
//         pro: true,
//         visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
//       },
//       {
//         name: "List",
//         path: "/list",
//         pro: true,
//         visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
//       },
//       {
//         name: "Modals",
//         path: "/modals",
//         pro: true,
//         visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
//       },
//       {
//         name: "Notification",
//         path: "/notifications",
//         pro: true,
//         visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
//       },
//       {
//         name: "Pagination",
//         path: "/pagination",
//         pro: true,
//         visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
//       },
//       {
//         name: "Popovers",
//         path: "/popovers",
//         pro: true,
//         visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
//       },
//       {
//         name: "Progressbar",
//         path: "/progress-bar",
//         pro: true,
//         visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
//       },
//       {
//         name: "Ribbons",
//         path: "/ribbons",
//         pro: true,
//         visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
//       },
//       {
//         name: "Spinners",
//         path: "/spinners",
//         pro: true,
//         visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
//       },
//       {
//         name: "Tabs",
//         path: "/tabs",
//         pro: true,
//         visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
//       },
//       {
//         name: "Tooltips",
//         path: "/tooltips",
//         pro: true,
//         visible: ["admin", "Usuario", "Root", "Moderador", "Auditor"],
//       },
//       {
//         name: "Videos",
//         path: "/videos",
//         pro: true,
//         visible: ["admin", "Usuario", "Root", "Moderador", "Auditor"],
//       },
//     ],
//     visible: ["admin", "Usuario", "Root", "Moderador", "Auditor"],
//   },
//   {
//     icon: <PlugInIcon />,
//     name: "Authentication",
//     subItems: [
//       { name: "Sign In", path: "/signin", pro: false },
//       { name: "Sign Up", path: "/signup", pro: false },
//       { name: "Reset Password", path: "/reset-password", pro: true },
//       {
//         name: "Two Step Verification",
//         path: "/two-step-verification",
//         pro: true,
//       },
//     ],
//     visible: ["admin", "Usuario", "Root", "Moderador", "Auditor"],
//   },
// ];

// const supportItems: NavItem[] = [
//   {
//     icon: <ChatIcon />,
//     name: "Chat",
//     path: "/chat",
//     visible: ["admin", "Usuario", "Root", "Moderador", "Auditor"],
//   },
//   {
//     icon: <MailIcon />,
//     name: "Email",
//     subItems: [
//       {
//         name: "Inbox",
//         path: "/inbox",
//         visible: ["admin", "Usuario", "Root", "Moderador", "Auditor"],
//       },
//       {
//         name: "Details",
//         path: "/inbox-details",
//         visible: ["admin", "Usuario", "Root", "Moderador", "Auditor"],
//       },
//     ],
//     visible: ["admin", "Usuario", "Root", "Moderador", "Auditor"],
//   },
//   {
//     icon: <DocsIcon />,
//     name: "Invoice",
//     path: "/invoice",
//     visible: ["admin", "Usuario", "Root", "Moderador", "Auditor"],
//   },
// ];

const AppSidebar: React.FC = () => {
  const { data: session } = useSession();
  const role = session?.user?.rol;
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const userAreas = session?.user?.allowedAreas || [];
  const navItems: NavItem[] = [
    {
      icon: <UserCircleIcon />,
      name: "Perfil",
      path: "/profile",
      new: true,
      visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
      allowedAreas: [
        "Arquitectura de Software",
        "Auditoría de TI",
        "DC-CCTV",
        "DC-Infraestructura",
        "DC-Redes y Telecomunicaciones",
        "DC-Telefonía",
        "Desarrollo",
        "Mesa de Servicio",
        "Planeación",
        "Soporte Técnico",
        "Dirección",
      ],
    },
    {
      icon: <CalenderIcon />,
      name: "Calendario",
      path: "/calendar",
      new: true,
      visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
      allowedAreas: [
        "Arquitectura de Software",
        "Auditoría de TI",
        "DC-CCTV",
        "DC-Infraestructura",
        "DC-Redes y Telecomunicaciones",
        "DC-Telefonía",
        "Desarrollo",
        "Mesa de Servicio",
        "Planeación",
        "Soporte Técnico",
        "Dirección",
      ],
    },
    {
      icon: <SearchIcon />,
      name: "Búsqueda avanzada",
      path: "/busqueda-avanzada",
      visible: ["Administrador", "Root", "Moderador", "Auditor"],
      allowedAreas: [
        "Arquitectura de Software",
        "Auditoría de TI",
        "DC-CCTV",
        "DC-Infraestructura",
        "DC-Redes y Telecomunicaciones",
        "DC-Telefonía",
        "Desarrollo",
        "Mesa de Servicio",
        "Planeación",
        "Soporte Técnico",
        "Dirección",
      ],
    },
    {
      icon: <GridIcon />,
      name: "Dashboard",
      subItems: [
        {
          name: "Dashboard",
          path: "/dashboard",
          pro: false,
          visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
          allowedAreas: [
            "Arquitectura de Software",
            "Auditoría de TI",
            "DC-CCTV",
            "DC-Infraestructura",
            "DC-Redes y Telecomunicaciones",
            "DC-Telefonía",
            "Desarrollo",
            "Mesa de Servicio",
            "Planeación",
            "Soporte Técnico",
            "Dirección",
          ],
        },
        {
          name: "Analytics",
          path: "/analytics",
          pro: true,
          visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
          allowedAreas: [
            "Arquitectura de Software",
            "Auditoría de TI",
            "DC-CCTV",
            "DC-Infraestructura",
            "DC-Redes y Telecomunicaciones",
            "DC-Telefonía",
            "Desarrollo",
            "Mesa de Servicio",
            "Planeación",
            "Soporte Técnico",
            "Dirección",
          ],
        },
        {
          name: "Marketing",
          path: "/marketing",
          pro: true,
          visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
          allowedAreas: [
            "Arquitectura de Software",
            "Auditoría de TI",
            "DC-CCTV",
            "DC-Infraestructura",
            "DC-Redes y Telecomunicaciones",
            "DC-Telefonía",
            "Desarrollo",
            "Mesa de Servicio",
            "Planeación",
            "Soporte Técnico",
            "Dirección",
          ],
        },
        {
          name: "CRM",
          path: "/crm",
          pro: true,
          visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
          allowedAreas: [
            "Arquitectura de Software",
            "Auditoría de TI",
            "DC-CCTV",
            "DC-Infraestructura",
            "DC-Redes y Telecomunicaciones",
            "DC-Telefonía",
            "Desarrollo",
            "Mesa de Servicio",
            "Planeación",
            "Soporte Técnico",
            "Dirección",
          ],
        },
        {
          name: "Stocks",
          path: "/stocks",
          new: true,
          pro: true,
          visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
          allowedAreas: [
            "Arquitectura de Software",
            "Auditoría de TI",
            "DC-CCTV",
            "DC-Infraestructura",
            "DC-Redes y Telecomunicaciones",
            "DC-Telefonía",
            "Desarrollo",
            "Mesa de Servicio",
            "Planeación",
            "Soporte Técnico",
            "Dirección",
          ],
        },
        {
          name: "Celulas",
          path: "/celula",
          new: true,
          pro: true,
          visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
          allowedAreas: ["Desarrollo", "Arquitectura de Software"],
        },
        {
          name: "SaaS",
          path: "/saas",
          new: true,
          pro: true,
          visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
          allowedAreas: [
            "Arquitectura de Software",
            "Auditoría de TI",
            "DC-CCTV",
            "DC-Infraestructura",
            "DC-Redes y Telecomunicaciones",
            "DC-Telefonía",
            "Desarrollo",
            "Mesa de Servicio",
            "Planeación",
            "Soporte Técnico",
            "Dirección",
          ],
        },
      ],
      visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
      allowedAreas: [
        "Arquitectura de Software",
        "Auditoría de TI",
        "DC-CCTV",
        "DC-Infraestructura",
        "DC-Redes y Telecomunicaciones",
        "DC-Telefonía",
        "Desarrollo",
        "Mesa de Servicio",
        "Planeación",
        "Soporte Técnico",
        "Dirección",
      ],
    },
    {
      icon: <Adjustments />,
      name: "Catálogos",
      subItems: [
        {
          icon: <Building />,
          name: "Áreas",
          path: "/areas",
          visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
          allowedAreas: [
            "Arquitectura de Software",
            "Auditoría de TI",
            "DC-CCTV",
            "DC-Infraestructura",
            "DC-Redes y Telecomunicaciones",
            "DC-Telefonía",
            "Desarrollo",
            "Mesa de Servicio",
            "Planeación",
            "Soporte Técnico",
            "Dirección",
          ],
        },
        {
          icon: <Building />,
          name: "Dependencias",
          path: "/dependencias",
          visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
          allowedAreas: [
            "Arquitectura de Software",
            "Auditoría de TI",
            "DC-CCTV",
            "DC-Infraestructura",
            "DC-Redes y Telecomunicaciones",
            "DC-Telefonía",
            "Desarrollo",
            "Mesa de Servicio",
            "Planeación",
            "Soporte Técnico",
            "Dirección",
          ],
        },
        {
          icon: <Building />,
          name: "Direcciones Generales",
          path: "/direccionesGenerales",
          visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
          allowedAreas: [
            "Arquitectura de Software",
            "Auditoría de TI",
            "DC-CCTV",
            "DC-Infraestructura",
            "DC-Redes y Telecomunicaciones",
            "DC-Telefonía",
            "Desarrollo",
            "Mesa de Servicio",
            "Planeación",
            "Soporte Técnico",
            "Dirección",
          ],
        },
        {
          icon: <Building />,
          name: "Direcciones de Área",
          path: "/direccionesAreas",
          visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
          allowedAreas: [
            "Arquitectura de Software",
            "Auditoría de TI",
            "DC-CCTV",
            "DC-Infraestructura",
            "DC-Redes y Telecomunicaciones",
            "DC-Telefonía",
            "Desarrollo",
            "Mesa de Servicio",
            "Planeación",
            "Soporte Técnico",
            "Dirección",
          ],
        },
        {
          icon: <FolderIcon />,
          name: "Servicio",
          path: "/catalogoservicio",
          visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
          allowedAreas: [
            "Arquitectura de Software",
            "Auditoría de TI",
            "DC-CCTV",
            "DC-Infraestructura",
            "DC-Redes y Telecomunicaciones",
            "DC-Telefonía",
            "Desarrollo",
            "Mesa de Servicio",
            "Planeación",
            "Soporte Técnico",
            "Dirección",
          ],
        },
        {
          icon: <EnvelopeIcon />,
          name: "Medios de Contacto",
          path: "/medios",
          visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
          allowedAreas: [
            "Arquitectura de Software",
            "Auditoría de TI",
            "DC-CCTV",
            "DC-Infraestructura",
            "DC-Redes y Telecomunicaciones",
            "DC-Telefonía",
            "Desarrollo",
            "Mesa de Servicio",
            "Planeación",
            "Soporte Técnico",
            "Dirección",
          ],
        },
        {
          icon: <BriefcaseIcon />,
          name: "Puestos de trabajo",
          path: "/puestos",
          visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
          allowedAreas: [
            "Arquitectura de Software",
            "Auditoría de TI",
            "DC-CCTV",
            "DC-Infraestructura",
            "DC-Redes y Telecomunicaciones",
            "DC-Telefonía",
            "Desarrollo",
            "Mesa de Servicio",
            "Planeación",
            "Soporte Técnico",
            "Dirección",
          ],
        },
      ],
      visible: ["Administrador", "Root"],
      allowedAreas: [
        "Arquitectura de Software",
        "Auditoría de TI",
        "DC-CCTV",
        "DC-Infraestructura",
        "DC-Redes y Telecomunicaciones",
        "DC-Telefonía",
        "Desarrollo",
        "Mesa de Servicio",
        "Planeación",
        "Soporte Técnico",
        "Dirección",
      ],
    },
    {
      icon: <FileCirclePlusIcon />,
      name: "Crear Ticket",
      path: "/crear-ticket",
      visible: ["Administrador", "Root"],
      allowedAreas: [
        "Arquitectura de Software",
        "Auditoría de TI",
        "DC-CCTV",
        "DC-Infraestructura",
        "DC-Redes y Telecomunicaciones",
        "DC-Telefonía",
        "Desarrollo",
        "Mesa de Servicio",
        "Planeación",
        "Soporte Técnico",
        "Dirección",
      ],
    },
    {
      name: "Tickets",
      icon: <DocsIcon />,
      subItems: [
        {
          name: "Nuevos",
          path: "/tickets/nuevo",
          visible: ["Administrador", "Root", "Moderador"],
          allowedAreas: [
            "Arquitectura de Software",
            "Auditoría de TI",
            "DC-CCTV",
            "DC-Infraestructura",
            "DC-Redes y Telecomunicaciones",
            "DC-Telefonía",
            "Desarrollo",
            "Mesa de Servicio",
            "Planeación",
            "Soporte Técnico",
            "Dirección",
          ],
        },
        {
          name: "En curso",
          path: "/tickets/curso",
          visible: ["Administrador", "Usuario", "Root", "Moderador"],
          allowedAreas: [
            "Arquitectura de Software",
            "Auditoría de TI",
            "DC-CCTV",
            "DC-Infraestructura",
            "DC-Redes y Telecomunicaciones",
            "DC-Telefonía",
            "Desarrollo",
            "Mesa de Servicio",
            "Planeación",
            "Soporte Técnico",
            "Dirección",
          ],
        },
        {
          name: "Reabiertos",
          path: "/tickets/reabierto",
          visible: ["Administrador", "Usuario", "Root", "Moderador"],
          allowedAreas: [
            "Arquitectura de Software",
            "Auditoría de TI",
            "DC-CCTV",
            "DC-Infraestructura",
            "DC-Redes y Telecomunicaciones",
            "DC-Telefonía",
            "Desarrollo",
            "Mesa de Servicio",
            "Planeación",
            "Soporte Técnico",
            "Dirección",
          ],
        },
        {
          name: "Pendientes",
          path: "/tickets/pendiente",
          visible: ["Administrador", "Usuario", "Root", "Moderador"],
          allowedAreas: [
            "Arquitectura de Software",
            "Auditoría de TI",
            "DC-CCTV",
            "DC-Infraestructura",
            "DC-Redes y Telecomunicaciones",
            "DC-Telefonía",
            "Desarrollo",
            "Mesa de Servicio",
            "Planeación",
            "Soporte Técnico",
            "Dirección",
          ],
        },
        {
          name: "Revisión",
          path: "/tickets/revision",
          visible: ["Administrador", "Usuario", "Root", "Moderador"],
          allowedAreas: [
            "Arquitectura de Software",
            "Auditoría de TI",
            "DC-CCTV",
            "DC-Infraestructura",
            "DC-Redes y Telecomunicaciones",
            "DC-Telefonía",
            "Desarrollo",
            "Mesa de Servicio",
            "Planeación",
            "Soporte Técnico",
            "Dirección",
          ],
        },
        {
          name: "Mesa de servicio",
          path: "/tickets/mesaServicio",
          visible: ["Administrador", "Root"],
          allowedAreas: [
            "Arquitectura de Software",
            "Auditoría de TI",
            "DC-CCTV",
            "DC-Infraestructura",
            "DC-Redes y Telecomunicaciones",
            "DC-Telefonía",
            "Desarrollo",
            "Mesa de Servicio",
            "Planeación",
            "Soporte Técnico",
            "Dirección",
          ],
        },
        {
          name: "Resueltos",
          path: "/tickets/resuelto",
          visible: ["Administrador", "Usuario", "Root", "Moderador"],
          allowedAreas: [
            "Arquitectura de Software",
            "Auditoría de TI",
            "DC-CCTV",
            "DC-Infraestructura",
            "DC-Redes y Telecomunicaciones",
            "DC-Telefonía",
            "Desarrollo",
            "Mesa de Servicio",
            "Planeación",
            "Soporte Técnico",
            "Dirección",
          ],
        },
        {
          name: "Cerrados",
          path: "/tickets/cerrado",
          visible: ["Administrador", "Usuario", "Root", "Moderador"],
          allowedAreas: [
            "Arquitectura de Software",
            "Auditoría de TI",
            "DC-CCTV",
            "DC-Infraestructura",
            "DC-Redes y Telecomunicaciones",
            "DC-Telefonía",
            "Desarrollo",
            "Mesa de Servicio",
            "Planeación",
            "Soporte Técnico",
            "Dirección",
          ],
        },
      ],
      visible: ["Administrador", "Usuario", "Root", "Moderador"],
      allowedAreas: [
        "Arquitectura de Software",
        "Auditoría de TI",
        "DC-CCTV",
        "DC-Infraestructura",
        "DC-Redes y Telecomunicaciones",
        "DC-Telefonía",
        "Desarrollo",
        "Mesa de Servicio",
        "Planeación",
        "Soporte Técnico",
        "Dirección",
      ],
    },
    {
      name: "Tareas",
      icon: <TaskIcon />,
      subItems: [
        {
          name: "Nuevas",
          path: "/tareas/nuevo",
          new: true,
          visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
          allowedAreas: [
            "Arquitectura de Software",
            "Auditoría de TI",
            "DC-CCTV",
            "DC-Infraestructura",
            "DC-Redes y Telecomunicaciones",
            "DC-Telefonía",
            "Desarrollo",
            "Mesa de Servicio",
            "Planeación",
            "Soporte Técnico",
            "Dirección",
          ],
        },
        {
          name: "En curso",
          path: "/tareas/curso",
          new: true,
          visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
          allowedAreas: [
            "Arquitectura de Software",
            "Auditoría de TI",
            "DC-CCTV",
            "DC-Infraestructura",
            "DC-Redes y Telecomunicaciones",
            "DC-Telefonía",
            "Desarrollo",
            "Mesa de Servicio",
            "Planeación",
            "Soporte Técnico",
            "Dirección",
          ],
        },
        {
          name: "Resueltas",
          path: "/tareas/resuelto",
          new: true,
          visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
          allowedAreas: [
            "Arquitectura de Software",
            "Auditoría de TI",
            "DC-CCTV",
            "DC-Infraestructura",
            "DC-Redes y Telecomunicaciones",
            "DC-Telefonía",
            "Desarrollo",
            "Mesa de Servicio",
            "Planeación",
            "Soporte Técnico",
            "Dirección",
          ],
        },
        // {
        //   name: "List",
        //   path: "/task-list",
        //   visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
        // },
        // {
        //   name: "Kanban",
        //   path: "/task-kanban",
        //   visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
        // },
      ],
      visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
      allowedAreas: [
        "Arquitectura de Software",
        "Auditoría de TI",
        "DC-CCTV",
        "DC-Infraestructura",
        "DC-Redes y Telecomunicaciones",
        "DC-Telefonía",
        "Desarrollo",
        "Mesa de Servicio",
        "Planeación",
        "Soporte Técnico",
        "Dirección",
      ],
    },
    {
      icon: <UsersGroupIcon />,
      name: "Celulas",
      path: "/celulas",
      visible: ["Moderador", "Auditor", "Root"],
      allowedAreas: [
        "Arquitectura de Software",
        "Auditoría de TI",
        "DC-CCTV",
        "DC-Infraestructura",
        "DC-Redes y Telecomunicaciones",
        "DC-Telefonía",
        "Desarrollo",
        "Mesa de Servicio",
        "Planeación",
        "Soporte Técnico",
        "Dirección",
      ],
    },
    {
      icon: <UsersGroupIcon />,
      name: "Usuarios",
      path: "/usuarios",
      visible: ["Administrador", "Root"],
      allowedAreas: [
        "Arquitectura de Software",
        "Auditoría de TI",
        "DC-CCTV",
        "DC-Infraestructura",
        "DC-Redes y Telecomunicaciones",
        "DC-Telefonía",
        "Desarrollo",
        "Mesa de Servicio",
        "Planeación",
        "Soporte Técnico",
        "Dirección",
      ],
    },
    {
      icon: <UsersIcon />,
      name: "Clientes",
      path: "/clientes",
      visible: ["Administrador", "Root"],
      allowedAreas: [
        "Arquitectura de Software",
        "Auditoría de TI",
        "DC-CCTV",
        "DC-Infraestructura",
        "DC-Redes y Telecomunicaciones",
        "DC-Telefonía",
        "Desarrollo",
        "Mesa de Servicio",
        "Planeación",
        "Soporte Técnico",
        "Dirección",
      ],
    },
    {
      icon: <BugIcon />,
      name: "Logs",
      path: "/logs",
      visible: ["Root"],
      allowedAreas: [
        "Arquitectura de Software",
        "Auditoría de TI",
        "DC-CCTV",
        "DC-Infraestructura",
        "DC-Redes y Telecomunicaciones",
        "DC-Telefonía",
        "Desarrollo",
        "Mesa de Servicio",
        "Planeación",
        "Soporte Técnico",
        "Dirección",
      ],
    },
    {
      icon: <MailIcon />,
      name: "Fila de correos",
      path: "/fila-correos",
      visible: ["Administrador", "Root"],
    },
    // {
    //   name: "Forms",
    //   icon: <ListIcon />,
    //   subItems: [
    //     {
    //       name: "Form Elements",
    //       path: "/form-elements",
    //       pro: false,
    //       visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
    //     },
    //     {
    //       name: "Form Layout",
    //       path: "/form-layout",
    //       pro: true,
    //       visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
    //     },
    //   ],
    //   visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
    // },
    // {
    //   name: "Tables",
    //   icon: <TableIcon />,
    //   subItems: [
    //     {
    //       name: "Basic Tables",
    //       path: "/basic-tables",
    //       pro: false,
    //       visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
    //     },
    //     {
    //       name: "Data Tables",
    //       path: "/data-tables",
    //       pro: true,
    //       visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
    //     },
    //   ],
    //   visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
    // },
    // {
    //   name: "Pages",
    //   icon: <PageIcon />,
    //   subItems: [
    //     {
    //       name: "File Manager",
    //       path: "/file-manager",
    //       pro: true,
    //       visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
    //     },
    //     {
    //       name: "Pricing Tables",
    //       path: "/pricing-tables",
    //       pro: true,
    //       visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
    //     },
    //     {
    //       name: "Faqs",
    //       path: "/faq",
    //       pro: true,
    //       visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
    //     },
    //     {
    //       name: "Blank Page",
    //       path: "/blank",
    //       pro: true,
    //       visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
    //     },
    //     {
    //       name: "404 Error",
    //       path: "/error-404",
    //       pro: true,
    //       visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
    //     },
    //     {
    //       name: "500 Error",
    //       path: "/error-500",
    //       pro: true,
    //       visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
    //     },
    //     {
    //       name: "503 Error",
    //       path: "/error-503",
    //       pro: true,
    //       visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
    //     },
    //     {
    //       name: "Coming Soon",
    //       path: "/coming-soon",
    //       pro: true,
    //       visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
    //     },
    //     {
    //       name: "Maintenance",
    //       path: "/maintenance",
    //       pro: true,
    //       visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
    //     },
    //     {
    //       name: "Success",
    //       path: "/success",
    //       pro: true,
    //       visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
    //     },
    //   ],
    //   visible: ["Administrador", "Usuario", "Root", "Moderador", "Auditor"],
    // },
  ];
  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "support" | "others"
  ) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => {
        const isVisibleByRole = nav.visible?.includes(role as string);
        const hasAreaRestriction = !!nav.allowedAreas;
        const isVisibleByArea =
          !hasAreaRestriction ||
          nav.allowedAreas.some((area) => userAreas.includes(area));

        if (isVisibleByRole && isVisibleByArea) {
          return (
            <li key={nav.name}>
              {nav.subItems ? (
                <button
                  onClick={() => handleSubmenuToggle(index, menuType)}
                  className={`menu-item group  ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "menu-item-active"
                      : "menu-item-inactive"
                  } cursor-pointer ${
                    !isExpanded && !isHovered
                      ? "lg:justify-center"
                      : "lg:justify-start"
                  }`}
                >
                  <span
                    className={` ${
                      openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                        ? "menu-item-icon-active"
                        : "menu-item-icon-inactive"
                    }`}
                  >
                    {nav.icon}
                  </span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <span className="menu-item-text flex items-center gap-1">
                      {nav.name}
                      {nav.new && (
                        <span
                          className={`ml-1 ${
                            isActive(nav.path as string)
                              ? "menu-dropdown-badge-active"
                              : "menu-dropdown-badge-inactive"
                          } menu-dropdown-badge`}
                        >
                          new
                        </span>
                      )}
                    </span>
                  )}

                  {(isExpanded || isHovered || isMobileOpen) && (
                    <ChevronDownIcon
                      className={`ml-auto w-5 h-5 transition-transform duration-200  ${
                        openSubmenu?.type === menuType &&
                        openSubmenu?.index === index
                          ? "rotate-180 text-brand-500"
                          : ""
                      }`}
                    />
                  )}
                </button>
              ) : (
                nav.path && (
                  <Link
                    href={nav.path}
                    className={`menu-item group ${
                      isActive(nav.path)
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    <span
                      className={`${
                        isActive(nav.path)
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    >
                      {nav.icon}
                    </span>
                    {(isExpanded || isHovered || isMobileOpen) && (
                      <span className="menu-item-text flex items-center justify-between w-full">
                        {nav.name}
                        {nav.new && (
                          <span
                            className={`ml-1 ${
                              isActive(nav.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                      </span>
                    )}
                  </Link>
                )
              )}
              {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                <div
                  ref={(el) => {
                    subMenuRefs.current[`${menuType}-${index}`] = el;
                  }}
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    height:
                      openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                        ? `${subMenuHeight[`${menuType}-${index}`]}px`
                        : "0px",
                  }}
                >
                  <ul className="mt-2 space-y-1 ml-9">
                    {nav.subItems.map((subItem) => {
                      if (subItem.visible?.includes(role as string)) {
                        return (
                          <li key={subItem.name}>
                            <Link
                              href={subItem.path}
                              className={`menu-dropdown-item ${
                                isActive(subItem.path)
                                  ? "menu-dropdown-item-active"
                                  : "menu-dropdown-item-inactive"
                              }`}
                            >
                              <span
                                className={`${
                                  isActive(subItem.path)
                                    ? "menu-item-icon-active"
                                    : "menu-item-icon-inactive"
                                }`}
                              >
                                {subItem.icon}
                              </span>
                              {subItem.name}
                              <span className="flex items-center gap-1 ml-auto">
                                {subItem.new && (
                                  <span
                                    className={`ml-auto ${
                                      isActive(subItem.path)
                                        ? "menu-dropdown-badge-active"
                                        : "menu-dropdown-badge-inactive"
                                    } menu-dropdown-badge `}
                                  >
                                    new
                                  </span>
                                )}
                                {subItem.pro && (
                                  <span
                                    className={`ml-auto ${
                                      isActive(subItem.path)
                                        ? "menu-dropdown-badge-active"
                                        : "menu-dropdown-badge-inactive"
                                    } menu-dropdown-badge `}
                                  >
                                    pro
                                  </span>
                                )}
                              </span>
                            </Link>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
              )}
            </li>
          );
        }
      })}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "support" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => path === pathname;

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    // Check if the current path matches any submenu item
    let submenuMatched = false;
    ["main", "support", "others"].forEach((menuType) => {
      const items =
        menuType === "main"
          ? navItems
          : menuType === "support"
            ? // ? supportItems
              []
            : // : othersItems;
              [];
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "support" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    // If no submenu item matches, close the open submenu
    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (
    index: number,
    menuType: "main" | "support" | "others"
  ) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-full transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
              ? "w-[290px]"
              : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex  ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src="/images/logo/chermina-logo.png"
                alt="Logo"
                width={150}
                height={40}
              />
              <Image
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <Image
              src="/images/logo/chermina-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto  duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
            {/* <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Support"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(supportItems, "support")}
            </div> */}
            {/* <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div> */}
          </div>
        </nav>
        {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null}
      </div>
    </aside>
  );
};

export default AppSidebar;
