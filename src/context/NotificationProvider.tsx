"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import Notification from "@/components/ui/notification/Notification";

type NotificationType = "success" | "info" | "warning" | "error";

interface NotificationState {
  message: string;
  title: string;
  variant: NotificationType;
}

interface NotificationContextProps {
  showNotification: (
    title: string,
    message: string,
    variant?: NotificationType
  ) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<NotificationState | null>(
    null
  );

  const showNotification = (
    title: string,
    message: string,
    variant: NotificationType = "info"
  ) => {
    setNotification({ title, message, variant });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <>
          {console.log("Mostrando notificación:", notification)}
          <div className="fixed bottom-4 right-4 z-[99999]">
            <Notification
              title={notification.title}
              description={notification.message}
              variant={notification.variant}
            />
          </div>
        </>
      )}
    </NotificationContext.Provider>
  );
};
