"use client";
import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput, EventContentArg } from "@fullcalendar/core";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal/index";
import { getCalendarEvents } from "@/services/calendarService";
import Button from "@/components/ui/button/Button";
import { useRouter } from "next/navigation";
interface CalendarEvent extends EventInput {
  extendedProps?: {
    calendar: string;
  };
}

interface data {
  _id: string;
  Subcategoria: {
    Descripcion_prioridad: string;
  };
  Fecha_limite_resolucion_SLA: string;
  Id: number;
  Descripcion: string;
  Cliente: { Nombre: string; Correo: string };
}

const Calendar: React.FC = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [eventData, setEvenetData] = useState<data>();
  const [calendarEvents, setCalendarEvents] = useState<Array<data>>([]);
  const calendarRef = useRef<FullCalendar>(null);
const router = useRouter();
  const calendarsEvents: { [key: string]: string } = {
    Baja: "success",
    Media: "warning",
    Alta: "error",
    Planeada: "primary ",
    default: "primary",
  };

  useEffect(() => {
    getCalendarEvents().then((ce) => {
      setCalendarEvents(ce.data);
    });
  }, []);

  useEffect(() => {
    const eventsFetched: CalendarEvent[] = calendarEvents.map((item) => ({
      id: JSON.stringify(item.Id),
      title: `Ticket ${item.Id}`,
      start: item?.Fecha_limite_resolucion_SLA,
      allDay: false,
      extendedProps: {
        calendar:
          calendarsEvents[item?.Subcategoria?.Descripcion_prioridad ?? ""] ??
          "default",
        originalData: item,
      },
    }));

    setEvents(eventsFetched);
  }, [calendarEvents]);

  function handleEventClick(clickInfo) {
    const originalData = clickInfo.event.extendedProps.originalData;
    setEvenetData(originalData);
    openModal();
  }

  return (
    <>
      <div className="rounded-2xl border  border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="custom-calendar">
          <FullCalendar
            locale={esLocale}
            hiddenDays={[0, 6]}
            selectable={true}
            businessHours={{
              daysOfWeek: [1, 2, 3, 4, 5],
              startTime: "08:00",
              endTime: "17:00",
            }}
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={events}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
          />
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-4">
          <h1 className="text-xl font-semibold mb-2">
            Ticket #{eventData?.Id}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            <strong>Prioridad:</strong>{" "}
            {eventData?.Subcategoria?.Descripcion_prioridad}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <strong>Fecha límite de resolución:</strong>{" "}
            {new Date(eventData?.Fecha_limite_resolucion_SLA).toLocaleString()}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <strong>Cliente:</strong> {eventData?.Cliente?.Nombre} -{" "}
            {eventData?.Cliente?.Correo}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <strong>Descripcion:</strong> {eventData?.Descripcion}
          </p>
          <Button size="sm" className="w-full sm:w-auto mt-5" onClick={() => router.push(`/busqueda/${eventData?.Id}`, { scroll: false })}>
            Ver ticket Completo
          </Button>
        </div>
      </Modal>
    </>
  );
};

const renderEventContent = (eventInfo: EventContentArg) => {
  const colorClass = `fc-bg-${eventInfo.event.extendedProps.calendar.toLowerCase()}`;
  return (
    <div
      className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm cursor-pointer`}
    >
      <div className="fc-daygrid-event-dot"></div>
      <div className="fc-event-time">{eventInfo.timeText}</div>
      <div className="fc-event-title">{eventInfo.event.title}</div>
    </div>
  );
};

export default Calendar;
