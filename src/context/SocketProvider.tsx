"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { io, Socket } from "socket.io-client";

// Define el tipo para el contexto
type SocketContextType = {
  socket: Socket | null;
};

const SocketContext = createContext<SocketContextType>({ socket: null });

export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (session?.user?.accessToken && !socket) {
      const newSocket = io("http://localhost:4700", {
        auth: {
          token: session.user.accessToken,
        },
      });

      newSocket.on("connect", () => {
        console.log("🟢 Conectado al servidor de sockets:", newSocket.id);
      });

      newSocket.on("disconnect", () => {
        console.log("🔴 Desconectado del servidor de sockets");
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
        setSocket(null);
      };
    }
  }, [session]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
