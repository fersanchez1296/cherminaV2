"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
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
  const socketRef = useRef<Socket | null>(null); // <--- usamos una ref para evitar el bucle
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (session?.user?.accessToken && !socketRef.current) {
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

      socketRef.current = newSocket;
      setSocket(newSocket);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log("🔌 Socket desconectado");
        socketRef.current = null;
        setSocket(null);
      }
    };
  }, [session]); // solo depende de session, como debe ser

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
