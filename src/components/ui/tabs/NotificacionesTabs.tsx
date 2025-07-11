"use client";
import { BellActiveAltIcon, CheckCircleIcon, FolderOpenIcon } from "@/icons";
import React, { useState } from "react";
import NotificacionesList from "../list/NotificacionesList";
import { useSession } from "next-auth/react";

export interface TabData {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: string;
}

interface TabButtonProps extends TabData {
  isActive: boolean;
  onClick: () => void;
}

const tabData: TabData[] = [
  {
    id: "no-leidas",
    label: "No leídas",
    icon: <BellActiveAltIcon />,
    content:
      "Notification ipsum dolor sit amet consectetur. Non vitae facilisis urna tortor placerat egestas donec. Faucibus diam gravida enim elit lacus a. Tincidunt fermentum condimentum quis et a et tempus. Tristique urna nisi nulla elit sit libero scelerisque ante.",
  },
  {
    id: "leidas",
    label: "Leídas",
    icon: <CheckCircleIcon />,
    content:
      "Analytics ipsum dolor sit amet consectetur. Non vitae facilisis urna tortor placerat egestas donec. Faucibus diam gravida enim elit lacus a. Tincidunt fermentum condimentum quis et a et tempus. Tristique urna nisi nulla elit sit libero scelerisque ante.",
  },
  {
    id: "todas",
    label: "Todas",
    icon: <FolderOpenIcon />,
    content:
      "Customers ipsum dolor sit amet consectetur. Non vitae facilisis urna tortor placerat egestas donec. Faucibus diam gravida enim elit lacus a. Tincidunt fermentum condimentum quis et a et tempus. Tristique urna nisi nulla elit sit libero scelerisque ante.",
  },
];

const TabButton: React.FC<TabButtonProps> = ({
  label,
  icon,
  isActive,
  onClick,
}) => {
  return (
    <button
      className={`inline-flex items-center gap-2 border-b-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ${
        isActive
          ? "text-brand-500 border-brand-500 dark:text-brand-400 dark:border-brand-400"
          : "text-gray-500 border-transparent hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      }`}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
};

interface TabContentProps {
  children?: React.ReactNode;
  isActive: boolean;
}

const TabContent: React.FC<TabContentProps> = ({ children, isActive }) => {
  if (!isActive) return null;

  return (
    <div className="text-sm text-gray-500 dark:text-gray-400">{children}</div>
  );
};

export default function NotificacionesTabs() {
  const [activeTab, setActiveTab] = useState<TabData["id"]>("no-leidas");
  const [tipoNotificacion, setTipoNotificacion] = useState('no-leidas');
  const { data: session } = useSession();

  return (
    <div className="p-6 border border-gray-200 rounded-xl dark:border-gray-800">
      <div className="border-b border-gray-200 dark:border-gray-800">
        <nav className="flex space-x-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-600">
          {tabData.map((tab) => (
            <TabButton
              key={tab.id}
              {...tab}
              isActive={activeTab === tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setTipoNotificacion(tab.id);
              }}
            />
          ))}
        </nav>
      </div>

      <div className="pt-4">
        {tabData.map((tab) => (
          <TabContent key={tab.id} isActive={activeTab === tab.id}>
            <NotificacionesList
              userId={session?.user.userId}
              leido={tipoNotificacion}
            />
          </TabContent>
        ))}
      </div>
    </div>
  );
}
