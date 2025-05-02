"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  // BoxCubeIcon,
  CalenderIcon,
  //ChatIcon,
  ChevronDownIcon,
  DocsIcon,
  GridIcon,
  HorizontaLDots,
  // ListIcon,
  //MailIcon,
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
} from "../icons/index";
import SidebarWidget from "./SidebarWidget";
const role = "student";
type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  visible?: string[];
  new?: boolean;
  subItems?: {
    name: string;
    path: string;
    pro?: boolean;
    new?: boolean;
    visible?: string[];
  }[];
};

const navItems: NavItem[] = [
  {
    icon: <UserCircleIcon />,
    name: "Perfil",
    path: "/profile",
    new: true,
    visible: ["admin", "teacher", "student", "parent"],
  },
  {
    icon: <CalenderIcon />,
    name: "Calendario",
    path: "/calendar",
    new: true,
    visible: ["admin", "teacher", "student", "parent"],
  },
  {
    icon: <SearchIcon />,
    name: "Búsqueda avanzada",
    path: "/busqueda-avanzada",
    visible: ["admin", "teacher", "student", "parent"],
  },
  {
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [
      {
        name: "Dashboard",
        path: "/dashboard",
        pro: false,
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        name: "Analytics",
        path: "/analytics",
        pro: true,
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        name: "Marketing",
        path: "/marketing",
        pro: true,
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        name: "CRM",
        path: "/crm",
        pro: true,
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        name: "Stocks",
        path: "/stocks",
        new: true,
        pro: true,
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        name: "SaaS",
        path: "/saas",
        new: true,
        pro: true,
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
    visible: ["admin", "teacher", "student", "parent"],
  },
  {
    icon: <FileCirclePlusIcon />,
    name: "Crear Ticket",
    path: "/crear-ticket",
    visible: ["admin", "teacher", "student", "parent"],
  },
  {
    name: "Tickets",
    icon: <DocsIcon />,
    subItems: [
      {
        name: "Nuevos",
        path: "/tickets/nuevo",
        visible: ["admin", "teacher", "parent"],
      },
      {
        name: "En curso",
        path: "/tickets/curso",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        name: "Reabiertos",
        path: "/tickets/reabierto",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        name: "Pendientes",
        path: "/tickets/pendiente",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        name: "Revisión",
        path: "/tickets/revision",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        name: "Mesa de servicio",
        path: "/tickets/mesaServicio",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        name: "Resueltos",
        path: "/tickets/resuelto",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        name: "Cerrados",
        path: "/tickets/cerrado",
        visible: ["admin", "teacher", "student", "parent"],
      },
      // {
      //   name: "List",
      //   path: "/task-list",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
      // {
      //   name: "Kanban",
      //   path: "/task-kanban",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
    ],
    visible: ["admin", "teacher", "student", "parent"],
  },
  {
    name: "Tareas",
    icon: <TaskIcon />,
    subItems: [
      {
        name: "Nuevas",
        path: "/tareas/nuevo",
        new: true,
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        name: "En curso",
        path: "/tareas/curso",
        new: true,
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        name: "Resueltas",
        path: "/tareas/resuelto",
        new: true,
        visible: ["admin", "teacher", "student", "parent"],
      },
      // {
      //   name: "List",
      //   path: "/task-list",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
      // {
      //   name: "Kanban",
      //   path: "/task-kanban",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
    ],
    visible: ["admin", "teacher", "student", "parent"],
  },
  {
    icon: <UsersGroupIcon />,
    name: "Usuarios",
    path: "/usuarios",
    visible: ["admin", "teacher", "student", "parent"],
  },
  {
    icon: <UsersIcon />,
    name: "Clientes",
    path: "/clientes",
    visible: ["admin", "teacher", "student", "parent"],
  },
  // {
  //   name: "Forms",
  //   icon: <ListIcon />,
  //   subItems: [
  //     {
  //       name: "Form Elements",
  //       path: "/form-elements",
  //       pro: false,
  //       visible: ["admin", "teacher", "student", "parent"],
  //     },
  //     {
  //       name: "Form Layout",
  //       path: "/form-layout",
  //       pro: true,
  //       visible: ["admin", "teacher", "student", "parent"],
  //     },
  //   ],
  //   visible: ["admin", "teacher", "student", "parent"],
  // },
  // {
  //   name: "Tables",
  //   icon: <TableIcon />,
  //   subItems: [
  //     {
  //       name: "Basic Tables",
  //       path: "/basic-tables",
  //       pro: false,
  //       visible: ["admin", "teacher", "student", "parent"],
  //     },
  //     {
  //       name: "Data Tables",
  //       path: "/data-tables",
  //       pro: true,
  //       visible: ["admin", "teacher", "student", "parent"],
  //     },
  //   ],
  //   visible: ["admin", "teacher", "student", "parent"],
  // },
  // {
  //   name: "Pages",
  //   icon: <PageIcon />,
  //   subItems: [
  //     {
  //       name: "File Manager",
  //       path: "/file-manager",
  //       pro: true,
  //       visible: ["admin", "teacher", "student", "parent"],
  //     },
  //     {
  //       name: "Pricing Tables",
  //       path: "/pricing-tables",
  //       pro: true,
  //       visible: ["admin", "teacher", "student", "parent"],
  //     },
  //     {
  //       name: "Faqs",
  //       path: "/faq",
  //       pro: true,
  //       visible: ["admin", "teacher", "student", "parent"],
  //     },
  //     {
  //       name: "Blank Page",
  //       path: "/blank",
  //       pro: true,
  //       visible: ["admin", "teacher", "student", "parent"],
  //     },
  //     {
  //       name: "404 Error",
  //       path: "/error-404",
  //       pro: true,
  //       visible: ["admin", "teacher", "student", "parent"],
  //     },
  //     {
  //       name: "500 Error",
  //       path: "/error-500",
  //       pro: true,
  //       visible: ["admin", "teacher", "student", "parent"],
  //     },
  //     {
  //       name: "503 Error",
  //       path: "/error-503",
  //       pro: true,
  //       visible: ["admin", "teacher", "student", "parent"],
  //     },
  //     {
  //       name: "Coming Soon",
  //       path: "/coming-soon",
  //       pro: true,
  //       visible: ["admin", "teacher", "student", "parent"],
  //     },
  //     {
  //       name: "Maintenance",
  //       path: "/maintenance",
  //       pro: true,
  //       visible: ["admin", "teacher", "student", "parent"],
  //     },
  //     {
  //       name: "Success",
  //       path: "/success",
  //       pro: true,
  //       visible: ["admin", "teacher", "student", "parent"],
  //     },
  //   ],
  //   visible: ["admin", "teacher", "student", "parent"],
  // },
];

// const othersItems: NavItem[] = [
//   {
//     icon: <PieChartIcon />,
//     name: "Charts",
//     subItems: [
//       {
//         name: "Line Chart",
//         path: "/line-chart",
//         pro: true,
//         visible: ["admin", "teacher", "student", "parent"],
//       },
//       {
//         name: "Bar Chart",
//         path: "/bar-chart",
//         pro: true,
//         visible: ["admin", "teacher", "student", "parent"],
//       },
//       {
//         name: "Pie Chart",
//         path: "/pie-chart",
//         pro: true,
//         visible: ["admin", "teacher", "student", "parent"],
//       },
//     ],
//     visible: ["admin", "teacher", "student", "parent"],
//   },
//   {
//     icon: <BoxCubeIcon />,
//     name: "UI Elements",
//     subItems: [
//       {
//         name: "Alerts",
//         path: "/alerts",
//         pro: true,
//         visible: ["admin", "teacher", "student", "parent"],
//       },
//       {
//         name: "Avatar",
//         path: "/avatars",
//         pro: true,
//         visible: ["admin", "teacher", "student", "parent"],
//       },
//       {
//         name: "Badge",
//         path: "/badge",
//         pro: true,
//         visible: ["admin", "teacher", "student", "parent"],
//       },
//       {
//         name: "Breadcrumb",
//         path: "/breadcrumb",
//         pro: true,
//         visible: ["admin", "teacher", "student", "parent"],
//       },
//       {
//         name: "Buttons",
//         path: "/buttons",
//         pro: true,
//         visible: ["admin", "teacher", "student", "parent"],
//       },
//       {
//         name: "Buttons Group",
//         path: "/buttons-group",
//         pro: true,
//         visible: ["admin", "teacher", "student", "parent"],
//       },
//       {
//         name: "Cards",
//         path: "/cards",
//         pro: true,
//         visible: ["admin", "teacher", "student", "parent"],
//       },
//       {
//         name: "Carousel",
//         path: "/carousel",
//         pro: true,
//         visible: ["admin", "teacher", "student", "parent"],
//       },
//       {
//         name: "Dropdowns",
//         path: "/dropdowns",
//         pro: true,
//         visible: ["admin", "teacher", "student", "parent"],
//       },
//       {
//         name: "Images",
//         path: "/images",
//         pro: true,
//         visible: ["admin", "teacher", "student", "parent"],
//       },
//       {
//         name: "Links",
//         path: "/links",
//         pro: true,
//         visible: ["admin", "teacher", "student", "parent"],
//       },
//       {
//         name: "List",
//         path: "/list",
//         pro: true,
//         visible: ["admin", "teacher", "student", "parent"],
//       },
//       {
//         name: "Modals",
//         path: "/modals",
//         pro: true,
//         visible: ["admin", "teacher", "student", "parent"],
//       },
//       {
//         name: "Notification",
//         path: "/notifications",
//         pro: true,
//         visible: ["admin", "teacher", "student", "parent"],
//       },
//       {
//         name: "Pagination",
//         path: "/pagination",
//         pro: true,
//         visible: ["admin", "teacher", "student", "parent"],
//       },
//       {
//         name: "Popovers",
//         path: "/popovers",
//         pro: true,
//         visible: ["admin", "teacher", "student", "parent"],
//       },
//       {
//         name: "Progressbar",
//         path: "/progress-bar",
//         pro: true,
//         visible: ["admin", "teacher", "student", "parent"],
//       },
//       {
//         name: "Ribbons",
//         path: "/ribbons",
//         pro: true,
//         visible: ["admin", "teacher", "student", "parent"],
//       },
//       {
//         name: "Spinners",
//         path: "/spinners",
//         pro: true,
//         visible: ["admin", "teacher", "student", "parent"],
//       },
//       {
//         name: "Tabs",
//         path: "/tabs",
//         pro: true,
//         visible: ["admin", "teacher", "student", "parent"],
//       },
//       {
//         name: "Tooltips",
//         path: "/tooltips",
//         pro: true,
//         visible: ["admin", "teacher", "student", "parent"],
//       },
//       {
//         name: "Videos",
//         path: "/videos",
//         pro: true,
//         visible: ["admin", "teacher", "student", "parent"],
//       },
//     ],
//     visible: ["admin", "teacher", "student", "parent"],
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
//     visible: ["admin", "teacher", "student", "parent"],
//   },
// ];

// const supportItems: NavItem[] = [
//   {
//     icon: <ChatIcon />,
//     name: "Chat",
//     path: "/chat",
//     visible: ["admin", "teacher", "student", "parent"],
//   },
//   {
//     icon: <MailIcon />,
//     name: "Email",
//     subItems: [
//       {
//         name: "Inbox",
//         path: "/inbox",
//         visible: ["admin", "teacher", "student", "parent"],
//       },
//       {
//         name: "Details",
//         path: "/inbox-details",
//         visible: ["admin", "teacher", "student", "parent"],
//       },
//     ],
//     visible: ["admin", "teacher", "student", "parent"],
//   },
//   {
//     icon: <DocsIcon />,
//     name: "Invoice",
//     path: "/invoice",
//     visible: ["admin", "teacher", "student", "parent"],
//   },
// ];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "support" | "others"
  ) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => {
        if (nav.visible?.includes(role)) {
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
                      if (subItem.visible?.includes(role)) {
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
