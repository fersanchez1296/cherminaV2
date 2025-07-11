"use client";
import React, { useEffect, useState } from "react";
import Checkbox from "../../form/input/Checkbox";
import { getNotificaciones, marcarLeida } from "@/services/notificaciones";
import { useLoadingStore } from "@/stores/loadingStore";
import UnOrderedList from "./UnorderedList";
import NotificacionesLeidas from "./NotificacionesLeidas";

export default function NotificacionesList({
  userId,
  leido,
}: {
  userId: string;
  leido: string;
}) {
  const setLoading = useLoadingStore((state) => state.setLoading);
  // Handler to toggle individual checkboxes
  const handleCheckboxChange = async (ticketId: string) => {
    try {
      setLoading(true);
      await marcarLeida(ticketId);
      setNotificaciones((prev) =>
        prev.map((n) => (n._id === ticketId ? { ...n, leido: true } : n))
      );
      fetchNotifications();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const [notificaciones, setNotificaciones] = useState([]);

  const fetchNotifications = async () => {
    try {
      const result = await getNotificaciones(leido, userId);
      if (result?.data?.length > 0) setNotificaciones(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [userId, leido]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] sm:w-full">
      <ul className="flex flex-col">
        {notificaciones.map((item, index) => {
          const id = `listCheckbox${index}`; // Unique ID for each checkbox
          return (
            <li
              key={index}
              className="border-b border-gray-200 px-3 py-2.5 last:border-b-0 dark:border-gray-800"
            >
              <div className="flex items-center gap-2">
                {item.leido ? (
                  <span className="text-sm text-gray-500 dark:text-gray-400">{item.mensaje}</span>
                ) : (
                  <>
                    <Checkbox
                      id={id} // Pass unique id to checkbox
                      checked={item.leido}
                      onChange={() => handleCheckboxChange(item._id)}
                    />
                    <label
                      htmlFor={id} // Use the same id for the label
                      className="flex items-center text-sm text-gray-500 cursor-pointer select-none dark:text-gray-400"
                    >
                      {item.mensaje}
                    </label>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
